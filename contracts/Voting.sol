// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Voting{
    
    address immutable _owner;
    uint256 public number_of_voters = 0;
    uint256 public number_of_parties = 0;
    uint256 public number_of_ballouts = 0;

    uint256 public party_creation_fee = 0.01 ether;
    uint256 public party_participation_fee = 0.01 ether;

    
    struct Party{
        address owner_address;
        uint256 party_id;
        string party_name;
        string candidate_name;
        address candidate_address;
    }

    enum balloutState {
      CREATED,
      ACTIVE,
      ENDED
    }

    struct Ballout{
        address ballout_owner;
        string ballout_name;
        uint256 number_of_participants;
        Party[] participating_parties;
        mapping(uint256=>uint256) party_id_to_votes;
        balloutState state;
        uint256 numberOfVotes;
        uint256 winner;
    }     

    mapping(address => bool) registered_voter;
    mapping(uint256 => Party) id_to_party;
    mapping(uint256 => Ballout) id_to_ballout;
 
    constructor () {
        _owner = msg.sender;
    }
    
    modifier onlyOwner{
        require(msg.sender == _owner,"RESTRICTED_TO_OWNER");
        _;
    }

    modifier onlyCreatedBallout(uint256 _balloutId){
        require(id_to_ballout[_balloutId].state == balloutState.CREATED, 'REGISTRATION_ENDED');
        _;
    }
    
    modifier onlyActiveBallout(uint256 _balloutId){
        require(id_to_ballout[_balloutId].state == balloutState.ACTIVE, "BALLOUT_ENDED");
        _;
    }
    
    modifier onlyPartyOwner(uint256 _partyId){
        require( msg.sender == id_to_party[_partyId].owner_address,'RESTRICTED_TO_PARTY_OWNER');
        _;
    }

    modifier onlyRegisteredVoters{
        require(registered_voter[msg.sender] == true,'REGISTERED_VOTERS_ALLOWED_ONLY');
        _; 
    }

    function registerVoter() public returns(uint256){
        registered_voter[msg.sender] = true;
        number_of_voters++;
        return number_of_voters;
    }
    
    function createParty(string memory _partyName, string memory _candidateName, address _candidateAddress) public payable returns(uint256){
        require(msg.value == party_creation_fee,'PARTY_REGISTRATION_FEE_IS_LESS_THAN_REQUIRED');

        Party storage newParty = id_to_party[number_of_parties];
        
        newParty.owner_address = msg.sender;
        newParty.party_name = _partyName;
        newParty.party_id = number_of_parties;
        newParty.candidate_name = _candidateName;
        newParty.candidate_address = _candidateAddress;    
        
        number_of_parties++;

        return number_of_parties - 1;
    }
    
    function createBallout(string memory _balloutName) public onlyOwner returns(uint256){
        
        Ballout storage newBallout = id_to_ballout[number_of_ballouts];
        
        newBallout.ballout_name = _balloutName;
        newBallout.ballout_owner = msg.sender;
        
        number_of_ballouts++;

        return number_of_ballouts - 1;
    }
   
    function registerParty(uint256 _partyId, uint256 _balloutId) public payable onlyCreatedBallout(_balloutId) onlyPartyOwner(_partyId) {
        
        require(msg.value > party_participation_fee,"PROVIDE_ENOUGH_REGISTRATION_FEES");
        
        Ballout storage ballout = id_to_ballout[_balloutId];
        Party storage party = id_to_party[_partyId];

        ballout.number_of_participants = ballout.number_of_participants++;
        ballout.participating_parties.push(party);
        
    }
    
    function startBallout(uint256 _balloutId) public onlyOwner onlyCreatedBallout(_balloutId){
        id_to_ballout[_balloutId].state = balloutState.ACTIVE;
    }

    function endBallout(uint256 _balloutId) public onlyOwner onlyActiveBallout(_balloutId) returns(uint256){
        uint256 winner = 0;
        uint256 maxVotes = 0;
        Ballout storage ballout = id_to_ballout[_balloutId];
        uint numberOfParticipants = ballout.number_of_participants;
        for(uint i = 0;i<numberOfParticipants;i++){
            uint256 currVotes = ballout.party_id_to_votes[ballout.participating_parties[i].party_id];
            if(currVotes > maxVotes){
                maxVotes = currVotes;
                winner = ballout.participating_parties[i].party_id; 
            }
        }
        
        ballout.winner = winner;
        ballout.state = balloutState.ENDED;

        return winner;
    }
    
    function vote(uint256 _balloutId, uint256 _votedPartyId) public onlyActiveBallout(_balloutId) onlyRegisteredVoters{
     Ballout storage ballout = id_to_ballout[_balloutId];
     ballout.party_id_to_votes[_votedPartyId]++;
     ballout.numberOfVotes++;
    }

    function getAllRegisteredParties(uint256 _balloutId) public view returns(Party[] memory){
       return id_to_ballout[_balloutId].participating_parties;
    }
   
}