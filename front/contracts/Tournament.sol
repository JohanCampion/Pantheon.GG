pragma solidity >=0.7.0 <0.9.0;

contract Tournament {

    address public owner;
    uint256 private tournamentId = 0;

    mapping(uint256 => address) public tournamentToOwner;
    mapping(address => uint256) public ownerTournamentCount;

    mapping(address => uint[]) public playerToTournament;
    mapping(address => uint) public playerTournamentCount;

     mapping(address => mapping (uint => bool)) public playerCheck;

    enum Status { preparation, check_in, en_cours, termine }

    struct TournamentStruct {
        uint256 tournamentId;
        string name;
        address createur;
        Status status;
        uint256 date_de_debut;
        uint256 date_de_fin;
        address[] participants;
        address[] checked;
        uint nombreParticipants;
    }

    TournamentStruct[] public tournois;


    event Action (
        uint256 postId,
        string actionType,
        Status deleted,
        address indexed executor,
        uint256 created
    );

    modifier ownerOnly(){
        require(msg.sender == owner, "Owner reserved only");
        _;
    }

    modifier isParticipant(uint _tournamentId) {
        TournamentStruct memory tr = tournois[_tournamentId];
        bool isParticipantPresent = false;

        for(uint i =0; i < tr.nombreParticipants; i++) {
            if(tr.participants[i] == msg.sender) {
                isParticipantPresent = true;
            }
        }
        require(isParticipantPresent == true, "Vous n'etes pas un participant du tournoi");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createTournament(
        string memory name,
        uint date_de_debut,
        uint date_de_fin,
        address[] memory participant,
        uint nombreParticipant

    ) external returns (bool) {
        require(bytes(name).length > 0, "Title cannot be empty");
        require(date_de_debut > 0, "Veuillez precisez une date de debut");
        require(date_de_fin > 0, "Veuillez precisez une date de debut");
        require(participant.length > 1, "Veuillez ajouter au moins 2 joueurs");
        require(participant.length < 11, "Nombres maximum de joueurs a 10");
        require(participant.length == nombreParticipant, "Le nombres de joueur n'est pas correct");

        tournamentToOwner[tournamentId] = msg.sender;
        ownerTournamentCount[msg.sender]++;

        TournamentStruct storage tournoi = tournois.push();
        tournoi.tournamentId = tournamentId;
        tournoi.name = name;
        tournoi.status = Status.preparation;
        tournoi.createur = msg.sender;
        tournoi.date_de_debut = date_de_debut;
        tournoi.date_de_fin = date_de_fin;
        tournoi.participants = participant;
        tournoi.nombreParticipants = nombreParticipant;
        tournoi.checked = new address[](0x0);

         //update participant
         for(uint i = 0; i < nombreParticipant; i++) {
             playerToTournament[participant[i]].push(tournamentId);
             playerTournamentCount[participant[i]]++;
         }

        tournamentId++;
        return true;
    }

    function getMesTournoisJoueurs() external view returns (uint[] memory) {
        return playerToTournament[msg.sender];
    }

    function getAllTournois() external view returns (TournamentStruct[] memory) {
        return tournois;
    }

    function getTournoi(uint _id) external view returns (TournamentStruct memory) {
        return tournois[_id];
    }

    function getTimeStamp() public view returns(uint) {
    return block.timestamp;
    }

    
    function checkIn(uint _tournamentId) external isParticipant(_tournamentId) {
        TournamentStruct storage tr = tournois[_tournamentId];
        require(tr.date_de_debut - 1 hours < block.timestamp && block.timestamp < tr.date_de_debut, "Vous ne pouvez pas encore checkIn");
        if(playerCheck[msg.sender][_tournamentId]) revert("Deja checkin");
        tr.checked.push(msg.sender);
        playerCheck[msg.sender][_tournamentId] = true;
    }


}