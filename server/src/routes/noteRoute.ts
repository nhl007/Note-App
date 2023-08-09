import { Router } from 'express';
import {
  deleteNotes,
  getNotes,
  createNotes,
  updateNotes,
} from '../controllers/noteControllers';
import protectRoutes from '../middleware/authenticateToken';

const notesRouter = Router();

notesRouter
  .route('/')
  .get(protectRoutes, getNotes)
  .post(protectRoutes, createNotes);
notesRouter
  .route('/:id')
  .patch(protectRoutes, updateNotes)
  .delete(protectRoutes, deleteNotes);

export default notesRouter;
