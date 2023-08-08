import { Router } from 'express';
import {
  deleteNotes,
  getNotes,
  postNotes,
  updateNotes,
} from '../controllers/noteControllers';

const notesRouter = Router();

notesRouter.route('/').get(getNotes).post(postNotes);
notesRouter.route('/:id').patch(updateNotes).delete(deleteNotes);

export default notesRouter;
