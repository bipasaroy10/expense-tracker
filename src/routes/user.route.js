import express from 'express';
import { createUser, forgetPassword, signinUser, signoutUser, verifyForgetPasswordOtp } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';



const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', signinUser);
router.post('/signout', authenticate, signoutUser);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', verifyForgetPasswordOtp)

export default router;