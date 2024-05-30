import express from 'express';
import { verifyToken } from '../middleware/Auth.middleware.js';
import { toggleLikePost } from '../controller/likeUnlike.controller.js';

const router = express.Router();

router.post('/like/:postId', verifyToken, toggleLikePost);

export default router;