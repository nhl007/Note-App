"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const environment = process.env.ENVIRONMENT || 'development';
    const dbUri = environment === 'production'
        ? process.env.MONGO_PROD_URL
        : process.env.DB_LOCAl_URI;
    yield mongoose_1.default
        .connect(dbUri, {
        dbName: process.env.DB_NAME,
    })
        .then((con) => {
        if (environment.match('development')) {
            console.log(`Connected to MongoDB with Host: ${con.connection.host}:${con.connection.port}`);
        }
        if (environment.match('production')) {
            console.log('Connected to MongoDB in Production Environment !');
        }
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.default = connectToDatabase;
//# sourceMappingURL=database.js.map