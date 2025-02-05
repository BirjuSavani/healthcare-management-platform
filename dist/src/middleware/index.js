"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const requestTimeout_1 = __importDefault(require("./requestTimeout"));
exports.default = (app) => {
    // Apply requestTimeout middleware
    app.use(requestTimeout_1.default);
    // Logging middleware for incoming requests
    app.use((req, res, next) => {
        logger_1.logger.info(__filename, req.method, '', 'Incoming request', {
            method: req.method,
            url: req.originalUrl,
            query: req.query,
            params: req.params,
            body: sanitizeRequestBody(req.body),
            headers: req.headers
        });
        next();
    });
};
/**
 * Sanitize sensitive data from request body before logging
 * @param body - Request body to be sanitized
 * @returns Sanitized body
 */
function sanitizeRequestBody(body) {
    // Remove sensitive data, such as passwords, from the request body
    if (body) {
        const sanitizedBody = Object.assign({}, body);
        if (sanitizedBody.password)
            sanitizedBody.password = '[REDACTED]';
        // Add any other fields you want to sanitize here
        return sanitizedBody;
    }
    return body;
}
//# sourceMappingURL=index.js.map