import jwt from 'jsonwebtoken';
import catchAsyncErrors from './catchAsyncErrors';
import errorHandler from '../utils/errorHandler';
import User from '../models/user';
import { decodedToken, reqWithUserData } from '../types';

const protectRoutes = catchAsyncErrors(
  async (req: reqWithUserData, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new errorHandler('You are not allowed to access this route', 404)
      );
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as decodedToken;
    const user = await User.findById(decoded.id);
    req.user = {
      email: user?.email,
      id: user?.id,
      name: user?.name,
    };
    next();
  }
);

export default protectRoutes;
