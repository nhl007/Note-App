import protectRoutes from '../middleware/authenticateToken';
import {
  registerUser,
  getUserProfile,
  logoutUser,
  signInUser,
  updateProfile,
  updateUserPassword,
} from './../controllers/authController';
import { Router } from 'express';

const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(signInUser);
authRouter.route('/logout').get(logoutUser);
authRouter.route('/profile').get(protectRoutes, getUserProfile);

export default authRouter;
