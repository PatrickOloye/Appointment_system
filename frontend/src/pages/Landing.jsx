import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Carousel from '../components/Carousel/Carousel'
import SubMid from '../components/landing/Submid'
import Presub from '../components/landing/Presub'

const Landing = () => {
  return (
    <>
    <Navbar/>
    <Carousel/>
    <Presub/>
    <SubMid/>
    <span>Landing</span>
    </>
    
  )
}

export default Landing