"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const message_1 = require("../../../constant/message");
const authInterface_1 = require("../../Auth/interface/authInterface");
exports.updateUserSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(30).required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.FIRST_NAME_REQUIRED,
        'string.min': message_1.VALIDATION_ERROR_MESSAGE.FIRST_NAME_MIN_LENGTH,
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.FIRST_NAME_MAX_LENGTH,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.FIRST_NAME_REQUIRED
    }),
    last_name: joi_1.default.string().min(3).max(30).required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.LAST_NAME_REQUIRED,
        'string.min': message_1.VALIDATION_ERROR_MESSAGE.LAST_NAME_MIN_LENGTH,
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.LAST_NAME_MAX_LENGTH,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.LAST_NAME_REQUIRED
    }),
    profile_image: joi_1.default.string().optional(),
    email: joi_1.default.string().email().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.EMAIL_REQUIRED,
        'string.email': message_1.VALIDATION_ERROR_MESSAGE.EMAIL_INVALID,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.EMAIL_REQUIRED
    }),
    password: joi_1.default.string().min(8).max(30).required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.PASSWORD_REQUIRED,
        'string.min': message_1.VALIDATION_ERROR_MESSAGE.PASSWORD_MIN_LENGTH,
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.PASSWORD_MAX_LENGTH,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.PASSWORD_REQUIRED
    }),
    phone_number: joi_1.default.string().pattern(/^\d+$/).min(10).max(15).required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_REQUIRED,
        'string.pattern.base': message_1.VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_INVALID,
        'string.min': message_1.VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_INVALID,
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_INVALID,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_REQUIRED
    }),
    role: joi_1.default.string().valid(authInterface_1.Role.ADMIN, authInterface_1.Role.END_USER).required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED,
        'string.valid': message_1.VALIDATION_ERROR_MESSAGE.ROLE_INVALID,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED
    }),
    date_of_birth: joi_1.default.date().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED
    }),
    gender: joi_1.default.string().valid('male', 'female', 'other').required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED,
        'any.only': message_1.VALIDATION_ERROR_MESSAGE.GENDER_INVALID,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED
    }),
    isActive: joi_1.default.boolean().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.IS_ACTIVE_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.IS_ACTIVE_REQUIRED
    })
});
//# sourceMappingURL=adminValidation.js.map