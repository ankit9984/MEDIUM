import express from 'express';
import { followUser, getAuthorInfo, getFollowing, getUser, loginUser, logoutUser, registerUser, unFollowUser, updateUser } from '../controller/User.controller.js';
import { verifyToken } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', verifyToken, updateUser);
router.post('/logout', verifyToken, logoutUser);
router.get('/getuser', verifyToken, getUser);

//FollowandUnfollow User
router.post('/follow/:userId', verifyToken, followUser);
router.post('/unfollow/:userId', verifyToken, unFollowUser);
router.get('/getfollowing', verifyToken, getFollowing);
router.get('/getauthorinfo/:authorId', verifyToken, getAuthorInfo);

export default router;