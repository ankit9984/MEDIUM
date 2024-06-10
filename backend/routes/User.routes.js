import express from 'express';
import {  followUser, getAuthorInfo, getUser, loginUser, logoutUser, registerUser, unFollowUser, updateUser } from '../controller/User.controller.js';
import { verifyToken } from '../middleware/Auth.middleware.js';
import validateObjectId from '../middleware/validObjectId.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update', verifyToken, updateUser);
router.post('/logout', verifyToken, logoutUser);
router.get('/getuser', verifyToken, getUser);

//FollowandUnfollow User
router.post('/follow/:userToFollowId', verifyToken, followUser);
router.post('/unfollow/:userToUnfollowId', verifyToken, validateObjectId('userToUnfollowId'), unFollowUser);
router.get('/getauthorinfo/:authorId', verifyToken, validateObjectId('authorId'), getAuthorInfo);

export default router;