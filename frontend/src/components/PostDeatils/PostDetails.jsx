import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { CiSettings, CiSaveUp2 } from "react-icons/ci";


import { format } from 'date-fns';
import { usePost } from '../../context/PostContex';

function PostDetails() {
    const { author, title } = useParams();
    const { publicPost, getAllPublicPost, toggleLike} = usePost();
    const [dropdown, setDropDown] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            await getAllPublicPost();
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        if (publicPost.length > 0) {
            // Find the post matching the author and title
            const foundPost = publicPost.find(post =>
                post.author?.username === author && post.title.replace(/\s+/g, '-').toLowerCase() === title
            );
            setPost(foundPost);
        }
    }, [publicPost, author, title]);

    console.log(post);

    if (!post) {
        return <p>Post not found</p>;
    }

    const handleSetting = (postId) => {
        setDropDown(dropdown === postId ? null : postId);
    }

    const handleToggleLike = (postId) => {
        toggleLike(postId)
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">{post.author.username}</p>
                        <p className="text-xs text-gray-500">{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-5'>
                        <span className='flex gap-2 items-center' onClick={() => handleToggleLike(post._id)}><FaHandsClapping />10</span>
                        <span className='flex gap-2 items-center'><FaComment />10</span>
                    </div>
                    <div className='relative'>
                        <div className='flex gap-5 text-2xl'>
                            <CiSaveUp2/>
                            <CiSettings className='' onClick={() => handleSetting(post._id)}/>
                        </div>
                        {dropdown === post._id && (
                            <div className="absolute right-[-20px] mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                                <div className='border-b'>
                                    {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Unfollow Author</button> */}
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
                <div className="prose prose-lg">
                    <p className="text-gray-700 leading-relaxed text-2xl">{post.content}</p>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Comments</h2>
                {/* Render comments here */}
            </div>
        </div>
    );
}

export default PostDetails;
