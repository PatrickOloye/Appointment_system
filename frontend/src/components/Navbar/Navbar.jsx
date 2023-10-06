import React, { useState } from 'react'
import logo from './doclogo.svg'
import Button from 'react-bootstrap/Button';
import {FaTimes} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import { Link } from 'react-router-dom';
// hover:bg-blue-500
// className='hover:scale-125 hover:text-blue-400

const Navbar = () => {

  const [click, setClick] = useState(false)
  const [activeLink, setActiveLink] = useState('');
  const handleClick = () =>{
    setClick(!click)
  }
  const content = <>
  <div className="md:hidden block absolute top-16 w-full left-0 right-0 bg-blue-300 transition">

    <ul className='text-center text-2xl p-10'>
        <Link spy={true} smooth={true} to='/landing'><li className='my-1 py-4 border-b border-blue-300  hover:rounded hover:scale-125'>Home</li></Link>
        <Link spy={true} smooth={true} to='/about'><li className='my-1 py-4 border-b border-blue-300  hover:rounded hover:scale-125'>About</li></Link>
        <Link spy={true} smooth={true} to='/Specialists'><li className='my-1 py-4 border-b border-blue-300  hover:rounded hover:scale-125'>SPecialists</li></Link>
        <Link spy={true} smooth={true} to='/FaQ'><li className='my-1 py-4 border-b border-blue-300  hover:rounded hover:scale-125'>Contacts</li></Link>
        <Link spy={true} smooth={true} ><li className='my-1 py-4 border-b border-blue-300  hover:rounded hover:scale-125'>FaQ</li></Link>
        <Link spy={true} smooth={true} ><li className='my-4 py-4 border-b border-blue-300  hover:rounded hover:scale-110'><Button variant="primary" className='bg-blue-500 rounded-full'>Login</Button></li></Link>
        <Link spy={true} smooth={true} ><li className='my-4 py-4 border-b border-blue-300  hover:rounded hover:scale-110 '><Button variant="primary" className='bg-blue-500 rounded-full'>Sign up</Button></li></Link>
    </ul>
   
  </div>
  </>
  return (
    <nav>
      <div className="h-10vh flex justify-between z-30  lg:py-5 px-20 py-1  ">
          <div className="flex item-center flex-1 gap-1 ">
            <span className=''><img src={logo} alt="logo" /></span>
            <span className='text-3xl font-bold '>ZYoN.</span>
          </div>
          <div className="lg:flex gat-4 md:flex lg: flex-1 items-center font-normal hidden">
            <div className="flex-10">
              <ul className='flex gap-8 mr-16 text-[10px] font-semibold text-xl'> 
                  <Link spy={true} smooth={true} to='/landing'  onClick={() => setActiveLink('home')}><li className={`hover:text-blue-600 transition hover:border-b-2 border-blue-300 hover:border-blue-600 cursor-pointer ${activeLink === 'home' ? 'text-white bg-blue-200 border-b-2 rounded' : ''}`}>Home</li></Link>

                  <Link spy={true} smooth={true} to='/about'  onClick={() => setActiveLink('about')}><li className={`hover:text-blue-600 transition hover:border-b-2 border-blue-300 hover:border-blue-600 cursor-pointer ${activeLink === 'about' ? 'text-white bg-blue-200 border-b-2 rounded' : ''}`}>About</li></Link>

                  <Link spy={true} smooth={true} to='/Specialists' onClick={() => setActiveLink('specialist')} ><li className={`hover:text-blue-600 transition hover:border-b-2 border-blue-300 hover:border-blue-600 cursor-pointer ${activeLink === 'specialist' ? 'text-white bg-blue-200 border-b-2 rounded' : ''}`}>SPecialists</li></Link>

                  <Link spy={true} smooth={true} to='/contact'  onClick={() => setActiveLink('contacts')} ><li className={`hover:text-blue-600 transition hover:border-b-2 border-blue-300 hover:border-blue-600 cursor-pointer ${activeLink === 'contacts' ? 'text-white bg-blue-200 border-b-2 rounded' : ''}`}>Contacts</li></Link>
                  
                  <Link spy={true} smooth={true} to='/FaQ' onClick={() => setActiveLink('faq')} >
                  <li className={`hover:text-blue-600 transition hover:border-b-2 border-blue-300 hover:border-blue-600 cursor-pointer ${activeLink === 'faq' ? 'text-white bg-blue-500' : ''}`}>FaQ</li></Link></ul>
            </div>
            <div className="auth flex gap-2">
          <Button variant="primary" className='bg-blue-500 rounded-full'>Login</Button>
          <Button variant="primary" className='bg-blue-500 rounded-full'>SignUp</Button>
          </div>

          </div>
          <div className="">
            {click && content}
          </div>
          <button className='block sm:hidden transition' onClick={handleClick}>{click ? <FaTimes  size={20}/> : <GiHamburgerMenu size={20}/> } </button>
      </div>

    </nav>
  )
}

export default Navbar 