"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendToken = (user, res, statusCode) => {
    const token = user.getJwtToken();
    const sevenDay = 7 * 1000 * 60 * 60 * 24;
    let cookieOptions = {
        httpOnly: true,
        maxAge: sevenDay,
        sameSite: 'strict',
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions = {
            httpOnly: true,
            maxAge: sevenDay,
            sameSite: 'none',
            secure: true,
        };
    }
    res.cookie('token', token, cookieOptions);
    return res.status(statusCode).json({
        success: true,
        token,
        user,
    });
};
exports.default = sendToken;
//# sourceMappingURL=sendToken.js.map