import * as dotEnv from 'dotenv';
dotEnv.config();

import app from './app';
import connectToDatabase from './config/database';

const host = 'http://localhost';
const port = process.env.PORT || 5000;

connectToDatabase();

const server = app.listen(port, () => {
  console.log(`\nServer listening on ${host}:${port}\n`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('Shutting down the server due to: ' + err.message);
  server.close(() => {
    process.exit(1);
  });
});
