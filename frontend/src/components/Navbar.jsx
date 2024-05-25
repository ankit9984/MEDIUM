import React from 'react'
import { CiSearch } from "react-icons/ci";

import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='shadow-xl h-16 pt-2.5'>
        <nav className='flex justify-between items-center '>
            <div className='flex gap-2 items-center'>
                <div className='w-14 h-10 bg-red-400 rounded-full overflow-hidden'>
                    <img className='w-full h-full object-cover' src={logo} alt="" />
                </div>
                <div className='custom-max:hidden relative shadow-lg'>
                    <input 
                    type="text"
                    placeholder='Search here'
                    className='shadow-md p-2 pl-8 rounded-lg focus:outline-none w-full' />
                    <CiSearch className='absolute text-2xl left-2 top-1/4 text-gray-500 ' />
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <CiSearch className='text-xl  custom-min:hidden'/>
               <Link to='/'><button className='bg-black text-white px-2 py-1 rounded-lg'>Sign-up</button></Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
