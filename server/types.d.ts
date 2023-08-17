import jwt from 'jsonwebtoken';
import { Request } from 'express';
import mongoose from 'mongoose';

interface reqWithUserData extends Request {
  user?: {
    id: mongoose.Schema.ObjectId;
    name?: string;
    email?: string;
  };
}

interface decodedToken extends jwt.JwtPayload {
  id?: string;
}

type noteImages = {
  assetId: string;
  url: string;
}[];
