import React, { useState } from 'react';
import { usePost } from '../../context/PostContex';
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { FaHandsClapping } from "react-icons/fa6";
import { CiSaveUp2, CiSettings } from "react-icons/ci";
import { FaComment } from "react-icons/fa";
import WhoLikesThisPost from '../../utils/WhoLikesThisPost';
import { useAuth } from '../../context/AuthContext';

function HomeListData() {
    const navigate = useNavigate();
    const { publicPost, fetchFollowingPosts, follwingPosts, toggleLike, likerPersons, deletePost, getAllPublicPost , getAuthorPosts} = usePost();
    const { authState, getAuthorInfo } = useAuth();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showLikesPerson, setShowLikesPerson] = useState(false);

    const { user } = authState;

    const handleSetting = (postId) => {
        setActiveDropdown(activeDropdown === postId ? null : postId);
        // console.log(activeDropdown);
    }

    const handleLike = (postId) => {
        toggleLike(postId);
    };

    const handleLikePerson = (postId) => {
        likerPersons(postId);
        setShowLikesPerson(true)
    }

    const handlePostClick = (author, title) => {
        navigate(`/${author}/${title.replace(/\s+/g, '-').toLowerCase()}`)
    }

    const handleClickAuthor = async (authorId, authorUsername) => {
        console.log(authorId);
        if (!authorId || !authorId.match(/^[0-9a-fA-F]{24}$/)) {
            console.error("Invalid or undefined Author ID:", authorId);
            return;
        }
        // console.log(authorId);
        // console.log(`Navigating to /@${authorUsername}`);
        navigate(`/@${authorUsername}`)
        await getAuthorInfo(authorId);
        await getAuthorPosts(authorId)
    }

    // console.log(publicPost);
    return (
        <div className="max-w-2xl mx-auto">
            {publicPost.length > 0 ? (
                publicPost.map(post => (
                    <div key={post._id} className="p-4 border-b">
                        <div className="flex items-center mb-2">
                            <div className="flex-shrink-0 w-10 h-10 mr-3 rounded-full bg-gray-200"></div>
                            <div>
                                <h2 className="text-lg font-semibold cursor-pointer hover:font-bold" onClick={() => handleClickAuthor(post.author?._id, post.author?.username)}>{post.author?.username}</h2>
                                <p className="text-sm text-gray-500">Date: {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-2" onClick={() => handlePostClick(post.author?.username, post.title)}>{post.title}</h2>
                            <p className="text-gray-700" onClick={() => handlePostClick(post.author?.username, post.title)}>{post.content}</p>
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                            <div className='flex gap-2'>
                                <p className='flex gap-2 items-center cursor-pointer'><FaHandsClapping onClick={() => handleLike(post._id)} /><span onClick={() => handleLikePerson(post._id)}>{post.likes.length}</span></p>
                                <p className='flex gap-2 items-center'><FaComment />10</p>
                            </div>
                            <div className='relative'>
                                <div className='flex gap-2 text-2xl'>
                                    <span><CiSaveUp2 /></span>
                                    <span onClick={() => handleSetting(post._id)} className='cursor-pointer'><CiSettings /></span>
                                </div>
                                {activeDropdown === post._id && (
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
                                        {user && user._id === post.author._id && (
                                            <div>
                                                <button className='w-full text-left px-4 py-2 hover:bg-red-300 text-red-500' onClick={() => deletePost(post._id, getAllPublicPost)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center py-4">No posts available</p>
            )}
            {showLikesPerson && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg w-1/2 h-1/2 absolute">
                        <button onClick={() => setShowLikesPerson(false)} className="mb-2 bg-red-500 px-4 py-2 text-xl text-white rounded">Close</button>
                        <WhoLikesThisPost />
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeListData;
