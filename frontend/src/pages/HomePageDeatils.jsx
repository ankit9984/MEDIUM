import React, { useState } from 'react';
import PostDetails from '../components/PostDeatils/PostDetails';
import Comments from '../components/comments/Comments';

function HomePageDetails() {
  const [activeComment, setActiveComment] = useState(false);

  const handleActiveCommentToggle = (postId) => {
    setActiveComment(!activeComment);
    alert(postId)
  };

  return (
    <div>
      <PostDetails activeComment={activeComment} onToggleActiveComment={handleActiveCommentToggle} />
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${activeComment ? 'translate-x-0' : 'translate-x-full'}`}>
        <Comments/>
      </div>
    </div>
  );
}

export default HomePageDetails;
