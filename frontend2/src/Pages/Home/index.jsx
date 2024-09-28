import React from 'react'
import Navbar from '../../Components/Navbar'
import HeroBanner from '../../Components/HomePage/HeroBanner'
import Features from '../../Components/HomePage/Features'
import Footer from '../../Components/Footer'

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroBanner/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default HomePage