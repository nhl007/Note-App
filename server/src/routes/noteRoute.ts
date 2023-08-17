import { Router } from 'express';
import {
  deleteNotes,
  getNotes,
  createNotes,
  updateNotes,
  postImages,
  getPublicNotes,
  getASingleNote,
} from '../controllers/noteControllers';
import protectRoutes from '../middleware/authenticateToken';

const notesRouter = Router();

notesRouter.route('/all').get(protectRoutes, getPublicNotes);

notesRouter
  .route('/')
  .get(protectRoutes, getNotes)
  .post(protectRoutes, createNotes);

notesRouter
  .route('/:id')
  .get(protectRoutes, getASingleNote)
  .patch(protectRoutes, updateNotes)
  .delete(protectRoutes, deleteNotes);

notesRouter.route('/image').post(protectRoutes, postImages);

export default notesRouter;
