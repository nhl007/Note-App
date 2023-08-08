import { NextFunction, Request, Response } from 'express';

const catchAsyncErrors =
  (func: funcParams) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

export default catchAsyncErrors;

type funcParams = (req: Request, res: Response, next: NextFunction) => any;
