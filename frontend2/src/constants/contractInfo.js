export const contractAddress = "0xa11592dD9617e1595ae60ae675F0947B2B84959C";
export const abi = [
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
          "name": "ballotId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ballotName",
          "type": "string"
        }
      ],
      "name": "BallotCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "winner",
          "type": "uint256"
        }
      ],
      "name": "BallotEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "partyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "partyName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "candidateName",
          "type": "string"
        }
      ],
      "name": "PartyCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "partyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "VoteCast",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "AllBallots",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PARTY_CREATION_FEE",
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
      "inputs": [],
      "name": "PARTY_PARTICIPATION_FEE",
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
      "name": "addressToPartyId",
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
          "internalType": "string",
          "name": "ballotName",
          "type": "string"
        }
      ],
      "name": "createBallot",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "partyName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "candidateName",
          "type": "string"
        }
      ],
      "name": "createParty",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        }
      ],
      "name": "endBallot",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        }
      ],
      "name": "getAllParticipatingPartyIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
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
      "name": "idToBallot",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "ballotName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfParticipants",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberOfVotes",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "winner",
          "type": "uint256"
        },
        {
          "internalType": "enum Voting.BallotState",
          "name": "state",
          "type": "uint8"
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
      "name": "idToParty",
      "outputs": [
        {
          "internalType": "address",
          "name": "ownerAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "partyId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "partyName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "candidateName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "numberOfBallots",
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
      "inputs": [],
      "name": "numberOfParties",
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
      "inputs": [],
      "name": "numberOfVoters",
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
          "internalType": "uint256",
          "name": "partyId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        }
      ],
      "name": "registerPartyForBallot",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registerVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "name": "registeredVoter",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        }
      ],
      "name": "startBallot",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ballotId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "partyId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]