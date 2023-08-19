"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const error_1 = require("./middleware/error");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const whitelist = process.env.WHITELIST.split(',');
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        // `!origin` allows server-to-server requests (ie, localhost requests)
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS: ' + origin));
        }
    },
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
app.disable('x-powered-by');
app.use((0, helmet_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: false }));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Server is running !',
    });
});
app.use('/api/v1/auth', authRoute_1.default);
app.use('/api/v1/notes', noteRoute_1.default);
app.use((req, res, next) => {
    res.status(404).send('No route found!');
});
app.use(error_1.handleErrors);
exports.default = app;
//# sourceMappingURL=app.js.map