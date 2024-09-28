import React from 'react'
import Navbar from '../../Components/Navbar'
import AllBallots from '../../Components/Ballots'
import CreateBallotForm from '../../Components/CreateBallot'
import { useSelector } from 'react-redux'
import { selectContract } from '../../features/contract'
import CreatePartyForm from '../../Components/CreateParty'
import RegisterVoter from '../../Components/RegisterUser'

const MainPage = () => {
  const {isOwner} = useSelector(selectContract);
  return (
    <div>
        <Navbar/>
        <AllBallots/>
        {
          !isOwner && <RegisterVoter/>
        }
        {
          isOwner ? <CreateBallotForm/> : <CreatePartyForm/>
        }
    </div>
  )
}

export default MainPage