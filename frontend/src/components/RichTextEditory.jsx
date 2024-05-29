import React, { useEffect, useState } from 'react';
import { usePost } from '../context/PostContex';
import {useNavigate} from 'react-router-dom'

function RichTextEditory({post}) {
  const { createPost, updatePost, loading, error} = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('draft');
  const navigate = useNavigate();
  
  useEffect(() => {
    if(post){
      setTitle(post.title);
      setContent(post.content);
      setVisibility(post.visibility)
    }
  },[post])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(post){
        await updatePost(post._id, {title, content, visibility});
        console.log(visibility);
        if(visibility === 'public'){
          navigate('/me/stories/published')
        }else {
          navigate('/me/stories/draft')
        }
      }else {
        await createPost({ title, content, visibility });
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold">Create Post</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">Visibility:</label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="public">Public</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (post ? 'Updating....' : 'Creating...') : (post ? 'Update post' : 'Create post')}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default RichTextEditory;
