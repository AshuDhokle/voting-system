import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectContract } from '../../features/contract'

const RegisterParty = ({ballot}) => {
  const {accounts,contract} = useSelector(selectContract);
  const [partyId,setPartyId] = useState(0);
  const [registeredParty,setRegisteredParty] = useState(false);
  useEffect(()=>{
    const fetchPartyId = async()=>{
        if(contract){
            try {
                const response = await contract.addressToPartyId(accounts[0]);
                console.log(parseInt(response));
                setPartyId(parseInt(response))
            } catch (error) {
                console.log("Error is loding user Parties");
            }
        }
    }
    fetchPartyId();
  },[contract])
  
//   useEffect(()=>{
//     const checkRegisteredParty = async()=>{
//         if(contract && partyId > 0){
            
//             try {
//                 const response = ballot.registeredParties(partyId);
//                 console.log(response);
//             } catch (error) {
//                 console.log('error in checking party register');  
//             }
//         }
//     } 
//     checkRegisteredParty();
//   },[partyId])
   
  const registerParty = async () => {
    if(contract && partyId){
        try {
            const partyParticipationFee = await contract.PARTY_PARTICIPATION_FEE();
            const response = await contract.registerPartyForBallot(partyId,ballot.ballotId,{
                value : partyParticipationFee.toString()
            });
        } catch (error) {
            console.log("Error in registering party for ballot");
        }
    }
  }

  return (
    <div>
       {
        partyId > 0 && <button onClick={()=>registerParty()} className='m-2 p-2 w-44 border-2 border-green-400 rounded-lg hover:bg-green-400 hover:text-white'>Register Your Party</button>
       }
    </div>
  )
}

export default RegisterParty