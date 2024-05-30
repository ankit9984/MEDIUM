import { createContext, useContext, useState } from "react";
import api from "../apiServices/Api";

const PostContext = createContext();

//Provider component
export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [publicMe, setPublicME] = useState([])
    const [publicPost, setPublicPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(posts);

    const createPost = async (postDetails) => {
        try {
            setLoading(true);
            const resposne = await api.post('/post/newpost', postDetails);
            setPosts([...posts, resposne.data.newPost]);
            setLoading(false);
        } catch (error) {
            setError(error.resposne?.data?.error || 'Error creating post');
            setLoading(false);
        }
    };

    const updatePost = async (postId, postDetails) => {
      try {
        setLoading(true);
        const response = await api.put(`/post/updatepost/${postId}`, postDetails);
        setPosts(posts.map(post => post._id === postId ? response.data.post : post));
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Error updating post');
        setLoading(false);
      }
    }

    const fetchDrafts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/post/getdraft');
        const drafts = response.data.drafts;
        setDrafts(drafts);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Error fetching drafts');
        setLoading(false);
      }
    };

    const fetchPublic = async () => {
      try {
        setLoading(true);
        const response = await api.get('/post/getpublic');
        const publics = response.data.publics;
        setPublicME(publics);
        setLoading(false)
      } catch (error) {
        setError(error.response?.data?.error || 'Error fetching drafts')

      }
    };

    const deletePost = async (postId, callback) => {
      console.log(callback);
      try {
        setLoading(true);
        await api.delete(`/post/deletepost/${postId}`);
        setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
        if(callback){
          callback();
        }
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'Error deleting post');
        setLoading(false);
      }
    }

    const getAllPublicPost = async () => {
      try {
        setLoading(true);
        const response = await api.get('/post/getallpublicpost');
        const allPublic = response.data.allPublic;
        console.log(allPublic);
        setPublicPost(allPublic);
        setLoading(false)
      } catch (error) {
        setError('Something went wrong')
      }
    }

    const toggleLike = async (postId) => {
      console.log(postId);
      try {
          setLoading(true);
          const response = await api.post(`/like/${postId}`);
          const updatedPost = response.data.post;
          setPublicPost(publicPost.map(post => post._id === postId ? updatedPost : post));
          console.log(publicPost);
          setLoading(false);
      } catch (error) {
          setError(error.response?.data?.error || 'Error toggling like');
          setLoading(false);
      }
  };

    return (
      <PostContext.Provider value={{posts, loading, toggleLike, error, createPost, fetchDrafts, drafts, publicMe, fetchPublic, deletePost, updatePost, publicPost, getAllPublicPost}}>
        {children}
      </PostContext.Provider>
    )
};

export const usePost = () => useContext(PostContext);