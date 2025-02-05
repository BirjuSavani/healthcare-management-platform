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
const crypto_1 = __importDefault(require("crypto"));
const http_status_1 = __importDefault(require("http-status"));
const message_1 = require("../../constant/message");
const commonUtils_1 = require("../../utils/commonUtils");
const helper_1 = require("../../utils/helper");
const logger_1 = require("../../utils/logger");
const authService_1 = __importDefault(require("./authService"));
class AuthController {
    /**
     * Handles user signup by superadmin.
     * Validates the payload, checks for existing user or phone number, and creates a new user.
     */
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req;
                const payload = req.body;
                // Check if email already exists or phone number already exists
                const [existingUser, existingPhoneNumber] = yield Promise.all([authService_1.default.findByEmail(payload.email), authService_1.default.findByPhoneNumber(payload.phone_number)]);
                if (existingUser) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.CONFLICT, false, message_1.ERROR_MESSAGE.EMAIL_ALREADY_EXISTS, `${message_1.ERROR_MESSAGE.EMAIL_ALREADY_EXISTS} ${payload.email}`);
                }
                if (existingPhoneNumber) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.CONFLICT, false, message_1.ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS, `${message_1.ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS} ${payload.phone_number}`);
                }
                // Hash password and create user
                const hashPassword = yield (0, commonUtils_1.convertPlainTextToHash)(payload.password);
                const authData = yield authService_1.default.signup(payload, hashPassword, userId);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.SIGNUP, { userEmail: payload.email });
                return helper_1.ResponseHandler.success(res, http_status_1.default.CREATED, true, message_1.SUCCESS_MESSAGE.SIGNUP, authData);
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SIGNUP, { error: error.message || error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.ERROR_MESSAGE.SIGNUP, error);
            }
        });
    }
    /**
     * Handles user login.
     * Validates credentials, generates a token, and returns user data.
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                // Fetch user by email
                const authData = yield authService_1.default.findByEmail(payload.email);
                if (!authData) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.UNAUTHORIZED, false, message_1.ERROR_MESSAGE.USER_NOT_FOUND);
                }
                // Verify password
                const isMatch = yield (0, commonUtils_1.comparePassword)(payload.password, authData.password);
                if (!isMatch) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.UNAUTHORIZED, false, message_1.ERROR_MESSAGE.INVALID_CREDENTIALS, message_1.ERROR_MESSAGE.INVALID_CREDENTIALS);
                }
                // Generate JWT token
                const token = (0, commonUtils_1.generateToken)(authData.user_id, authData.role);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.LOGIN, { userId: authData.user_id });
                const authResponse = {
                    token,
                    user: Object.assign(Object.assign({}, authData), { password: undefined }) // Exclude password from response
                };
                void authService_1.default.sendWelcomeEmailWithTemplate(authData);
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.LOGIN, authResponse);
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.LOGIN, { error: error.message || error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.ERROR_MESSAGE.LOGIN, error);
            }
        });
    }
    /**
     * Handles user signup by superadmin.
     * Validates the payload, checks for existing user or phone number, and creates a new user.
     */
    doctorSignup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req;
                const payload = req.body;
                const doctorPayload = req.body;
                // Check if email already exists or phone number already exists
                const [existingUser, existingPhoneNumber] = yield Promise.all([authService_1.default.findByEmail(doctorPayload.email), authService_1.default.findByPhoneNumber(doctorPayload.phone_number)]);
                if (existingUser) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.CONFLICT, false, message_1.ERROR_MESSAGE.EMAIL_ALREADY_EXISTS, `${message_1.ERROR_MESSAGE.EMAIL_ALREADY_EXISTS} ${doctorPayload.email}`);
                }
                if (existingPhoneNumber) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.CONFLICT, false, message_1.ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS, `${message_1.ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS} ${doctorPayload.phone_number}`);
                }
                // Hash password and create user
                const hashPassword = yield (0, commonUtils_1.convertPlainTextToHash)(doctorPayload.password);
                // Create user
                yield authService_1.default.doctorSignup(doctorPayload, hashPassword, userId);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.SIGNUP, { userEmail: payload.email });
                return helper_1.ResponseHandler.success(res, http_status_1.default.CREATED, true, message_1.SUCCESS_MESSAGE.SIGNUP, []);
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SIGNUP, { error: error.message || error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.ERROR_MESSAGE.SIGNUP, error);
            }
        });
    }
    /**
     * Handles user password reset.
     * @param req
     * @param res
     * @returns
     */
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                // check if user exists
                const user = yield authService_1.default.findByEmail(email);
                if (!user) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.USER_NOT_FOUND);
                }
                // Generate a secure resent token
                const resetToken = crypto_1.default.randomBytes(20).toString('hex');
                // const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
                // eslint-disable-next-line no-mixed-operators
                const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
                // Update user with reset token and expiry
                yield authService_1.default.updateUserResetToken(user.user_id, resetToken, resetTokenExpiry);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.FORGET_PASSWORD, { email });
                // Send email with reset token
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.FORGET_PASSWORD, { email, resetToken });
                void authService_1.default.sendResetPasswordEmailWithTemplate(user, resetToken);
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.FORGET_PASSWORD, []);
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FORGET_PASSWORD, { error: error.message || error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.ERROR_MESSAGE.FORGET_PASSWORD, error);
            }
        });
    }
    /**
     * Resets user password.
     * @param req
     * @param res
     * @returns
     */
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.query; // Token from URL param
                const { newPassword } = req.body; // New password from body
                // check if user exists
                if (!token) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.RESET_PASSWORD_TOKEN_EXPIRED);
                }
                const user = yield authService_1.default.findByResetToken(token);
                if (!user) {
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.RESET_PASSWORD_TOKEN_EXPIRED);
                }
                // Hash the provided token to compare with DB
                const hashedToken = crypto_1.default
                    .createHash('sha256')
                    .update(token)
                    .digest('hex');
                // generate password
                const hashPassword = yield (0, commonUtils_1.convertPlainTextToHash)(newPassword);
                // Update user password
                yield authService_1.default.updateUserPassword(user.user_id, hashPassword);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.RESET_PASSWORD, { user: user.user_id, token: hashedToken });
                void authService_1.default.sendPasswordSetEmailWithTemplate(user);
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.RESET_PASSWORD, []);
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.RESET_PASSWORD, { error: error.message || error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.ERROR_MESSAGE.RESET_PASSWORD, error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map