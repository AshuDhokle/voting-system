import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectContract } from '../../features/contract'

const PartyDetails = ({partyId}) => {
  const {contract} = useSelector(selectContract);
  const [loading,setLoading] = useState(false);
  const [party,setParty] = useState();
  useEffect(()=>{
    const fetchPartyDetails = async () =>{
        try {
            setLoading(true);
            const response = await contract.idToParty(partyId);
            setParty(response);
        } catch (error) {
            console.log('error while fetching party details');
        }finally{
            setLoading(false);
        }
    }
    fetchPartyDetails();
  },[partyId])
  return (
    <>
        <h1>Party Details</h1>
        {
            party && <div className='w-fit bg-gray-400 rounded-lg p-2 m-2'>
                <h1 className='m-2 text-3xl font-semibold text-white'>{party.partyName}</h1>
                <h2 className='m-2 text-xl text-white' >Candidate : {party.candidateName}</h2>
                <h2 className='m-2 text-xl text-white'>{party.ownerAddress}</h2>
            </div>
        }
    </>
  )
}

export default PartyDetails