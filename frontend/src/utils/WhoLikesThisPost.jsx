import React from 'react';
import { usePost } from '../context/PostContex';
import { FaUserCircle } from 'react-icons/fa'; // Placeholder for user avatar
import { useAuth } from '../context/AuthContext';

function WhoLikesThisPost() {
    const { whoLikes } = usePost();
    const {authState, followUser, unFollowUser} = useAuth();

    const handleFollow = async (userId) => {
        if(authState.isAuthenticated){
            try {
                await followUser(userId);
            } catch (error) {
                console.log('Error following user:', error);
            }
        } else {
            console.log('User not logged in, cannot follow');
        }
    };

    const handleUnfollow = async (userId) => {
        if (authState.isAuthenticated) { // Check if user is logged in
          try {
            await unFollowUser(userId); // Call unFollowUser function
          } catch (error) {
            console.error('Error unfollowing user:', error);
          }
        } else {
          console.log('User not logged in, cannot unfollow');
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">People who liked this post:</h3>
            <ul className="space-y-4">
                {whoLikes.map((person, index) => (
                    <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-20 gap-5">
                            {/* User avatar */}
                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                            <span className="text-gray-800 font-semibold">{person.username}</span>
                        </div>
                        {/* Follow button - Check if user is already following and display appropriate button */}
                        {authState.user && authState.user.following.includes(person._id) ? ( // Check if following
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                onClick={() => handleUnfollow(person._id)}
                            >
                                Unfollow
                            </button>
                        ) : (
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleFollow(person._id)}
                            >
                                Follow
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WhoLikesThisPost;
