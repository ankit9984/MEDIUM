import React, { useState } from 'react';
import PostDetails from '../components/PostDeatils/PostDetails';
import Comments from '../components/comments/Comments';
import { usePost } from '../context/PostContex';

function HomePageDetails() {
  const { getComments, comments } = usePost();
  const [activeComment, setActiveComment] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [initialLoad, setInitialLoad] = useState(false); // Add state to track initial load

  const handleActiveCommentToggle = async (postId) => {
    if (!initialLoad) { // Check if it's the initial load
      await getComments(postId); // Fetch comments on initial load
      setInitialLoad(true); // Set initialLoad to true after fetching comments
    }
    setActiveComment(!activeComment); // Toggle comment display
    setCurrentPostId(postId); // Set current post ID
    console.log(comments.comments?.length);
    console.log(comments);
  };

  return (
    <div>
      <PostDetails activeComment={activeComment} onToggleActiveComment={handleActiveCommentToggle} />
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${activeComment ? 'translate-x-0' : 'translate-x-full'}`}>
        <Comments postId={currentPostId} />
      </div>
    </div>
  );
}

export default HomePageDetails;
