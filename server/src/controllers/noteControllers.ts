import { Request, Response, NextFunction } from 'express';
import catchAsyncErrors from '../middleware/catchAsyncErrors';
import errorHandler from '../utils/errorHandler';
import Note from '../models/notes';
import { noteImages, reqWithUserData } from '../../types';
import cloud from '../config/cloudinary';

export const getNotes = catchAsyncErrors(
  async (req: reqWithUserData, res: Response, next: NextFunction) => {
    const notes = await Note.find({ userId: req.user?.id })
      .limit(10)
      .sort({ createdAt: 'desc' });
    if (!notes) {
      return next(new errorHandler('No notes found!', 404));
    }
    res.json({
      success: true,
      notes: notes,
    });
  }
);

export const getASingleNote = catchAsyncErrors(
  async (req: reqWithUserData, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const notes = await Note.findById(id);
    if (!notes) {
      return next(new errorHandler('No notes found!', 404));
    }
    res.json({
      success: true,
      note: notes,
    });
  }
);

export const getPublicNotes = catchAsyncErrors(
  async (req: reqWithUserData, res: Response, next: NextFunction) => {
    console.log(req.user?.id);
    const notes = await Note.find({
      privacy: 'public',
      userId: { $ne: req.user?.id },
    })
      .limit(10)
      .sort({ createdAt: 'desc' });
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
    const { title, content, images, privacy } = req.body;
    if (!title || !content || !userId) {
      return next(
        new errorHandler('Please provide all the necessary data !', 400)
      );
    }
    const note = await Note.create({ title, content, userId, images, privacy });

    res.status(201).json({
      success: true,
      note: note,
    });
  }
);

export const updateNotes = catchAsyncErrors(async (req, res, next) => {
  const { title, content, privacy, images } = req.body;
  const id = req.params.id;
  if (!id || !title || !content) {
    return next(new errorHandler('No notes found!', 404));
  }
  const note = await Note.findByIdAndUpdate(
    id,
    {
      title: title,
      content: content,
      privacy: privacy,
      images: images,
    },
    { upsert: true }
  );
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

export const postImages = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const fileStr = req.body.data;
    await cloud.uploader
      .upload(fileStr, {
        upload_preset: 'noteapp',
      })
      .then((response) => {
        res.json({
          msg: 'success',
          data: { url: response.secure_url, assetId: response.asset_id },
        });
      })
      .catch(() => {
        return next(new errorHandler('Something went wrong!', 401));
      });
  }
);
