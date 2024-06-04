import React, { useState } from 'react'
import { usePost } from '../../context/PostContex';

function HomeList() {
    const [activeButton, setActiveButton] = useState(0);
    const {getAllPublicPost} = usePost();

    const button = [
        'For You',
        'Following',
        'Start up',
        'Data Science',
        'Machine Learning',
        'JavaScript',
    ];

    const handleClick = async (data, index) => {
      setActiveButton(index);
      if(data === 'For You'){
        await getAllPublicPost();
      }
    }
  return (
    <div>
      <div className='flex justify-center items-center  overflow-x-auto space-x-10 p-4 border-b-4 border'>
        {button.map((label, index) => (
            <button
            key={index}
            className={`flex-shrink-0 text-xl  rounded ${
                activeButton === index ? 'border-b-4 border-b-black' : ''
            } text-black`} 
            onClick={() => handleClick(label, index)}>
                {label}
            </button>
        ))}
      </div>
    </div>
  )
}

export default HomeList
