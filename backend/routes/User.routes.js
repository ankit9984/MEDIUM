import express from 'express';
import { loginUser, logoutUser, registerUser, updateUser } from '../controller/User.controller.js';
import { verifyToken } from '../middleware/Auth.middleware.js';

const router = express.Router();

router.post('/newuser', registerUser);
router.post('/login', loginUser);
router.put('/update', verifyToken, updateUser);
router.post('/logout', verifyToken, logoutUser);

export default router;