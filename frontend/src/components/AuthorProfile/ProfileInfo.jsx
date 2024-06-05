import React, { useEffect, useState } from 'react';
import { CiSettings } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContex';

function ProfileInfo() {
    const {authorInfo, getAuthorInfo} = useAuth();
    const {getAuthorPosts} = usePost();
    const [dropDown, setDropDown] = useState(false)
    const [activeButton, setActiveButton] = useState(null)

    
    const list = [
        'Home',
        'About'
    ];

    

    const { username } = useParams();
    const handleSetting = () => {
        setDropDown(!dropDown);
    }

    const handleButton = (label, index, authorId) => {
        setActiveButton(index);
        if('Home' === label){
            // alert(authorId)
            getAuthorPosts(authorId)
        }
        if('About' === label){
            // alert('About')
        }
    }

    return (
        <div className='max-w-2xl mx-auto flex justify-between items-center bg-white p-4 rounded-lg shadow-md'>
            <div className=''>
                <div className='flex items-center'>
                    <div className='flex-shrink-0 w-16 h-16 mr-4 rounded-full bg-gray-500'></div>
                    <div>
                        <h2 className='text-2xl font-bold'>{authorInfo.username}</h2>
                        <p className='text-gray-600'>{authorInfo.followers?.length} followers</p>
                    </div>
                </div>
                <div className='flex gap-5 mt-10'>
                {list.map((label, index) => (
                            <button key={index}
                            className={activeButton === index ? 'text-green-400' : 'text-black'}
                            onClick={() => handleButton(label, index, authorInfo._id)}>
                                {label}
                            </button>
                        ))}
                </div>
            </div>
            <div className='relative'>
                <div className='flex items-center space-x-4'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Follow</button>
                    <CiSettings className='text-2xl cursor-pointer text-gray-600 hover:text-gray-800' onClick={() => handleSetting()} />
                </div>
                {dropDown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                        <div className='border-b'>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Unfollow Author</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Follow Author</button>
                        </div>
                        <div className='border-b'>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Mute Author</button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Block Author</button>
                        </div>
                        <div className='border-b'>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Report story</button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileInfo;
