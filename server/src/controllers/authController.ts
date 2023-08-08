import { reqWithUserData } from '../../types';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import User from '../models/user';
import errorHandler from '../utils/errorHandler';
import sendToken from '../utils/sendToken';

//! register user
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return next(new errorHandler('Please enter all the required fields', 400));
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, res, 201);
});

//! sign in users

export const signInUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler('Please enter all the required fields', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new errorHandler('Please input correct password', 401));
  }

  const isUser = user.comparePassword(password);

  if (!isUser) {
    return next(new errorHandler('Please input correct password', 401));
  }
  sendToken(user, res, 200);
});

//! logout users

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: 'logged out successfully' });
});

//! get user profile

export const getUserProfile = catchAsyncErrors(
  async (req: reqWithUserData, res, next) => {
    console.log(req.user?.id);
    const user = await User.findById(req.user?.id);
    if (!user) {
      return next(new errorHandler('No user profile found !', 404));
    }
    res.status(200).send({ success: true, user });
  }
);

//! update user profile

export const updateProfile = catchAsyncErrors(
  async (req: reqWithUserData, res, next) => {
    const newData = {
      name: req.body.name,
      email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user?.id, newData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).send({ success: true, user });
  }
);

//! get user profile

export const updateUserPassword = catchAsyncErrors(
  async (req: reqWithUserData, res, next) => {
    const user = await User.findById(req.user?.id).select('+password');
    if (!user) {
      return next(new errorHandler('You are not authorized!', 404));
    }
    const isMatch = user.comparePassword(req.body.oldPassword);
    if (!isMatch) {
      return next(new errorHandler('The password doesnt match !', 404));
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, res, 201);
  }
);
