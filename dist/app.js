"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const path_1 = __importDefault(require("path"));
const message_1 = require("./constant/message");
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./routes"));
const helper_1 = require("./utils/helper");
const logger_1 = require("./utils/logger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, './notification/templates'));
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware
(0, middleware_1.default)(app);
// Routes
(0, routes_1.default)(app);
// Base route to health check
app.get('/health', (req, res) => {
    return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, 'health', 'Healthy');
});
// Handle invalid routes
app.all('/*', (req, res) => {
    logger_1.logger.error(__filename, 'Invalid Route Handler', '', 'Invalid Route Fired : ' + req.path, {});
    return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, message_1.GLOBAL_MESSAGE.BAD_REQUEST, message_1.GLOBAL_MESSAGE.BAD_REQUEST);
});
exports.default = app;
//# sourceMappingURL=app.js.map