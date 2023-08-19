import express, { Application, NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import notesRouter from './routes/noteRoute';
import authRouter from './routes/authRoute';
import { handleErrors } from './middleware/error';

import rateLimit from 'express-rate-limit';

import helmet from 'helmet';

import cookieParser from 'cookie-parser';

const app: Application = express();

const whitelist = (process.env.WHITELIST as string).split(',');

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

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
