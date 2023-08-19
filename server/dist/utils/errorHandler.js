"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class errorHandler extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map