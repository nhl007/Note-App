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
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: 'string',
        maxLength: [40, 'name cannot exceed 40 characters!'],
        required: [true, 'Please enter your name !'],
    },
    email: {
        type: 'string',
        unique: true,
        required: [true, 'Please enter your email !'],
        validate: [validator_1.default.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: 'string',
        required: [true, 'Please enter your password'],
        minlength: [7, "Password can't be lower than 7 characters!"],
        validate: [
            validator_1.default.isAlphanumeric,
            'Make sure to have at least one alphanumeric character!',
        ],
        select: false,
    },
    description: {
        type: 'string',
        required: false,
    },
    image: {
        url: {
            type: String,
        },
        assetId: {
            type: String,
        },
    },
    created_At: {
        type: Date,
        default: Date.now(),
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        this.password = yield bcrypt_1.default.hash(this.password, 10);
    });
});
userSchema.method('getJwtToken', function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
});
userSchema.method('comparePassword', function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map