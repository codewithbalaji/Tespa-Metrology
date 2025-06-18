import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import { getChatResponse } from '../controllers/chatController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/chat', getChatResponse)


export default userRouter;