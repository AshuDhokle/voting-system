// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Voting {
    address public immutable owner;
    uint256 public numberOfVoters;  
    uint256 public numberOfParties; 
    uint256 public numberOfBallots; 

    uint256 public constant PARTY_CREATION_FEE = 0.01 ether;
    uint256 public constant PARTY_PARTICIPATION_FEE = 0.01 ether;

    struct Party {
        address ownerAddress;
        uint256 partyId;
        string partyName;
        string candidateName;
    }

    enum BallotState {
        CREATED,
        ACTIVE,
        ENDED
    }

    struct Ballot {
        uint256 ballotId;
        string ballotName;
        uint256 numberOfParticipants;
        uint256 numberOfVotes;
        uint256 winner;
        BallotState state;
        uint256[] participatingPartyIds;
        mapping(uint256 => uint256) partyVotes; // party id to votes
        mapping(address => bool) voted;         // voter voted
        mapping(uint256 => bool) registeredParties;  // Track registered parties to avoid duplicate loops
    }

    mapping(address => bool) public registeredVoter;
    mapping(uint256 => Party) public idToParty;
    mapping(address => uint256) public addressToPartyId;
    mapping(uint256 => Ballot) public idToBallot;

    // Events
    event PartyCreated(uint256 partyId, string partyName, string candidateName);
    event BallotCreated(uint256 ballotId, string ballotName);
    event VoteCast(uint256 ballotId, uint256 partyId, address voter);
    event BallotEnded(uint256 ballotId, uint256 winner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed");
        _;
    }

    modifier onlyBallotState(uint256 ballotId, BallotState requiredState) {
        require(idToBallot[ballotId].state == requiredState, "Invalid ballot state");
        _;
    }

    modifier onlyPartyOwner(uint256 partyId) {
        require(msg.sender == idToParty[partyId].ownerAddress, "Not party owner");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(registeredVoter[msg.sender], "Not registered");
        _;
    }

    modifier singlePartyOwner() {
        require(addressToPartyId[msg.sender] == 0, "Already own a party");
        require(msg.sender != owner, "Party owner can't be owner of contract");
        _;
    }

    modifier onlyOneVote(uint256 ballotId) {
        require(!idToBallot[ballotId].voted[msg.sender], "Already voted");
        _;
    }

    modifier registerOnlyOnce(uint256 partyId, uint256 ballotId) {
        require(!idToBallot[ballotId].registeredParties[partyId], "Party already registered in this ballot");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerVoter() external {
        require(!registeredVoter[msg.sender], "Already registered");
        registeredVoter[msg.sender] = true;
        numberOfVoters++;
    }

    function createParty(
        string memory partyName,
        string memory candidateName
    ) external payable singlePartyOwner returns (uint256) {
        require(msg.value == PARTY_CREATION_FEE, "Insufficient party creation fee");
        require(registeredVoter[msg.sender], "Candidate not registered as a voter");

        numberOfParties++;
        idToParty[numberOfParties] = Party({
            ownerAddress: msg.sender,
            partyId: numberOfParties,
            partyName: partyName,
            candidateName: candidateName
        });

        addressToPartyId[msg.sender] = numberOfParties;

        emit PartyCreated(numberOfParties, partyName, candidateName); // Emit event

        return numberOfParties;
    }

    function createBallot(string memory ballotName) external onlyOwner returns (uint256) {
        numberOfBallots++;
        idToBallot[numberOfBallots].ballotName = ballotName;
        idToBallot[numberOfBallots].state = BallotState.CREATED;
        idToBallot[numberOfBallots].ballotId = numberOfBallots;
        idToBallot[numberOfBallots].winner = type(uint256).max; // Initialize winner to a max value
        
        emit BallotCreated(numberOfBallots, ballotName); // Emit event

        return numberOfBallots;
    }

    function registerPartyForBallot(uint256 partyId, uint256 ballotId)
        external
        payable
        onlyBallotState(ballotId, BallotState.CREATED)
        onlyPartyOwner(partyId)
        registerOnlyOnce(partyId, ballotId)
    {
        require(msg.value == PARTY_PARTICIPATION_FEE, "Insufficient participation fee");

        Ballot storage ballot = idToBallot[ballotId];
        ballot.participatingPartyIds.push(partyId);
        ballot.numberOfParticipants++;
        ballot.registeredParties[partyId] = true;  // Mark party as registered
    }

    function startBallot(uint256 ballotId)
        external
        onlyOwner
        onlyBallotState(ballotId, BallotState.CREATED)
    {
        idToBallot[ballotId].state = BallotState.ACTIVE;
    }

    function endBallot(uint256 ballotId)
        external
        onlyOwner
        onlyBallotState(ballotId, BallotState.ACTIVE)
        returns (uint256)
    {
        Ballot storage ballot = idToBallot[ballotId];
        uint256 winner;
        uint256 maxVotes;

        if (ballot.numberOfParticipants == 1) {
            winner = ballot.participatingPartyIds[0];
        } else {
            for (uint256 i = 0; i < ballot.numberOfParticipants; i++) {
                uint256 partyId = ballot.participatingPartyIds[i];
                uint256 votes = ballot.partyVotes[partyId];
                if (votes > maxVotes) {
                    maxVotes = votes;
                    winner = partyId;
                }
            }
        }

        ballot.winner = winner;
        ballot.state = BallotState.ENDED;

        emit BallotEnded(ballotId, winner); // Emit event

        return winner;
    }

    function vote(uint256 ballotId, uint256 partyId)
        external
        onlyBallotState(ballotId, BallotState.ACTIVE)
        onlyRegisteredVoter
        onlyOneVote(ballotId)
    {
        Ballot storage ballot = idToBallot[ballotId];
        require(ballot.registeredParties[partyId], "Party not registered in ballot");

        ballot.partyVotes[partyId]++;
        ballot.numberOfVotes++;
        ballot.voted[msg.sender] = true;

        emit VoteCast(ballotId, partyId, msg.sender); // Emit event
    }

    function AllBallots() external view returns (uint256[] memory) {
        uint256[] memory ballotIds = new uint256[](numberOfBallots); // Initialize with the correct size
        for (uint256 i = 0; i < numberOfBallots; i++) {
            ballotIds[i] = idToBallot[i + 1].ballotId; // Use i + 1 as ballotId likely starts from 1
        }
        return ballotIds;
    }
    
    function getAllParticipatingPartyIds(uint256 ballotId) external view returns (uint256[] memory){
        return idToBallot[ballotId].participatingPartyIds;
    }
}



