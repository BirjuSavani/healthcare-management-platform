"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
class ResponseHandler {
    static success(res, statusCode, success, message, data) {
        const response = {
            statusCode,
            success,
            message,
            data
        };
        res.status(statusCode).json(response);
        return response;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static error(res, statusCode, success, message, error) {
        const response = {
            statusCode,
            success: false,
            message,
            error
        };
        res.status(statusCode).json(response);
        return response;
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=response.js.map