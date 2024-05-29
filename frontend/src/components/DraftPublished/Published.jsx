import React, { useState, useEffect } from 'react';
import { usePost } from '../../context/PostContex';
import { formatDistanceToNow } from 'date-fns';
import {useNavigate} from 'react-router-dom'

import { MdArrowDropDown } from "react-icons/md";

function Published() {
  const { publicMe, loading, error, fetchPublic, deletePost } = usePost();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  // Function to update current time every second
  useEffect(() => {
    const timerID = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  // Function to fetch public posts every 60 seconds
  useEffect(() => {
    const refreshInterval = setInterval(() => fetchPublic(), 60000);
    return () => clearInterval(refreshInterval);
  }, [fetchPublic]);

  //Function to toggle dropdown menu
  const toggleDropdown = (postId) => {
    console.log(postId);
    setActiveDropdown(activeDropdown === postId ? null : postId)
    console.log(activeDropdown);
  };

  const handleEditClick = (post) => {
    // console.log(post);
    navigate('/new-story', {state: {post}})
  }

  return (
    <div className="mt-5">
      {loading && <p className="text-gray-600">Loading....</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {!loading && !error && (
        <ul className="grid grid-cols-1 gap-4">
          {publicMe.map((all) => (
            <li key={all._id} className="bg-white shadow-inner rounded-md p-4">
              <h4 className="text-lg font-semibold mb-2">{all.title}</h4>
              <p className="text-gray-700 mb-1">{all.content}</p>
              <div className='flex gap-5 items-center'>
                <p className="text-sm text-gray-500">Created {formatDistanceToNow(new Date(all.createdAt), { addSuffix: true })}</p>
                
                <div className='relative'>
                <button onClick={() => toggleDropdown(all._id)}><MdArrowDropDown /></button>
                {
                  activeDropdown === all._id && (
                    <div className="absolute left-0-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleEditClick(all)}>Edit</button>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => deletePost(all._id, fetchPublic)}>Delete</button>
                    </div>
                  )
                }
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-sm text-gray-500">Current Time: {formatDate(currentTime)}</p>
    </div>
  );
}

// Function to format date as "Month Day, Year, Hours:Minutes:Seconds"
const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

export default Published;
