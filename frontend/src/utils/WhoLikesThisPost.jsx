import React, { useState, useEffect } from 'react';
import { usePost } from '../context/PostContex';
import { FaUserCircle } from 'react-icons/fa'; // Placeholder for user avatar
import { useAuth } from '../context/AuthContext';

function WhoLikesThisPost() {
    const { whoLikes } = usePost();
    const { authState, followUser, unFollowUser, error } = useAuth();
    const [followingStatus, setFollowingStatus] = useState({});

    useEffect(() => {
        // Initialize the following status for each person
        if (authState.user) {
            const initialStatus = {};
            whoLikes.forEach(person => {
                initialStatus[person._id] = authState.user.following.includes(person._id);
            });
            setFollowingStatus(initialStatus);
        }
    }, [whoLikes, authState.user]);

    const handleFollowUnfollow = async (personId) => {
        if (authState.isAuthenticated) {
            if (personId === authState.user._id) {
                console.log('Cannot follow yourself');
                return;
            }
            const isFollowing = followingStatus[personId];
            setFollowingStatus({ ...followingStatus, [personId]: !isFollowing }); // Optimistically update UI
            try {
                if (isFollowing) {
                    await unFollowUser(personId);
                } else {
                    await followUser(personId);
                }
            } catch (error) {
                console.error('Error following/unfollowing user:', error);
                setFollowingStatus({ ...followingStatus, [personId]: isFollowing }); // Revert if error
            }
        } else {
            console.log('User not logged in, cannot follow/unfollow');
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
                        <button
                            className={`px-4 py-2 rounded ${followingStatus[person._id] ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                            onClick={() => handleFollowUnfollow(person._id)}
                            disabled={authState.isLoading}
                        >
                            {followingStatus[person._id] ? 'Unfollow' : 'Follow'}
                        </button>
                    </li>
                ))}
                {error && <p>{error}</p>}
            </ul>
        </div>
    );
}

export default WhoLikesThisPost;
