import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';

export const getNotes = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
export const postNotes = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    res.json({
      success: true,
    });
  }
);
export const updateNotes = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
export const deleteNotes = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
    });
  }
);
