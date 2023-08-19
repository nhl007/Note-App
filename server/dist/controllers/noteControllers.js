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
exports.postImages = exports.deleteNotes = exports.updateNotes = exports.createNotes = exports.getPublicNotes = exports.getASingleNote = exports.getNotes = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const notes_1 = __importDefault(require("../models/notes"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
exports.getNotes = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const notes = yield notes_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id })
        .populate('userId')
        .limit(10)
        .sort({ createdAt: 'desc' });
    if (!notes) {
        return next(new errorHandler_1.default('No notes found!', 404));
    }
    res.json({
        success: true,
        notes: notes,
    });
}));
exports.getASingleNote = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const notes = yield notes_1.default.findById(id);
    if (!notes) {
        return next(new errorHandler_1.default('No notes found!', 404));
    }
    res.json({
        success: true,
        note: notes,
    });
}));
exports.getPublicNotes = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const notes = yield notes_1.default.find({
        privacy: 'public',
        userId: { $ne: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id },
    })
        .populate('userId')
        .limit(10)
        .sort({ createdAt: 'desc' });
    if (!notes) {
        return next(new errorHandler_1.default('No notes found!', 404));
    }
    res.json({
        success: true,
        notes: notes,
    });
}));
exports.createNotes = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const { title, content, images, privacy, id } = req.body;
    if (!title || !content || !userId) {
        return next(new errorHandler_1.default('Please provide all the necessary data !', 400));
    }
    if (id) {
        const note = yield notes_1.default.findOneAndUpdate({ _id: id }, { title, content, userId, images, privacy }, { upsert: true, new: true });
        res.status(201).json({
            success: true,
            message: 'Successfully updated the note!',
            note: note,
        });
    }
    else {
        const note = yield notes_1.default.create({
            title,
            content,
            userId,
            images,
            privacy,
        });
        res.status(201).json({
            success: true,
            message: 'Successfully created a new note!',
            note: note,
        });
    }
}));
exports.updateNotes = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, privacy, images } = req.body;
    const id = req.params.id;
    if (!id || !title || !content) {
        return next(new errorHandler_1.default('Please provide valid data!', 404));
    }
    const note = yield notes_1.default.findByIdAndUpdate(id, {
        title: title,
        content: content,
        privacy: privacy,
        images: images,
    }, { upsert: true });
    res.json({
        success: true,
        note: note,
    });
}));
exports.deleteNotes = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        return next(new errorHandler_1.default('No notes found!', 404));
    }
    const note = yield notes_1.default.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        note: note,
    });
}));
exports.postImages = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fileStr = req.body.data;
    yield cloudinary_1.default.uploader
        .upload(fileStr, {
        upload_preset: 'noteapp',
    })
        .then((response) => {
        res.json({
            msg: 'success',
            data: { url: response.secure_url, assetId: response.asset_id },
        });
    })
        .catch(() => {
        return next(new errorHandler_1.default('Something went wrong!', 401));
    });
}));
//# sourceMappingURL=noteControllers.js.map