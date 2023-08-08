import mongoose from 'mongoose';

const connectToDatabase = () => {
  const environment = process.env.NODE_ENV || 'DEV';
  const dbUri: string =
    environment === 'PROD'
      ? (process.env.MONGO_PROD_URL as string)
      : (process.env.DB_LOCAl_URI as string);

  mongoose
    .connect(dbUri, {
      dbName: process.env.DB_NAME as string,
    })
    .then((con) => {
      if (environment.match('DEV')) {
        console.log(
          `Connected to MongoDB with Host: ${con.connection.host}:${con.connection.port}`
        );
      }
      if (environment.match('PROD')) {
        console.log('Connected to MongoDB in Production Environment !');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDatabase;
