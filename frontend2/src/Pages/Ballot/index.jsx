import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectContract } from '../../features/contract';
import {Hourglass} from 'react-loader-spinner'
import Navbar from '../../Components/Navbar';
import BallotDetailsPage from './BallotDetails';
const Ballot = () => {
  const {id} = useParams();
  const {contract,isOwner} = useSelector(selectContract);
  const [loadind,setLoading] = useState(false);
  const [ballot,setBallot] = useState();
  useEffect(()=>{
    const fetchBallot = async()=>{
       if(contract){
         try {     
            setLoading(true);
            const response = await contract.idToBallot(id);
            // console.log(response);
            setBallot(response);
         } catch (error) {
            console.log("error in fetching the ballot");
         }finally{
            setLoading(false);
         } 
       }
    }
    fetchBallot();
    // console.log(ballot);
    
  },[contract])
  return (
    <div>
        <Navbar/>
        {
            loadind ? <Hourglass/> :
            ballot && <BallotDetailsPage ballot={ballot}/>
        }
    </div>
  )
}

export default Ballot