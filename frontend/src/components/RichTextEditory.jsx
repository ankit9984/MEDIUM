import React, { useState } from 'react'
import { usePost } from '../context/PostContex';

function RichTextEditory() {
  const {createPost, loading, error} = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState('draft');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({title, content, visibility});
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
            <h2>Create Post</h2>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label htmlFor="content">Content:</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <label htmlFor="visibility">Visibility:</label>
            <select id="visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                <option value="draft">Draft</option>
                <option value="public">Public</option>
            </select>
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Post'}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default RichTextEditory
