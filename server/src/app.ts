import express, { Application, NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import notesRouter from './routes/noteRoute';
import authRouter from './routes/authRoute';
import { handleErrors } from './middleware/error';

import cookieParser from 'cookie-parser';

const app: Application = express();

const whitelist = 'http://localhost:5173';

// const whitelist = process.env.WHITELIST?.split(',');
// console.log(whitelist);

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // `!origin` allows server-to-server requests (ie, localhost requests)
    if (!origin || whitelist?.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
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
