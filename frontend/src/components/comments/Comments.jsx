import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import api from '../../apiServices/Api';

function Comments({postId}) {
  const [textareaValue, setTextareaValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    // alert(postId)
  };

  const handleResponse = async () => {
    if(textareaValue.trim() === ''){
      setResponseMessage('Response cannot be empty')
      return;
    }

    try {
      const response = await api.post(`post/${postId}/comments`, {content: textareaValue});
      setTextareaValue('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setResponseMessage('Error adding comment');
    }

  }

  const isTextareaEmpty = textareaValue.trim() === '';
  
  return (
    <div>
      <div className='flex flex-col gap-5  m-5'>
        <div className='flex justify-between items-center'>
          <h1>Response(12)</h1>
          <span><IoMdClose /></span>
        </div>
        <div className='shadow-2xl p-5'>
          <div className='flex gap-2'>
            <img src="" alt="me" />
            <span>pnsopgaming</span>
          </div>
          <div>
          <textarea 
              name="" 
              id="" 
              className="w-full h-32 p-2 border rounded-md focus:outline-none  border-none " 
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
      </div>
    </div>
  )
}

export default Comments
