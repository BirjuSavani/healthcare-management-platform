"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authService_1 = __importDefault(require("../components/Auth/authService"));
const message_1 = require("../constant/message");
const helper_1 = require("../utils/helper");
const logger_1 = require("../utils/logger");
// interface User {
//   role: string;
// }
function verifyToken(token) {
    try {
        // Check if not set JWT_SECRET in environment
        if (!process.env.JWT_SECRET) {
            throw new Error(message_1.ERROR_MESSAGE.JWT_SECRET_NOT_SET);
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userTokenData = {
            userId: decoded.userId,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp
        };
        return userTokenData;
    }
    catch (error) {
        return error;
    }
}
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const customReq = req as CustomRequest;
            // Extract Authorization header
            const authorization = req.headers.authorization;
            if (!authorization) {
                return helper_1.ResponseHandler.error(res, 401, false, message_1.GLOBAL_MESSAGE.UNAUTHORIZED, message_1.GLOBAL_MESSAGE.UNAUTHORIZED);
            }
            // Verify the token and get the user
            const token = authorization.split(' ')[1];
            if (!token) {
                return helper_1.ResponseHandler.error(res, 401, false, message_1.GLOBAL_MESSAGE.UNAUTHORIZED, message_1.GLOBAL_MESSAGE.UNAUTHORIZED);
            }
            const userTokenData = verifyToken(token);
            if (!userTokenData) {
                return helper_1.ResponseHandler.error(res, 401, false, message_1.GLOBAL_MESSAGE.UNAUTHORIZED, message_1.GLOBAL_MESSAGE.UNAUTHORIZED);
            }
            // Check if user is exists
            const currentUser = yield authService_1.default.findById(userTokenData.userId);
            if (!currentUser) {
                return helper_1.ResponseHandler.error(res, 401, false, message_1.GLOBAL_MESSAGE.UNAUTHORIZED, message_1.GLOBAL_MESSAGE.UNAUTHORIZED);
            }
            // Dynamically attach properties to the request
            req.userId = currentUser.user_id;
            req.role = currentUser.role;
            req.currentUser = currentUser;
            next();
        }
        catch (error) {
            logger_1.logger.error(__filename, req.method, '', message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            return helper_1.ResponseHandler.error(res, 500, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
        }
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map