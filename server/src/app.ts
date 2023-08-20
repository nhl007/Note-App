import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';

import notesRouter from './routes/noteRoute';
import authRouter from './routes/authRoute';
import { handleErrors } from './middleware/error';

const app: Application = express();

const whitelist = process.env.WHITELIST.split(',');
console.log(whitelist);
const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // `!origin` allows server-to-server requests (ie, localhost requests)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS: ' + origin));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(helmet());

app.disable('x-powered-by');

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'running',
    message: 'Server is running !',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', notesRouter);

app.use((req, res, next) => {
  res.status(404).send('No route found!');
});

app.use(handleErrors);

export default app;
