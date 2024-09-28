import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract";
import ChangeState from "./ChangeState";
import Vote from "./Vote";
import RegisterParty from "./RegisterParty";

const BallotDetailsPage = ({ ballot }) => {
  const { contract } = useSelector(selectContract);
  const [participatingPartiesIds, setParticipatingPartiesIds] = useState([]);
  const [winnerPartyName, setWinnerPartyName] = useState("");

  useEffect(() => {
    const fetchParticipatingParties = async () => {
      if (contract) {
        try {
          const response = await contract.getAllParticipatingPartyIds(
            ballot.ballotId
          );
          setParticipatingPartiesIds(response);
        } catch (error) {
          console.log("Error in fetching participating parties:", error);
        }
      }
    };

    fetchParticipatingParties();
  }, [contract, ballot]);

  // Fetch the winner's party name when ballot ends
  useEffect(() => {
    if (parseInt(ballot.state) === 2 && parseInt(ballot.winner) > 0) {
      fetchPartyName(parseInt(ballot.winner));
    }
  }, [contract, ballot]);

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

  const getBallotState = (state) => {
    switch (state) {
      case 0:
        return "Created";
      case 1:
        return "Active";
      case 2:
        return "Ended";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      {ballot && (
        <div className="min-h-screen bg-blue-50 py-10">
          <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-4xl font-bold text-blue-700 text-center">
                Ballot: {ballot.ballotName}
              </h1>
              <h2 className="text-lg font-medium text-gray-600 text-center mt-4">
                Ballot ID: {parseInt(ballot.ballotId)}
              </h2>
            </div>

            {/* Ballot State Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Status</h2>
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    getBallotState(ballot.state) === "Active"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></div>
                <p className="text-lg font-medium">{getBallotState(ballot.state)}</p>
              </div>
            </div>

            {/* Ballot Statistics Section */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="p-6 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Number of Votes
                </h3>
                <p className="text-3xl font-bold text-blue-900">
                  {parseInt(ballot.numberOfVotes)}
                </p>
              </div>
              <div className="p-6 bg-blue-100 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Number of Participating Parties
                </h3>
                <p className="text-3xl font-bold text-blue-900">
                  {parseInt(ballot.numberOfParticipants)}
                </p>
              </div>
            </div>

            {/* Ballot State Management */}
            <ChangeState id={ballot.ballotId} currentState={getBallotState(ballot.state)} />

            {/* Conditional Rendering Based on Ballot State */}
            {parseInt(ballot.state) === 1 && (
              <Vote ballotId={ballot.ballotId} participatingPartiesIds={participatingPartiesIds} />
            )}

            {parseInt(ballot.state) === 0 && <RegisterParty ballot={ballot} />}

            {parseInt(ballot.state) === 2 && winnerPartyName && (
              <h1 className="text-2xl font-bold mt-6">Winner: {winnerPartyName}</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BallotDetailsPage;
