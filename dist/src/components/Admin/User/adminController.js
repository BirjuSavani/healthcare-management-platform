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
const adminService_1 = __importDefault(require("./adminService"));
class AdminController {
    /**
     * Get all users
     * @param req
     * @param res
     * @returns UserListResponse
     */
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users
                const users = yield adminService_1.default.getAllUsers(req);
                if (!users) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.NO_USERS_FOUND, '');
                    return helper_1.ResponseHandler.error(res, http_status_1.default.OK, false, message_1.ERROR_MESSAGE.NO_USERS_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.GET_ALL_USERS, '');
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_ALL_USERS, users);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_ALL_USERS, error);
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Get By Id user
     * @param req
     * @param res
     * @returns UserResponse
     */
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                // Fetch the user by ID
                const user = yield adminService_1.default.getUserById(userId);
                if (!user) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { userId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.USER_NOT_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.GET_USER_BY_ID, { userId });
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_USER_BY_ID, user);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_USER_BY_ID, { userId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Update user
     * @param req
     * @param res
     * @returns UpdateUserResponse
     */
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const updateUserId = req.params.id;
            try {
                const payload = req.body;
                // Fetch the user by ID
                const user = yield adminService_1.default.getUserById(updateUserId);
                if (!user) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { updateUserId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, message_1.ERROR_MESSAGE.USER_NOT_FOUND, message_1.ERROR_MESSAGE.USER_NOT_FOUND);
                }
                // Update the user
                const updatedUser = yield adminService_1.default.updateUser(updateUserId, payload, userId);
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.UPDATE_USER, { updateUserId });
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.UPDATE_USER, updatedUser);
            }
            catch (error) {
                // Log the error with request details
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.UPDATE_USER, { updateUserId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Delete user by ID
     * @param req
     * @param res
     * @returns
     */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                // Delete the user by ID
                const deletedUser = yield adminService_1.default.deleteUser(userId);
                if (!deletedUser) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { userId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.USER_NOT_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.DELETE_USER, { userId });
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.DELETE_USER, null);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.DELETE_USER, { userId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
}
exports.default = new AdminController();
//# sourceMappingURL=adminController.js.map