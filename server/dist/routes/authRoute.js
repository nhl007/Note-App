"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const authController_1 = require("./../controllers/authController");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.route('/register').post(authController_1.registerUser);
authRouter.route('/login').post(authController_1.signInUser);
authRouter.route('/logout').get(authController_1.logoutUser);
authRouter.route('/update').post(authenticateToken_1.default, authController_1.updateProfile);
authRouter.route('/profile').get(authenticateToken_1.default, authController_1.getUserProfile);
exports.default = authRouter;
//# sourceMappingURL=authRoute.js.map