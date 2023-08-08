import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import notesRouter from './routes/noteRoute';
import authRouter from './routes/authRoute';
import { handleErrors } from './middleware/error';

import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'running',
    message: 'Server is running !',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', notesRouter);

app.use(handleErrors);

export default app;
