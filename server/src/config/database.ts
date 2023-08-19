import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const environment = process.env.ENVIRONMENT || 'development';
  const dbUri: string =
    environment === 'production'
      ? (process.env.MONGO_PROD_URL as string)
      : (process.env.DB_LOCAl_URI as string);

  await mongoose
    .connect(dbUri, {
      dbName: process.env.DB_NAME as string,
    })
    .then((con) => {
      if (environment.match('development')) {
        console.log(
          `Connected to MongoDB with Host: ${con.connection.host}:${con.connection.port}`
        );
      }
      if (environment.match('production')) {
        console.log('Connected to MongoDB in Production Environment !');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectToDatabase;
