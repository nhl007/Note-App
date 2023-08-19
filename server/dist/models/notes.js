"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notesSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        maxlength: [100, 'Title can not exceed 100 characters!'],
        required: [true, 'Please enter a title'],
    },
    content: {
        type: String,
        required: [true, 'Please enter the content'],
    },
    images: [
        {
            assetId: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                require: [true, 'No url provided'],
            },
        },
    ],
    privacy: {
        type: String,
        default: 'private',
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Your are not authorized'],
        select: false,
    },
});
const Note = mongoose_1.default.model('Notes', notesSchema);
exports.default = Note;
//# sourceMappingURL=notes.js.map