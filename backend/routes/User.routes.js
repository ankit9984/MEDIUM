import express from 'express';
import { followUser, loginUser, logoutUser, registerUser, unFollowUser, updateUser } from '../controller/User.controller.js';
import { verifyToken } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', verifyToken, updateUser);
router.post('/logout', verifyToken, logoutUser);

//FollowandUnfollow User
router.post('/follow/:userId', verifyToken, followUser);
router.post('/unfollow/:userId', verifyToken, unFollowUser);

export default router;