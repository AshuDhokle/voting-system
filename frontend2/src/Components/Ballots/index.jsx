import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectContract } from '../../features/contract'
import { Hourglass } from 'react-loader-spinner'
import BallotCard from './BallotCard'
const AllBallots = () => {
   const {contract} = useSelector(selectContract);
   const [allBallots,setAllBallots] = useState();
   const [loading,setLoading] = useState(false);
   useEffect(()=>{
    if(contract){  
        const fetchBallots = async() =>{
           setLoading(true); 
           try {
               const response = await contract.AllBallots();
               setAllBallots(response)
           } catch (error) {
               console.error('Error in fetching ballots');
           }finally{
            setLoading(false);
           }
        }
        
        fetchBallots();
    }
   },[contract])



   return (
    <div className='m-4 p-4 flex flex-col items-center justify-center'>
       {
           loading && <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        />
       }
        {
            allBallots ? 
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                allBallots.length > 0 && allBallots.map((ballot,idx)=>(
                <BallotCard key={idx} ballotId = {ballot}/>
                ) ) 
            }
            </div>
            :<h1> No Ballots yet</h1>
        }
    </div>
  )
}


export default AllBallots