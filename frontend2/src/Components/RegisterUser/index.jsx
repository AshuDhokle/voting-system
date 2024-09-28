import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { selectContract } from '../../features/contract'

const RegisterVoter = () => {
  const {isOwner,contract,accounts} = useSelector(selectContract);
  const [isRegistered,setIsRegistered] = useState(false);
  const [loading,setLoading] = useState(false);
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

  const register = async() =>{
    if(contract && accounts){
        try {
            setLoading(true);
            const response = await contract.registerVoter();
            console.log(response);
        } catch (error) {
            console.log("something went wrong while registering");
        }finally{
            setLoading(false);
        }
    }
  }
  
  return (
    <div className='w-full flex flex-col items-center justify-center'>
        {
            !isRegistered ? (
                !isOwner && <div>
                <button onClick={register} className='m-2 w-64 p-1 rounded-lg bg-blue-500 text-white' >{}Register</button>
            </div>
            ) : <h1 className='text-white w-64 bg-green-600 rounded-lg p-1 m-2 text-center cursor-pointer'>Registered</h1>

        }
        {
            
        }
    </div>
  )
}

export default RegisterVoter