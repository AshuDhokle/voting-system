import React, { useEffect,useState } from 'react'
import { MdOutlineHowToVote } from "react-icons/md";
import { useSelector } from 'react-redux';
import { selectContract } from '../../features/contract';
import { shortenAddress } from '../../utils/shortenString';
import { Link } from 'react-router-dom';
const Navbar = () => {
 const [account,setAccount] = useState()
 const data = useSelector(selectContract);
 useEffect(()=>{
   setAccount(data.accounts[0]);
 },[data])   
    
 return (
    <div className='py-2 px-4 w-full bg-sky-500 flex flex-row items-center justify-between'>
        <div className='flex flex-row'>
        <MdOutlineHowToVote className='size-7 text-white m-2'/>
        <Link to={'/'} className='text-white text-xl m-2'>Vote 3.0</Link>
        </div>
        <h1 className='text-white m-2 cursor-pointer hover:text-gray-200'>{shortenAddress(account)}</h1>
    </div>
  )
}

export default Navbar