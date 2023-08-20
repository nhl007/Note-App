"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => {
    // const environment = process.env.ENVIRONMENT || 'development';
    // const dbUri: string =
    //   environment === 'production'
    //     ? (process.env.MONGO_PROD_URL as string)
    //     : (process.env.DB_LOCAl_URI as string);
    const dbUri = process.env.MONGO_PROD_URL;
    mongoose_1.default
        .connect(dbUri, {
        dbName: process.env.DB_NAME,
    })
        .then((con) => {
        // if (environment.match('development')) {
        //   console.log(
        //     `Connected to MongoDB with Host: ${con.connection.host}:${con.connection.port}`
        //   );
        // }
        // if (environment.match('production')) {
        //   console.log('Connected to MongoDB in Production Environment !');
        // }
        console.log('Connected to MongoDB in Production Environment !');
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.default = connectToDatabase;
//# sourceMappingURL=database.js.map