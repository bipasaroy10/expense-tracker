import express from 'express';
import { createUser, signinUser, signoutUser } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';



const router = express.Router();

router.post('/signup', createUser);
router.post('/signin', signinUser);
router.post('/signout', authenticate, signoutUser);

export default router;