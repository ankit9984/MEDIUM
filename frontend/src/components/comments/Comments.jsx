import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { PiHandsClapping } from "react-icons/pi";
import { formatDistanceToNow } from 'date-fns';
import { usePost } from '../../context/PostContex';

function Comments({ postId }) {
  const { createComment, comments, getComments, likeComment } = usePost();
  const [textareaValue, setTextareaValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
                  <div className='text-2xl'>
                    <span><CiSettings /></span>
                  </div>
                </div>
                <div className='border-b-2 p-2'>
                  <div>
                    <p>{comment.content}</p>
                  </div>
                  <div className='flex justify-between items-center mt-2 text-xl'>
                    <div className='flex gap-2 items-center'>
                      <PiHandsClapping onClick={() => handleLikeComment(comment._id)} className='cursor-pointer'/>
                      <span>{comment.likes.length}</span>
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
