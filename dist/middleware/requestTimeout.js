"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const message_1 = require("../constant/message");
const helper_1 = require("../utils/helper");
const timers_1 = require("timers");
// Middleware to handle request timeout
const requestTimeout = (req, res, next) => {
    // Set a timeout to 1 minute
    const timeout = 60 * 1000;
    const timer = (0, timers_1.setTimeout)(() => {
        return helper_1.ResponseHandler.error(res, http_status_1.default.REQUEST_TIMEOUT, false, message_1.GLOBAL_MESSAGE.REQUEST_TIMEOUT, message_1.GLOBAL_MESSAGE.REQUEST_TIMEOUT);
    }, timeout);
    // Clear the timeout if the request is successful
    res.on('finish', () => {
        (0, timers_1.clearTimeout)(timer);
    });
    next();
};
exports.default = requestTimeout;
//# sourceMappingURL=requestTimeout.js.map