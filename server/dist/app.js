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
// import helmet from 'helmet';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const whitelist = process.env.WHITELIST;
app.use((0, cors_1.default)({
    origin: '*',
}));
// app.disable('x-powered-by');
// app.use(helmet());
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