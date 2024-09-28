import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract";
import { Link } from "react-router-dom";

const BallotCard = ({ ballotId }) => {
  const [ballot, setBallot] = useState();
  const { contract } = useSelector(selectContract);
  const [loading, setLoading] = useState(false);
  const [winnerPartyName, setWinnerPartyName] = useState("");
  useEffect(() => {
    const fetchBallot = async () => {
      setLoading(true);
      try {
        const response = await contract.idToBallot(ballotId);
        setBallot(response);
      } catch (error) {
        console.error(`error in fetching ${ballotId} ballot`);
      } finally {
        setLoading(false);
      }
    };
    fetchBallot();
  }, [ballotId]);
  
  useEffect(() => {
    if (ballot && parseInt(ballot.state) === 2 && parseInt(ballot.winner) > 0) {
      fetchPartyName(parseInt(ballot.winner));
    }
  }, [contract,ballot]);

  const fetchPartyName = async (id) => {
    if (contract && id) {
      try {
        const response = await contract.idToParty(id);
        setWinnerPartyName(response.partyName); // Set the winner's party name in state
      } catch (error) {
        console.log("Error fetching party names:", error);
      }
    }
  };

  const getStatusColor = (state) => {
    switch (state) {
      case 0:
        return "text-yellow-500";
      case 1:
        return "text-green-500";
      case 2:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <>
      {ballot && (
        <div className="w-64 m-2 justify-self-center rounded-xl overflow-hidden shadow-lg bg-white p-6 border border-blue-300 hover:shadow-2xl transition duration-300 transform hover:scale-105">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-700">
              {ballot.ballotName}
            </h2>
            <p className={`text-lg ${getStatusColor(parseInt(ballot.state))}`}>
              {parseInt(ballot.state) === 2 ? "Completed" : ballot.state === 0 ? "Created" : "Active"}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-600">
              <span className="text-blue-600">Participants:</span>{" "}
              {parseInt(ballot.numberOfParticipants)}
            </p>

            <p className="text-sm font-semibold text-gray-600">
              <span className="text-blue-600">Votes Cast:</span>{" "}
              {parseInt(ballot.numberOfVotes)}
            </p>

            {parseInt(ballot.state) === 2 && (
              <p className="text-sm font-semibold text-green-600">
                <span className="text-blue-600">Winner : </span>
                {winnerPartyName}
              </p>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to={`/vote/${ballot.ballotId}`} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              View Details
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BallotCard;
