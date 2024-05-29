import React, { useEffect, useState } from 'react'
import { usePost } from '../../context/PostContex'
import {formatDistanceToNow} from 'date-fns'
import {useNavigate} from 'react-router-dom'

import { MdArrowDropDown } from "react-icons/md";

function Draft() {
  const {drafts, loading, error, fetchDrafts, deletePost} = usePost();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  //Function to update current time every second
  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timerID)
  });

  //Function to fetch public posts every 60 seconds
  useEffect(() => {
    const refreshInterval = setInterval(() => fetchDrafts(), 60000);
    return () => clearInterval(refreshInterval);
  }, [fetchDrafts]);

  //Function to toggle dropdown menu
  const toggleDropdown = (postId) => {
    console.log(postId);
    setActiveDropdown(activeDropdown === postId ? null : postId)
    console.log(activeDropdown);
  }

  const handleEditPost = (post) => {
    navigate('/new-story', {state: {post}})
  }
  
  return (
    <div className='mt-5'>
      {loading && <p className='text-gray-300'>Loading....</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {
        !loading && !error && (
          <ul className='grid grid-cols-1 gap-4'>
            {drafts.map((draft) => (
              <li key={draft._id} className='bg-white shadow-inner rounded-md p-4'>
                <h4  className='text-lg font-semibold mb-2'>{draft.title}</h4>
                <h2 className='text-gray-400 mb-1'>{draft.content}</h2>
                <div className='flex gap-5 items-center'>
                  <p>Created{formatDistanceToNow(new Date(draft.createdAt), {addSuffix:true})}</p>
                  <div className='relative'>
                    <button onClick={() => toggleDropdown(draft._id)}><MdArrowDropDown/></button>
                    {
                      activeDropdown === draft._id && (
                        <div className='absolute left-0 mt-2 bg-white border border-gray-300 rounded shadow-lg w-48'>
                          <button className='w-full text-left px-4 py-2 hover:bg-gray-100' onClick={() => handleEditPost(draft)}>Edit</button>
                          <button className='w-full text-left px-4 py-2 hover:bg-gray-100' onClick={() => deletePost(draft._id, fetchDrafts)}>Delete</button>
                        </div>
                      )
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )
      }
      <p>Current Time: {formatDate(currentTime)}</p>
    </div>
  );
}

//Function to formate date as "Month Day, Year, Hours:Minutes:Seconds"

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-Us', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export default Draft
