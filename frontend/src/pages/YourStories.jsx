import React, { useState } from 'react'
import Draft from '../components/DraftPublished/Draft'
import Published from '../components/DraftPublished/Published'
import { Link, useNavigate } from 'react-router-dom';

function YourStories() {
    const [selectedTab, setSelectedTab] = useState('drafts');
    const navigate = useNavigate();
    
    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
        const validTabs = ['drafts', 'published', 'responses'];
        
        if(validTabs.includes(tabName)){
            navigate(`${tabName}`)
        }else{
            alert(`Invalid tab name: ${tabName}`);
        }
    };

    const renderedComponent = () => {
        switch (selectedTab) {
          case 'drafts':
            return <Draft />;
          case 'published':
            return <Published />;
          default: 
            return null
        }
      };
    
    return (
        <div className='border-2 border-red-500 m-5'>
            <div className='flex justify-between '>
                <div>
                    <h1 className='text-2xl'>Your stories</h1>
                    <ul className='inline-flex gap-5 mt-5'>
                        <li
                        className={selectedTab === 'drafts' ? 'font-bold underline' : 'cursor-pointer'}
                        onClick={() => handleTabClick('drafts')}>
                            Drafts
                        </li>
                        <li
                        className={selectedTab === 'published' ? 'font-bold underline' : 'cursor-pointer'}
                        onClick={() => handleTabClick('published')}>
                        Published
                        </li>
                        <li 
                        className={selectedTab === 'responses' ? 'font-bold underline' : 'cursor-pointer'}
                        onClick={() => handleTabClick('responses')}>
                        Responses</li>
                    </ul>
                </div>
                <div>
                    <button className='bg-green-500 text-white rounded px-3 py-2 mr-5'><Link to='/new-story'>Write a story</Link></button>
                    <button className='bg-green-500 text-white rounded px-3 py-2'>Import a story</button>
                </div>
            </div>
            {renderedComponent()}
        </div>
    )
}

export default YourStories
