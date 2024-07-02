import Comment from "../model/comment.model.js";
import Post from "../model/post.model.js";

const createComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {postId} = req.params;
        const {content} = req.body;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({error: 'Post not found'})
        }

        if(!content || typeof content !== 'string'){
            return res.status(400).json({error: "Content is required and must be a string"});
        };

        const newComment = new Comment({
            author: userId,
            content
        });

        await newComment.save();
        
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({message: 'Comment created successfullly', newComment})
    } catch (error) {
        console.error('Error in createComment controller', error);
        res.status(500).json({message: 'Internal server error', error: error.message})
    }
};

const likeComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {commentId} = req.params;

        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({error: 'Comment not found'})
        };

        if(!comment.likes.includes(userId)){
            comment.likes.push(userId);
            await comment.save();
            return res.status(200).json({message: 'Comment liked', comment})
        }else {
            return res.status(400).json({ message: 'Comment already liked' });
        }
    } catch (error) {
        console.error('Error in likeComment controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const replyComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {commentId} = req.params;
        const {content} = req.body;

        const parentComment = await Comment.findById(commentId);
        if(!parentComment){
            return res.status(404).json({error: 'Comment not found'})
        };

        if(!content){
            return res.status(404).json({error: 'Replie is empty'})
        }

        const newReply = new Comment({
            author: userId,
            content
        });

        await newReply.save();
        parentComment.replies.push(newReply._id);
        await parentComment.save();

        res.status(201).json({ message: 'Reply created successfully', newReply });
    } catch (error) {
        console.error('Error in replyToComment controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const getComments = async (req, res) => {
    try {
        const {postId} = req.params;

        const post = await Post.findById(postId)
        .populate({
            path: 'comments',
            populate: [
                {path: 'author', select: 'username'},
                {path: 'likes', select: 'username'},
                {path: 'replies', populate: {path: 'author', select: 'username'}}
            ]
        })
        .populate('author', 'username');

        if(!post){
            return res.status(404).json({error: 'Post not found'})
        };

        res.status(200).json(post)
    } catch (error) {
        console.error('Error in getComments controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const {commentId} = req.params;
        const comment = await Comment.findById(commentId);
        
        if(!comment){
            return res.status(404).json({message: 'Comment not found'})
        };

       if(comment.author.toString() !== userId){
            return res.status(403).json({message: 'You are not authorized to delete this comment'})
       };

       await Post.updateOne(
        {comments: commentId},
        {$pull: {comments: commentId}}
       );

       // Delete the comment
       await Comment.findByIdAndDelete(commentId);
       res.status(200).json({message: 'Comment delete successfullly'})
    } catch (error) {
        console.error('Error in getComments controller', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export {
    createComment,
    likeComment,
    replyComment,
    getComments,
    deleteComment
}