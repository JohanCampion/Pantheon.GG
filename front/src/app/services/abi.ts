export const tournament_address = '0x500BE788f52966f177F435f4C333A08f18B3bfdC';

export const tournament_abi =
  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "postId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "actionType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "enum Tournament.Status",
          "name": "deleted",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "executor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "created",
          "type": "uint256"
        }
      ],
      "name": "Action",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tournamentId",
          "type": "uint256"
        }
      ],
      "name": "checkIn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "date_de_debut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "date_de_fin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "participant",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "nombreParticipant",
          "type": "uint256"
        }
      ],
      "name": "createTournament",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMesTournoisOrganise",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tournamentId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "createur",
              "type": "address"
            },
            {
              "internalType": "enum Tournament.Status",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "date_de_debut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "date_de_fin",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "participants",
              "type": "address[]"
            },
            {
              "internalType": "address[]",
              "name": "checked",
              "type": "address[]"
            },
            {
              "internalType": "uint256",
              "name": "nombreParticipants",
              "type": "uint256"
            }
          ],
          "internalType": "struct Tournament.TournamentStruct[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "ownerTournamentCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "participantToTournament",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tounamentPlayerCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tournamentToOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tournamentToParticipant",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
