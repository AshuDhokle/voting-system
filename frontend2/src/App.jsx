import React,{ useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {contractAddress,abi} from './constants/contractInfo'
import { useDispatch } from 'react-redux'
import {initContract} from './features/contract'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './Pages/Home'
import MainPage from './Pages/Main'
import Ballot from './Pages/Ballot'

function App() {
  const [accounts,setAccounts] = useState(); 
  const dispatch = useDispatch();
  useEffect(()=>{
    if(window.ethereum){
      const loadAccounts = async()=>{
        try {
          const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(_accounts);
          // console.log(accounts);
          
        } catch (error) {
          console.error('Error loading accounts:', error);
        }
      }
      loadAccounts(); 
    }
  },[window.ethereum])
  
  useEffect(()=>{
    const fetchContract = async()=>{
      try {
        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        // console.log(_provider);
        const _signer = await _provider.getSigner();
        // console.log(_signer);
        const _contract = new ethers.Contract(contractAddress,abi,_signer)
        // console.log(_contract);
        
        const owner = await _contract.owner();
        dispatch(initContract({accounts,_contract,owner}))
      } catch (error) {
        
      }
    }
    fetchContract();
  },[accounts])

  return (
    <>
      <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/main' element={<MainPage/>}/>
       <Route path='/vote/:id' element={<Ballot/>}/>
      </Routes>  
    </>
  )
}

export default App
