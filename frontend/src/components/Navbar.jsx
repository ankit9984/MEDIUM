import React, { useState, useEffect, useRef } from 'react'
import { CiSearch, CiEdit, CiBookmark, CiSettings } from "react-icons/ci";
import { IoMdNotifications, IoIosStats } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { authState, logout, fetchDrafts } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const dropdownRef = useRef(null);
    const { isAuthenticated, user } = authState

    // console.log(isAuthenticated, user);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='shadow-xl h-16 pt-2.5'>
            <nav className='flex justify-between items-center '>
                <div className='flex gap-2 items-center'>
                    <Link to='/'>
                        <div className='w-14 h-10 bg-red-400 rounded-full overflow-hidden'>
                            <img className='w-full h-full object-cover' src={logo} alt="" />
                        </div>
                    </Link>
                    {location.pathname !== '/new-story' ? (
                        <div className='custom-max:hidden relative shadow-lg'>
                            <input
                                type="text"
                                placeholder='Search here'
                                className='shadow-md p-2 pl-8 rounded-lg focus:outline-none w-full' />
                            <CiSearch className='absolute text-2xl left-2 top-1/4 text-gray-500 ' />
                        </div>
                    ) : (
                        <div>
                            <p>Draft in pnsopgaming8097@gmail</p>
                        </div>
                    )}
                </div>
                <div className='flex items-center gap-5'>
                    <CiSearch className='text-3xl  custom-min:hidden' />
                    {isAuthenticated ?
                        <div className='flex items-center justify-between gap-5'>
                            {location.pathname !== '/new-story' ? (
                                <Link to='/new-story'>
                                    <div className='custom-max:hidden flex items-center gap-2 text-xl cursor-pointer group'>
                                        <CiEdit className='text-2xl group-hover:text-green-400' />
                                        <span>Write</span>
                                    </div>
                                </Link>
                            ) : (
                                <div className='flex items-center gap-2'>
                                    <button className='bg-green-500 text-white px-2 py-1 rounded'>Public</button>
                                    <CiSettings className='text-2xl cursor-pointer' />
                                </div>
                            )}
                            <IoMdNotifications className='text-3xl cursor-pointer' />
                            <div className='relative' ref={dropdownRef}>
                                <div onClick={toggleDropDown} className='w-14 h-10 bg-red-400 rounded-full overflow-hidden cursor-pointer'>
                                    <img className='w-full h-full object-cover' src={logo} alt="" />
                                </div>
                                {isOpen && (
                                    <div className='absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg'>
                                        <ul>
                                            <Link to='/new-story'>
                                                <div className='custom-min:hidden flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 ' onClick={toggleDropDown}>
                                                    <CiEdit className='text-2xl' />
                                                    <li className='text-xl'>Write</li>
                                                </div>
                                            </Link>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 ' onClick={toggleDropDown}>
                                                <FaRegUser className='text-2xl' />
                                                <li className='text-xl'>Profile</li>
                                            </div>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 ' onClick={toggleDropDown}>
                                                <CiBookmark className='text-2xl' />
                                                <li className='text-xl'>Library</li>
                                            </div>
                                            <Link to='/me/stories' onClick={() => fetchDrafts()}>
                                                <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 ' onClick={toggleDropDown}>
                                                    <MdContentCopy className='text-2xl' />
                                                    <li className='text-xl'>Stories</li>
                                                </div>
                                            </Link>
                                            <div className='flex px-4 py-2 items-center gap-2 cursor-pointer hover:bg-gray-100 ' onClick={toggleDropDown}>
                                                <IoIosStats className='text-2xl' />
                                                <li className='text-xl'>Stats</li>
                                            </div>
                                        </ul>
                                        <ul className='w-full border my-2'></ul>
                                        <ul>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={toggleDropDown}>Setting</li>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={toggleDropDown}>Refine recommendations</li>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={toggleDropDown}>Manage publications</li>
                                            <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={toggleDropDown}>Help</li>
                                        </ul>
                                        <ul className='w-full border my-2'></ul>
                                        <div className='px-4 py-2 items-center cursor-pointer' onClick={toggleDropDown}>
                                            <p onClick={() => logout()}>Sign out</p>
                                            <span>{user?.username}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        :
                        <Link to='/login'><button className='bg-black text-white px-2 py-1 rounded-lg'>Sign-in</button></Link>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar
