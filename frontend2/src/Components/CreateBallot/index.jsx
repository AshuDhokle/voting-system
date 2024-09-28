import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const CreateBallotForm = () => {
  const [ballotName, setBallotName] = useState("");
  const {contract,isOwner} = useSelector(selectContract);
  const [loading,setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(contract){
        try {
            setLoading(true);
            if (ballotName) {
              console.log("Ballot Created:", ballotName);
              
              const response = await contract.createBallot(ballotName);
              toast.success('Ballot Created');
              setBallotName(""); 
            } else {
              toast.error("Please enter a ballot name.");
            }
        } catch (error) {
           console.error(error);
           toast.error('error in creating ballot')
        }finally{
            setLoading(false);
        }
    }
  };

  return (
    <>
    <Toaster/>
    {
        isOwner &&
    <div className="max-w-md mx-auto bg-blue-50 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Create a New Ballot
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ballot Name Input */}
        <div>
          <label htmlFor="ballotName" className="block text-blue-600 font-semibold mb-2">
            Ballot Name
          </label>
          <input
            type="text"
            id="ballotName"
            value={ballotName}
            onChange={(e) => setBallotName(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter the ballot name"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 transform hover:scale-105"
        >
          Create Ballot
        </button>
      </form>
    </div>
    }
    </>
  );
};

export default CreateBallotForm;
