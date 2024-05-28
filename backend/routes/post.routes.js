import express from 'express';
import { createPost, deletePost, getAllPublicPost, getDraftPost, getPostById, getPublicPost, updatePost } from '../controller/post.controller.js';
import { verifyToken } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/newpost',verifyToken, createPost);
router.put('/updatepost/:postId', verifyToken, updatePost);
router.get('/getdraft', verifyToken, getDraftPost);
router.get('/getpublic', verifyToken, getPublicPost);
router.get('/getallpublicpost', verifyToken, getAllPublicPost);
router.get('/getpostbyid/:postId', verifyToken, getPostById);
router.delete('/deletepost/:postId', verifyToken, deletePost);

export default router;