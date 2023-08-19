"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const handleErrors = (err, req, res, next) => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    err.status = err.status || 500;
    err.message = err.message || 'Enteral server error';
    if (nodeEnv === 'development') {
        return res.status(err.status).json({
            success: false,
            errors: err,
            message: err.message,
            error_stack: err.stack,
        });
    }
    //! wrong mongoose object id error
    if (err.name === 'CastError') {
        err.message = `Resource not found: ${err.path}`;
    }
    //! moongoose validation error handler
    if (err.name === 'ValidationError') {
        const message = [];
        Object.values(err.errors).map((msg) => {
            message.push(msg.message);
        });
        err.message = message.join(', ');
    }
    //! Mongoose Duplicate key errs
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)}`;
        err.message = message;
    }
    //! wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token is Invalid. Try again';
        err.message = message;
    }
    //! jwt expiration error
    if (err.name === 'TokenExpiredError') {
        const message = 'Sorry! The token has expired. Try again';
        err.message = message;
    }
    res.status(err.status).json({
        success: false,
        message: err.message,
    });
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=error.js.map