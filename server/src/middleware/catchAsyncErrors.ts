import { NextFunction, Request, Response } from 'express';
import { reqWithUserData } from '../../types';

const catchAsyncErrors =
  (func: funcParams) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

export default catchAsyncErrors;

type funcParams = (
  req: reqWithUserData,
  res: Response,
  next: NextFunction
) => any;
