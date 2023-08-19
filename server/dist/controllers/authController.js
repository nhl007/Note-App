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
exports.updateUserPassword = exports.updateProfile = exports.getUserProfile = exports.logoutUser = exports.signInUser = exports.registerUser = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const user_1 = __importDefault(require("../models/user"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendToken_1 = __importDefault(require("../utils/sendToken"));
//! register user
exports.registerUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return next(new errorHandler_1.default('Please enter all the required fields', 400));
    }
    const user = yield user_1.default.create({
        name,
        email,
        password,
    });
    (0, sendToken_1.default)(user, res, 201);
}));
//! sign in users
exports.signInUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler_1.default('Please enter all the required fields', 400));
    }
    const user = yield user_1.default.findOne({ email }).select('+password');
    if (!user) {
        return next(new errorHandler_1.default('Please input correct password', 401));
    }
    const isUser = user.comparePassword(password);
    if (!isUser) {
        return next(new errorHandler_1.default('Please input correct password', 401));
    }
    (0, sendToken_1.default)(user, res, 200);
}));
//! logout users
exports.logoutUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: 'logged out successfully' });
}));
//! get user profile
exports.getUserProfile = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!user) {
        return next(new errorHandler_1.default('No user profile found !', 404));
    }
    res.status(200).send({ success: true, user });
}));
//! update user profile
exports.updateProfile = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const newData = {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        image: req.body.image,
    };
    const user = yield user_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).send({ success: true, user: user });
}));
//! update password
exports.updateUserPassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = yield user_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c.id).select('+password');
    if (!user) {
        return next(new errorHandler_1.default('You are not authorized!', 404));
    }
    const isMatch = user.comparePassword(req.body.oldPassword);
    if (!isMatch) {
        return next(new errorHandler_1.default('The password doesnt match !', 404));
    }
    user.password = req.body.password;
    yield user.save();
    (0, sendToken_1.default)(user, res, 201);
}));
//# sourceMappingURL=authController.js.map