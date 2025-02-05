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
const http_status_1 = __importDefault(require("http-status"));
const message_1 = require("../../../constant/message");
const helper_1 = require("../../../utils/helper");
const logger_1 = require("../../../utils/logger");
const authService_1 = __importDefault(require("../../Auth/authService"));
const userService_1 = __importDefault(require("./userService"));
class UserController {
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req;
                const user = yield authService_1.default.findById(userId);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.GET_USER_PROFILE, '');
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_USER_PROFILE, user);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_USER_PROFILE, error);
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Update user profile
     * @param req Request object
     * @param res Response object
     */
    updateUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            try {
                const payload = req.body;
                // Fetch the user by ID
                const existingUser = yield authService_1.default.findById(userId);
                if (!existingUser) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { userId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.USER_NOT_FOUND, null);
                }
                // Update the user
                const updatedUser = yield userService_1.default.updateUserProfile(userId, payload);
                if (!updatedUser) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.UPDATE_USER_PROFILE, { userId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.UPDATE_USER_PROFILE, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.UPDATE_USER_PROFILE, { userId });
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.UPDATE_USER_PROFILE, updatedUser);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.UPDATE_USER_PROFILE, { userId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map