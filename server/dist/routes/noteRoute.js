"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteControllers_1 = require("../controllers/noteControllers");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const notesRouter = (0, express_1.Router)();
notesRouter.route('/all').get(authenticateToken_1.default, noteControllers_1.getPublicNotes);
notesRouter
    .route('/')
    .get(authenticateToken_1.default, noteControllers_1.getNotes)
    .post(authenticateToken_1.default, noteControllers_1.createNotes);
notesRouter
    .route('/:id')
    .get(authenticateToken_1.default, noteControllers_1.getASingleNote)
    .patch(authenticateToken_1.default, noteControllers_1.updateNotes)
    .delete(authenticateToken_1.default, noteControllers_1.deleteNotes);
notesRouter.route('/image').post(authenticateToken_1.default, noteControllers_1.postImages);
exports.default = notesRouter;
//# sourceMappingURL=noteRoute.js.map