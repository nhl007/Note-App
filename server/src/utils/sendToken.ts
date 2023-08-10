import { CookieOptions, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser, IUserMethods } from '../models/user';

const sendToken = (
  user: HydratedDocument<IUser, IUserMethods>,
  res: Response,
  statusCode: number
) => {
  const token = user.getJwtToken();
  const sevenDay = 7 * 1000 * 60 * 60 * 24;

  let cookieOptions: CookieOptions = {
    httpOnly: true,
    maxAge: sevenDay,
    sameSite: 'strict',
  };

  if (process.env.NODE_ENV === 'PROD') {
    cookieOptions = {
      httpOnly: true,
      maxAge: sevenDay,
      sameSite: 'none',
      secure: true,
    };
  }

  res.cookie('token', token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
