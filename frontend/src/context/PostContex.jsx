import { createContext, useContext, useEffect, useState } from "react";
import api from "../apiServices/Api";

const PostContext = createContext();

//Provider component
export const PostProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [publicMe, setPublicME] = useState([])
    const [publicPost, setPublicPost] = useState([]);
    const [whoLikes, setWhoLikes] = useState([]);
    const [authorPost, setAuthorPost] = useState([]);
    const [follwingPosts, setFollowingPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [repliesComments, setRepliesComment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // console.log(authorPost);
    // console.log(publicPost);

  

  // console.log(follwingPosts);
  // console.log(publicPost);

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
        // console.log(allPublic);
        setPublicPost(allPublic);
        setLoading(false)
      } catch (error) {
        setError('Something went wrong')
      }
    }

    const toggleLike = async (postId) => {
      console.log("Toggling like for postId: ", postId);
      try {
          setLoading(true);
          const response = await api.post(`/like/${postId}`);
          const updatedPost = response.data.post;
          setPublicPost(publicPost.map(post => post._id === postId ? updatedPost : post));
          setLoading(false);
      } catch (error) {
          setError(error.response?.data?.error || 'Error toggling like');
          setLoading(false);
      }
  };
  
  const likerPersons = async (postId) => {
    try {
      setLoading(true);
      const response = await api.get(`/post/getlikes/${postId}`);
      // console.log(response);
      setWhoLikes(response.data.likes);
      // console.log(whoLikes);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
      console.log(error);
    }
  }

  const getAuthorPosts = async (authorId) => {
    console.log(authorId);
    try {
      setLoading(true);
      const response = await api.get(`/post/getPublicOfAuthor/${authorId}`);
      const data = response.data;
      console.log(data);
      setAuthorPost(data.authorPosts);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error);
      console.log(error);
    }
  }

  const fetchFollowingPosts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/post/followingpost');
      setFollowingPosts(response.data.posts)
      setLoading(false)
    } catch (error) {
      setError(error.response?.data?.error);
      setLoading(false)
    }
  }
  
  //Comments
  const createComment = async (postId, content) => {
    try {
      setLoading(true);
      const response = await api.post(`/post/${postId}/comments`, {content});
      // console.log(response);
    } catch (error) {
      setError(error.response?.data?.error || 'Error adding comment');
      setLoading(false);
    }
  }

  const getComments = async (postId) => {
    try {
      setLoading(true);
      const response = await api.get(`/post/${postId}/getcomment`);
      setComments(response.data.comments || []); // Ensure comments is an array
      console.log(response);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Error fetching comments');
      setLoading(false);
    }
  };

  const likeComment = async (commentId) => {
    try {
      setLoading(true);
      const response = await api.post(`/post/${commentId}/likecomment`);
      console.log(response);
    } catch (error) {
      setError(error.response?.data?.error || "Error liking comment");
      setLoading(false);
    }
  }

  const deleteComment = async (commentId) =>{
    try {
      setLoading(true);
      const response = await api.delete(`/post/${commentId}/deletecomment`);
      // setComments((prevComments) => 
      // prevComments.filter((comment) => comment._id !== comment))
      console.log(response);
    } catch (error) {
      setError(error.response?.data?.error || "Error deleting comment");
      setLoading(false);
    }
  }

  const getCommentReplies = async (commentId) => {
    try {
      setLoading(true);
      const response = await api.get(`/post/${commentId}/commentreplies`);
      const formattedComment = response.data.replies;
      console.log(formattedComment);
      setRepliesComment(formattedComment || []);
      console.log(repliesComments);
      // setComments(prevComments => {
      //   prevComments.map(comment => 
      //     comment._id === commentId ? formattedComment : comment
      //   )
      // });
      setLoading(false)
    } catch (error) {
      setError(error.response?.data?.error || "Error fetching comment replies");
      setLoading(false);
    }
  }

    return (
      <PostContext.Provider value={{posts, loading, toggleLike, error, createPost, fetchDrafts, drafts, publicMe, fetchPublic, deletePost, updatePost, publicPost, getAllPublicPost, whoLikes, likerPersons, authorPost, getAuthorPosts, fetchFollowingPosts, follwingPosts, createComment, getComments, comments, likeComment,deleteComment, getCommentReplies, repliesComments}}>
        {children}
      </PostContext.Provider>
    )
};

export const usePost = () => useContext(PostContext);