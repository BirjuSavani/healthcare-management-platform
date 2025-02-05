"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utils/helper");
const http_status_1 = __importDefault(require("http-status"));
const validationMiddleware = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, error.message, error.details);
    }
    next();
};
exports.default = validationMiddleware;
//# sourceMappingURL=joiMiddleware.js.map