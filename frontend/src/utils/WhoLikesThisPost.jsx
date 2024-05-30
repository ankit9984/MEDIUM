import React from 'react';
import { usePost } from '../context/PostContex';
import { FaUserCircle } from 'react-icons/fa'; // Placeholder for user avatar

function WhoLikesThisPost() {
    const { whoLikes } = usePost();
    
    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">People who liked this post:</h3>
            <ul className="space-y-4">
                {whoLikes.map((person, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-20 gap-5">
                            {/* User avatar */}
                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                            {person}
                            <span className="text-gray-800 font-semibold">{person.name}</span>
                        </div>
                        {/* Follow button */}
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Follow</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WhoLikesThisPost;
