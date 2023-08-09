import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import errorHandler from '../utils/errorHandler';
import Note from '../models/notes';
import { reqWithUserData } from '../../types';

export const getNotes = catchAsyncErrors(
  async (req: reqWithUserData, res: Response, next: NextFunction) => {
    const notes = await Note.find({ userId: req.user?.id }).limit(10);
    if (!notes) {
      return next(new errorHandler('No notes found!', 404));
    }
    res.json({
      success: true,
      notes: notes,
    });
  }
);

export const createNotes = catchAsyncErrors(
  async (req: reqWithUserData, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { title, content } = req.body;
    if (!title || !content || !userId) {
      return next(
        new errorHandler('Please provide all the necessary data !', 400)
      );
    }
    const note = await Note.create({ title, content, userId });

    res.status(201).json({
      success: true,
      note: note,
    });
  }
);

export const updateNotes = catchAsyncErrors(async (req, res, next) => {
  const { title, content } = req.body;
  const id = req.params.id;
  if (!id || !title || !content) {
    return next(new errorHandler('No notes found!', 404));
  }
  const note = await Note.findByIdAndUpdate(id, {
    title: title,
    content: content,
  });
  res.json({
    success: true,
    note: note,
  });
});
export const deleteNotes = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
      return next(new errorHandler('No notes found!', 404));
    }
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      note: note,
    });
  }
);
