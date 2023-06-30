pragma solidity >=0.7.0 <0.9.0;

contract Tournament {

    address public owner;
    uint256 private tournamentId = 0;

    mapping(uint256 => address) public tournamentToOwner;
    mapping(address => uint256) public ownerTournamentCount;

    mapping(uint => address[]) public tournamentToParticipant;
    mapping(address => uint) public participantToTournament;

    mapping(address => uint) public tounamentPlayerCounter;


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


    struct Participant {
        address participantAddrr;
        bool checked_in;
    }

    TournamentStruct[] tournois;


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

        // ajout des participant dans la base
         tournamentToParticipant[tournamentId] = participant;

         //count
         for(uint i = 0; i < nombreParticipant; i++) {
             tounamentPlayerCounter[participant[i]]++;
         }

        tournamentId++;
        return true;
    }

    function getMesTournoisOrganise() external view returns (TournamentStruct[] memory) {
        TournamentStruct[] memory result = new TournamentStruct[](2);
        uint count = 0;
        for(uint i = 0; i < tournois.length; i++) {
            for(uint y = 0; y < tournois[i].nombreParticipants; y++) {
                if(tournois[i].participants[y] == msg.sender) {
                    result[count] = tournois[i];
                    count++;
                }

            }

        }
        return result;
    }


    function checkIn(uint _tournamentId) external {
        TournamentStruct storage tr = tournois[_tournamentId];
        tr.checked.push(msg.sender);
        for(uint i = 0; i < tr.nombreParticipants; i++) {
            if(tr.participants[i] == msg.sender) {
                tr.checked.push(msg.sender);
            }
        }
    }


}
