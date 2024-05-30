import Like from "../model/like.model.js";
import Post from "../model/post.model.js";

const toggleLikePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        console.log(userId);

        // Check if the user already liked the post
        const existingLike = await Like.findOne({ user: userId, post: postId });

        if (existingLike) {
            // Unlike the post
            await Like.findByIdAndDelete(existingLike._id);

            // Update the post's like count
            const post = await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: existingLike._id } },
                { new: true } // To return the updated document
            );

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json({ message: 'Post unliked successfully', post });
        } else {
            // Like the post
            const newLike = new Like({ user: userId, post: postId });
            await newLike.save();

            // Update the post's like count
            const post = await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: newLike._id } },
                { new: true } // To return the updated document
            );

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json({ message: 'Post liked successfully', post });
        }
    } catch (error) {
        console.error('Error in toggleLikePost controller', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export {
    toggleLikePost
};
