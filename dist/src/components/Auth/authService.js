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
const sequelize_1 = require("sequelize");
const message_1 = require("../../constant/message");
const models_1 = require("../../database/models");
const mail_1 = __importDefault(require("../../notification/mail"));
const logger_1 = require("../../utils/logger");
const authInterface_1 = require("./interface/authInterface");
class AuthService {
    /**
     * General method to find a user by a given condition.
     * @param condition - The query condition.
     * @returns The user data or null if not found.
     */
    findUser(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserMaster.findOne(condition);
                // Use `.get()` to extract the raw object, and cast it to `IUserData`.
                return user ? user.get({ plain: true }) : null;
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FIND_USER_FAILURE, { condition, error });
                throw new Error(`${message_1.ERROR_MESSAGE.FIND_USER_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Find a user by email.
     * @param email - The user's email address.
     * @returns The user data or null if not found.
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.findUser({ where: { email } });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Find a user by phone number.
     * @param phone_number - The user's phone number.
     * @returns The user data or null if not found.
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    findByPhoneNumber(phone_number) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.findUser({ where: { phone_number } });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FIND_BY_PHONE_NUMBER_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.FIND_BY_PHONE_NUMBER_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Find a user by ID.
     * @param id - The user's ID.
     * @returns The user data or null if not found.
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.findUser({ where: { user_id: id } });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FIND_USER_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.FIND_USER_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Create a new user.
     * @param payload - The user data payload.
     * @param hashPassword - The hashed password.
     * @param userId - Current user ID performing the action.
     * @returns The created user data.
     */
    signup(payload, hashPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if the user is an end user
                const isEndUser = !userId;
                // Create the user
                const user = yield models_1.UserMaster.create(Object.assign(Object.assign({}, payload), { password: hashPassword, role: isEndUser ? authInterface_1.Role.END_USER : payload.role, isActive: true, isDeleted: false, created_by: userId !== null && userId !== void 0 ? userId : null, last_modified_by: userId !== null && userId !== void 0 ? userId : null }));
                // Get the user data
                const userData = user.get({ plain: true });
                // Update the `created_by` and `last_modified_by` fields
                if (isEndUser && !userData.created_by && !userData.last_modified_by) {
                    return yield this.updateCreateBy(userData.user_id);
                }
                return userData;
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SIGNUP_FAILURE, { payload, error });
                throw new Error(`${message_1.ERROR_MESSAGE.SIGNUP_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Update the `created_by` and `last_modified_by` fields for a user.
     * @param userId - The user ID to update.
     * @returns The updated user data.
     */
    updateCreateBy(userId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the `created_by` and `last_modified_by` fields
                const user = yield models_1.UserMaster.update({ created_by: userId, last_modified_by: userId }, {
                    where: {
                        user_id: userId
                    },
                    returning: true,
                    transaction
                });
                return user[1][0].get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE, { userId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Update the `created_by` and `last_modified_by` fields for a user.
     * @param userId - The user ID to update.
     * @returns The updated user data.
     */
    updateCreateByUserMetaDta(userId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the `created_by` and `last_modified_by` fields
                const user = yield models_1.UserMetaData.update({ created_by: userId, last_modified_by: userId }, {
                    where: {
                        user_id: userId
                    },
                    returning: true,
                    transaction
                });
                return user[1][0].get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE, { userId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Create a new doctor and their metadata.
     * @param doctorPayload - Doctor's data payload.
     * @param hashPassword - The hashed password.
     * @param userId - Current user ID performing the action.
     */
    doctorSignup(doctorPayload, hashPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const transaction = yield ((_a = models_1.UserMaster.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
            if (!transaction)
                throw new Error('Transaction initialization failed.');
            try {
                // Create UserMaster record
                const user = yield models_1.UserMaster.create({
                    first_name: doctorPayload.first_name,
                    last_name: doctorPayload.last_name,
                    profile_image: doctorPayload.profile_image,
                    email: doctorPayload.email,
                    phone_number: doctorPayload.phone_number,
                    date_of_birth: doctorPayload.date_of_birth,
                    gender: doctorPayload.gender,
                    password: hashPassword,
                    role: authInterface_1.Role.DOCTOR,
                    isActive: true,
                    isDeleted: false,
                    created_by: userId !== null && userId !== void 0 ? userId : null,
                    last_modified_by: userId !== null && userId !== void 0 ? userId : null
                }, { transaction });
                const userData = user.get({ plain: true });
                // Update created_by and last_modified_by if they are null
                if (!userData.created_by && !userData.last_modified_by) {
                    yield this.updateCreateBy(userData.user_id, transaction);
                }
                // Create UserMetaData record
                const doctor = yield models_1.UserMetaData.create({
                    medical_license_number: doctorPayload.medical_license_number,
                    specialization_id: doctorPayload.specialization_id,
                    qualification: doctorPayload.qualification,
                    year_of_experience: doctorPayload.year_of_experience,
                    consultation_fee: doctorPayload.consultation_fee,
                    average_rating: doctorPayload.average_rating,
                    total_reviews: doctorPayload.total_reviews,
                    clinic_address: doctorPayload.clinic_address,
                    city: doctorPayload.city,
                    state: doctorPayload.state,
                    country: doctorPayload.country,
                    user_id: userData.user_id,
                    created_by: userId !== null && userId !== void 0 ? userId : null,
                    last_modified_by: userId !== null && userId !== void 0 ? userId : null
                }, { transaction });
                // Update created_by and last_modified_by if they are null
                if (!userData.created_by && !userData.last_modified_by) {
                    yield this.updateCreateByUserMetaDta(userData.user_id, transaction);
                }
                // Commit transaction
                yield transaction.commit();
                return doctor.get({ plain: true });
            }
            catch (error) {
                if (transaction)
                    yield transaction.rollback();
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.DOCTOR_SIGNUP_FAILURE, { error });
                throw new Error(`${message_1.ERROR_MESSAGE.DOCTOR_SIGNUP_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Update the reset token for a user.
     * @param userId
     * @param resetToken
     * @param resetTokenExpiry
     */
    updateUserResetToken(userId, resetToken, resetTokenExpiry) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.UserMaster.update({ reset_password_token: resetToken, reset_password_expires: resetTokenExpiry }, { where: { user_id: userId } });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FORGET_PASSWORD, { userId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.FORGET_PASSWORD}: ${error}`);
            }
        });
    }
    /**
     * Find a user by token.
     * @param token - The user's token.
     * @returns The user data or null if not found.
     */
    findByResetToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.findUser({
                    where: { reset_password_token: token, reset_password_expires: { [sequelize_1.Op.gt]: new Date() } }
                });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Update the password for a user.
     * @param userId - The user's ID.
     * @param password - The new password.
     */
    updateUserPassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.UserMaster.update({ password: password, reset_password_token: null, reset_password_expires: null }, { where: { user_id: userId } });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_PASSWORD_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_PASSWORD_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Send a welcome email to a new user.
     * @param authData
     */
    sendWelcomeEmailWithTemplate(authData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mail_1.default.sendEmailWithTemplate({
                    logo: `${process.env.BACKEND_URL}/public/images/doctor-logo-49379.png`,
                    firstName: authData.first_name,
                    lastName: authData.last_name,
                    email: authData.email,
                    subject: message_1.SUCCESS_MESSAGE.SEND_WELCOME_EMAIL_SUCCESS
                }, 'welcome-email.ejs');
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SEND_WELCOME_EMAIL_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.SEND_WELCOME_EMAIL_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Send a reset password email to a user.
     * @param authData
     * @param resetToken
     */
    sendResetPasswordEmailWithTemplate(authData, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mail_1.default.sendEmailWithTemplate({
                    logo: `${process.env.BACKEND_URL}/public/images/doctor-logo-49379.png`,
                    firstName: authData.first_name,
                    lastName: authData.last_name,
                    email: authData.email,
                    redirectUrl: `${process.env.BACKEND_URL}/api/auth/reset-password?token=${resetToken}`,
                    subject: message_1.SUCCESS_MESSAGE.SEND_RESET_PASSWORD_EMAIL_SUCCESS
                }, 'reset-password-email.ejs');
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SEND_RESET_PASSWORD_EMAIL_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.SEND_RESET_PASSWORD_EMAIL_FAILURE}: ${error}`);
            }
        });
    }
    /**
     * Send a password set email to a user.
     * @param authData
     */
    sendPasswordSetEmailWithTemplate(authData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mail_1.default.sendEmailWithTemplate({
                    logo: `${process.env.BACKEND_URL}/public/images/doctor-logo-49379.png`,
                    firstName: authData.first_name,
                    lastName: authData.last_name,
                    email: authData.email,
                    redirectUrl: `${process.env.BACKEND_URL}/api/auth/login`,
                    subject: message_1.SUCCESS_MESSAGE.SEND_PASSWORD_SET_EMAIL_SUCCESS
                }, 'password-set-email.ejs');
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SEND_PASSWORD_SET_EMAIL_FAILURE, '');
                throw new Error(`${message_1.ERROR_MESSAGE.SEND_PASSWORD_SET_EMAIL_FAILURE}: ${error}`);
            }
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=authService.js.map