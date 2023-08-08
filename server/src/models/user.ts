import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export interface IUser {
  name: string;
  email: string;
  password: string;
  created_At: Date;
}
export interface IUserMethods {
  getJwtToken(): string;
  comparePassword(password: string): boolean;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: 'string',
    maxLength: [40, 'name cannot exceed 40 characters!'],
    required: [true, 'Please enter your name !'],
  },
  email: {
    type: 'string',
    unique: true,
    required: [true, 'Please enter your email !'],
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: 'string',
    required: [true, 'Please enter your password'],

    minlength: [7, "Password can't be lower than 7 characters!"],
    validate: [
      validator.isAlphanumeric,
      'Make sure to have at least one alphanumeric character!',
    ],
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method('getJwtToken', function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
});

userSchema.method('comparePassword', async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
