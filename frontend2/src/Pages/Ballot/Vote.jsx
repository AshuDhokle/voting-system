import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectContract } from '../../features/contract';

const Vote = ({ ballotId, participatingPartiesIds }) => {
  const [selectedParty, setSelectedParty] = useState(0);
  const [partyNames, setPartyNames] = useState([]);
  const { contract } = useSelector(selectContract);

  useEffect(() => {
    // Fetch the party names once the component is mounted
    const fetchPartyNames = async () => {
      if (contract && participatingPartiesIds.length > 0) {
        try {
          const names = await Promise.all(
            participatingPartiesIds.map(async (id) => {
              const party = await contract.idToParty(id);
              return { id, name: party.partyName };
            })
          );
          setPartyNames(names);
        } catch (error) {
          console.log('Error fetching party names:', error);
        }
      }
    };

    fetchPartyNames();
  }, [contract, participatingPartiesIds]);

  const submitVote = async () => {
    if (contract && selectedParty > 0) {
      try {
        await contract.vote(ballotId, selectedParty);
        console.log('Vote submitted successfully');
      } catch (error) {
        console.log('Error submitting vote:', error);
      }
    } else {
      console.log('Please select a party before submitting');
    }
  };

  return (
    <div className="p-4">
      {partyNames.length > 0 && (
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Choose a Party:</label>
          <select
            value={selectedParty}
            onChange={(e) => setSelectedParty(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value={0}>Select a Party</option>
            {partyNames.map((party, idx) => (
              <option key={idx} value={party.id}>
                {party.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        onClick={submitVote}
        className="m-2 p-2 w-32 border-2 border-blue-400 rounded-lg hover:bg-blue-400 hover:text-white"
      >
        Vote
      </button>
    </div>
  );
};

export default Vote;
