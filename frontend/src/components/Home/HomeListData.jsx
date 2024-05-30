import React, { useState } from 'react';
import { usePost } from '../../context/PostContex';
import {formatDistanceToNow} from 'date-fns'

import { FaHandsClapping } from "react-icons/fa6";
import { CiSaveUp2, CiSettings } from "react-icons/ci";
import { FaComment } from "react-icons/fa";

function HomeListData() {
    const {publicPost, toggleLike} = usePost();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleSetting = (postId) => {
        setActiveDropdown(activeDropdown === postId ? null : postId);
        console.log(activeDropdown);
    }

    const handleLike = (postId) => {
        toggleLike(postId);
    }

    console.log(publicPost);
    return (
        <div className="max-w-2xl mx-auto">
            {publicPost.length > 0 ? (
                publicPost.map(post => (
                    <div key={post._id} className="p-4 border-b">
                        <div className="flex items-center mb-2">
                            <div className="flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-gray-200"></div>
                            <div>
                                <h2 className="text-lg font-semibold">{post.author?.username}</h2>
                                <p className="text-sm text-gray-500">Date: {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-700">{post.content}</p>
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                            <div className='flex gap-2'>
                                <p className='flex gap-2 items-center' onClick={() => handleLike(post._id)}><FaHandsClapping/>{post.likes.length}</p>
                                <p className='flex gap-2 items-center'><FaComment/>10</p>
                            </div>
                           <div className='relative'>
                           <div className='flex gap-2 text-2xl'>
                                <span><CiSaveUp2/></span>
                                <span onClick={() => handleSetting(post._id)} className='cursor-pointer'><CiSettings/></span>
                            </div>
                            {activeDropdown === post._id && (
                                <div className="absolute left-0-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <div className='border-b'>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Unfollow Author</button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Follow Author</button>
                                </div>
                                <div className='border-b'>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Mute Author</button>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Block Author</button>
                                </div>
                                <div>
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Report story</button>
                                </div>
                                </div>
                            )}
                           </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center py-4">No posts available</p>
            )}
        </div>
    );
}

export default HomeListData;
