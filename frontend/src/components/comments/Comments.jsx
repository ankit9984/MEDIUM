import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { PiHandsClapping } from "react-icons/pi";
import { FaComment } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns';
import { usePost } from '../../context/PostContex';
import { useAuth } from '../../context/AuthContext';

function Comments({ postId }) {
  const { createComment, comments, getComments, likeComment, deleteComment } = usePost();
  const {authState} = useAuth();
  const [textareaValue, setTextareaValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [show, setShow] = useState(false);

  const {user} = authState

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleResponse = async () => {
    if (textareaValue.trim() === '') {
      setResponseMessage('Response cannot be empty');
      return;
    }

    try {
      await createComment(postId, textareaValue);
      setTextareaValue('');
      setResponseMessage('Comment added successfully');
      setTextareaValue('');
      getComments(postId)
    } catch (error) {
      console.error('Error adding comment:', error);
      setResponseMessage('Error adding comment');
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await likeComment(commentId);
    } catch (error) {
      console.log('Error like comment', error);
    }
  }

  const toggleSetting = () => {
    setShow(!show)
    console.log(user);
  }

  const handleDeleteComment = async (commentId) =>{
    await deleteComment(commentId);
    await getComments(postId);
  }
  console.log(comments);
  comments.forEach(comment => {
    console.log(comment.repliesCount);
  });
  

  const isTextareaEmpty = textareaValue.trim() === '';

  return (
    <div className='max-h-full overflow-y-auto'>
      <div className='flex flex-col gap-5 m-5'>
        <div className='flex justify-between items-center'>
          <h1>Response({comments.length})</h1>
          <span><IoMdClose /></span>
        </div>
        <div className='shadow-2xl p-5'>
          <div className='flex gap-2'>
            <img src="" alt="me" />
            <span>pnsopgaming</span>
          </div>
          <div>
            <textarea
              className="w-full h-32 p-2 border rounded-md focus:outline-none border-none"
              placeholder="Write your response..."
              onChange={handleTextareaChange}
            ></textarea>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-5'>
              <span>B</span>
              <span>I</span>
            </div>
            <div className='flex gap-5'>
              <button>Cancel</button>
              <button onClick={handleResponse} className={`p-1 rounded-xl text-white ${isTextareaEmpty ? 'bg-green-300' : 'bg-green-600'}`}>Response</button>
            </div>
          </div>
          {responseMessage && <div>{responseMessage}</div>}
        </div>
        <div className=''>
          {comments.map((comment, index) => (
            <div key={index}>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-4 items-center'>
                    <img src="" alt="User" />
                    <div>
                      <p>{comment.author.username}</p>
                      <p>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <div className='bg-red-50 relative'>
                    <div className='text-2xl '>
                      <span onClick={toggleSetting}><CiSettings /></span>
                    </div>
                    {show && (
                      <div className='absolute right-5 shadow-2xl bg-red-50 w-44 text-center'>
                        <p>Report this comment</p>
                        {user && user._id === comment.author._id && (
                          <div onClick={() => handleDeleteComment(comment._id)}>Delete</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className='border-b-2 p-2'>
                  <div>
                    <p>{comment.content}</p>
                  </div>
                  <div className='flex justify-between items-center mt-2 text-xl'>
                    <div className='flex gap-4 items-center'>
                      <div className='flex items-center gap-1'>
                        <PiHandsClapping onClick={() => handleLikeComment(comment._id)} className='cursor-pointer'/>
                        <span>{comment.likes.length}</span>
                      </div>
                      {/* {comment && comment.replies.length > 0 && (
                        <div className='flex items-center gap-1'>
                          <FaComment/>
                          <span>{comment.replies.length}</span>
                        </div>
                      )} */}
                      {comment.repliesCount > 0 && (
                        <div className='flex items-center gap-1'>
                          <FaComment/>
                          <span>{comment.repliesCount}</span>
                        </div>
                      )}
                    </div>
                    <p>reply</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Comments
