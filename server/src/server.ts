import app from './app';
import * as dotEnv from 'dotenv';
import connectToDatabase from './config/database';

dotEnv.config();

const host = 'http://localhost';
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  connectToDatabase();
  console.log(`\nServer listening on ${host}:${port}\n`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('Shutting down the server due to: ' + err.message);
  server.close(() => {
    process.exit(1);
  });
});
