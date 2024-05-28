import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    visibility: {
        type: String,
        enum: ['public', 'draft'],
        default: 'draft'
    }
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

export default Post;