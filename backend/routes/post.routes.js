import express from 'express';
import { createPost, deletePost, followingPost, getAllPublicPost, getDraftPost, getPostById, getPostLikes, getPublicPost, getPublicPostOfAuthorById, updatePost } from '../controller/post.controller.js';
import { verifyToken } from '../middleware/Auth.middleware.js';
import { createComment, getComments, likeComment, replyComment } from '../controller/comment.controller.js';

const router = express.Router();

router.post('/newpost',verifyToken, createPost);
router.put('/updatepost/:postId', verifyToken, updatePost);
router.get('/getdraft', verifyToken, getDraftPost);
router.get('/getpublic', verifyToken, getPublicPost);
router.get('/getallpublicpost', verifyToken, getAllPublicPost);
router.get('/getpostbyid/:postId', verifyToken, getPostById);
router.delete('/deletepost/:postId', verifyToken, deletePost);
router.get('/getlikes/:postId', verifyToken, getPostLikes);
router.get('/getPublicOfAuthor/:authorId', verifyToken, getPublicPostOfAuthorById);
router.get('/followingpost', verifyToken, followingPost);

//Comment routes
router.post('/:postId/comments', verifyToken, createComment);
router.post('/:commentId/likecomment', verifyToken, likeComment);
router.post('/:commentId/replies', verifyToken, replyComment);
router.get('/:postId/getcomment', verifyToken, getComments)

export default router;