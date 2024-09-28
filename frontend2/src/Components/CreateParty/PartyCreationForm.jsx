import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const PartyCreationForm = () => {
  const [partyName, setPartyName] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [loading, setLoading] = useState(false);
  const { contract,accounts } = useSelector(selectContract);
  const [isRegistered,setIsRegistered] = useState(false);
  useEffect(()=>{
    const checkRegister = async()=>{
     try {
         const response = await contract.registeredVoter(accounts[0]);
         if(response === true){
             setIsRegistered(true);
         }
     } catch (error) {
         console.log('Something went wrong while checking');
     }
    } 
    checkRegister();
   },[accounts])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isRegistered){
        toast.error("You need to register as a voter first");
    }

    if (!partyName || !candidateName) {
      toast.error("Please enter both party name and candidate name.");
      return;
    }
    
    if (contract) {
      try {
        setLoading(true);
        const partyCreationFee = await contract.PARTY_CREATION_FEE();
        console.log(parseInt(partyCreationFee));
        
        const response = await contract.createParty(partyName, candidateName, {
          value: partyCreationFee.toString(),
        });

        await response.wait();
        toast.success("Party created successfully!");
        setPartyName("");
        setCandidateName("");
      } catch (error) {
        console.error(error);
        toast.error("Error creating party.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto bg-blue-50 p-8 rounded-xl shadow-lg mt-10">
    <Toaster/>
    <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
      Create a New Party
    </h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Party Name Input */}
      <div>
        <label
          htmlFor="partyName"
          className="block text-blue-600 font-semibold mb-2"
        >
          Party Name
        </label>
        <input
          type="text"
          id="partyName"
          value={partyName}
          onChange={(e) => setPartyName(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter the party name"
        />
      </div>

      {/* Candidate Name Input */}
      <div>
        <label
          htmlFor="candidateName"
          className="block text-blue-600 font-semibold mb-2"
        >
          Candidate Name
        </label>
        <input
          type="text"
          id="candidateName"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter the candidate name"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ease-in-out duration-300 transform hover:scale-105 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Creating Party..." : "Create Party"}
      </button>
    </form>
  </div> 
  )
}

export default PartyCreationForm