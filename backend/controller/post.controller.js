import mongoose from "mongoose";
import Post from "../model/post.model.js";
import User from "../model/user.model.js";

const createPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const {title, content, visibility} = req.body;

        console.log(userId);

        if(!title || !content){
            return res.status(400).json({error: 'Title and content are required'});
        };
        
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({error: 'User not found'})
        }
        
        const newPost = new Post({
            author: userId,
            title,
            content,
            visibility: visibility || 'draft'
        });

        await newPost.save();
        
        user.posts.push(newPost._id);
        await user.save();

        res.status(400).json({message: 'Post created successfully', newPost});
    } catch (error) {
        console.error('Error in createPost controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const {postId} = req.params;
        const updates = req.body;

        console.log(userId);

        const allowedUpdates = ['title', 'content', 'visibility'];

        console.log(Object.keys(updates));

        const isValidUpdate = Object.keys(updates).every(update => allowedUpdates.includes(update));
        if(!isValidUpdate){
            return res.status(400).json({message: 'Invalid update fields'});
        }

        const post = await Post.findOne({_id: postId, author: userId});
        if(!post){
            return res.status(404).json({message: 'Post not found or unauthorized update'});
        };

        updates.visibility = updates.visibility || post.visibility;

        console.log(Object.assign(post, updates));

        Object.assign(post, updates);
        await post.save();
        
        res.status(200).json({message: 'Post updated successfully', post})
    } catch (error) {
        console.error('Error in updatePost controller', error);
        res.status(500).json({error: 'Internal server error', error})
    }
}


const getDraftPost = async (req, res) => {
    try {
        const userId = req.user.id;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({error: 'Invalid user ID'})
        }

        const drafts = await Post.find({author: userId, visibility: 'draft'});

        res.status(200).json({message: 'Drafts retrived successfully', drafts});
    } catch (error) {
        console.error('Error in getDraftPost controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getPublicPost = async (req, res) => {
    try {
        const userId = req.user.id;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }


        const publics = await Post.find({author: userId, visibility: 'public'});

        res.status(200).json({message: 'Get all public post', publics})
    } catch (error) {
        console.error('Error in getPublicPost controller', error);
        res.status(500).json(error.message)
    }
}

const getAllPublicPost = async (req, res) => {
    try {
        const allPublic = await Post.find({visibility: 'public'})
        .populate({path: 'author', select: 'username'});
        res.status(200).json({message: 'All public posts retrieved successfully', allPublic});
    } catch (error) {
        console.error('Error in getAllPublicPost controller', error);
        res.status(500).json(error.message)
    }
}

const getPostById = async (req, res) => {
    try {
        const userId = req.user.id;
        const {postId} = req.params;

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({message: 'Invalid user Id'})
        };

        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message: 'Invalid post Id'})
        };

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({error: 'User not found'})
        };

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({error: 'Post not found'})
        };
        
        console.log(user.posts.includes(postId));

        if(!user.posts.includes(postId)){
            return res.status(404).json({error: 'You are not authorized to access to this '})
        }

        res.status(200).json({message: 'Post retrieved successfully', post})
    } catch (error) {
        console.error('Error in getPostById controller', error);
        res.status(500).json({message: 'Internal server error', error: error.message})
    }
}

const deletePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const {postId} = req.params;

        const user = await User.findById(userId);
        if(!user){
            return res.status(401).json({message: 'Unauthorized access'});
        };

        if(!user.posts.includes(postId)){
            return res.status(403).json({error: 'You are not authorized to delete this post'})
        };

        const deletePost = await Post.findOneAndDelete({_id: postId});
        if(!deletePost){
            return res.status(404).json({error: 'Post not found'})
        };

        user.posts.pull(postId);
        await user.save();

        res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        console.error('Error in deleteUserPost controller', error);
        res.status(500).json({message: 'Error deleting post', error})
    }
}

const getPostLikes = async (req, res) => {
    try {
        const {postId} = req.params;

        //check if postId is a valid MongoDB objectId
        if(!mongoose.Types.ObjectId.isValid(postId)){
            return res.status(400).json({message: 'Invalid post ID'})
        }

        //Find the post by its ID
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({error: 'Post not found'})
        };

        //Populate the 'likes' field to get the details of user who liked the post
        await post.populate({
            path: 'likes',
            populate: {path: 'user', select: 'username'}
        });

        //Extract the likes data from the post
        const likes = post.likes.map(like => like.user.username);
        console.log(likes);

        res.status(200).json({message: 'Post likes retrieved successfully', likes})
    } catch (error) {
        console.error('Error in getPostLikes controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export {
    createPost,
    getDraftPost,
    getPublicPost,
    getAllPublicPost,
    getPostById,
    updatePost,
    deletePost,
    getPostLikes
}