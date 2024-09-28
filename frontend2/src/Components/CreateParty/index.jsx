import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectContract } from "../../features/contract";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Form from "./PartyCreationForm";
import PartyCreationForm from "./PartyCreationForm";
import PartyDetails from "./PartyDetails";

const CreatePartyForm = () => {
  const [partyId,setPartyId] = useState(0);
  const { contract,accounts } = useSelector(selectContract);
   
   useEffect(()=>{
    const fetchParties = async()=>{
        if(contract){
            try { 
                const response = await contract.addressToPartyId(accounts[0]);
                setPartyId(parseInt(response));
                // console.log(parseInt(response));
                
            } catch (error) {
                console.log('someting went wrong while fetching the parties');
            }
        }
    }
    fetchParties();
   },[accounts])

  
  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster />
      {
        partyId === 0 ? <PartyCreationForm/>
       : <PartyDetails partyId = {partyId}/>
        
      }
      
    </div>
  );
};

export default CreatePartyForm;
