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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsyncErrors_1 = __importDefault(require("./catchAsyncErrors"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const user_1 = __importDefault(require("../models/user"));
const protectRoutes = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        return next(new errorHandler_1.default('You are not allowed to access this route', 404));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = yield user_1.default.findById(decoded.id);
    req.user = {
        email: user === null || user === void 0 ? void 0 : user.email,
        id: user === null || user === void 0 ? void 0 : user.id,
        name: user === null || user === void 0 ? void 0 : user.name,
    };
    next();
}));
exports.default = protectRoutes;
//# sourceMappingURL=authenticateToken.js.map