"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoctorSchema = exports.doctorSchema = exports.loginSchema = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const message_1 = require("../../constant/message");
const authInterface_1 = require("./interface/authInterface");
exports.authSchema = joi_1.default.object({
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
    role: joi_1.default.string().valid(authInterface_1.Role.ADMIN, authInterface_1.Role.DOCTOR, authInterface_1.Role.END_USER).optional().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED,
        'string.valid': message_1.VALIDATION_ERROR_MESSAGE.ROLE_INVALID
        // 'any.required': VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED,
    }),
    date_of_birth: joi_1.default.date().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED
    }),
    gender: joi_1.default.string().valid('male', 'female', 'other').required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED,
        'any.only': message_1.VALIDATION_ERROR_MESSAGE.GENDER_INVALID,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED
    })
});
exports.loginSchema = joi_1.default.object({
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
    })
});
exports.doctorSchema = joi_1.default.object({
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
    role: joi_1.default.string().valid(authInterface_1.Role.DOCTOR).optional().messages({
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
    medical_license_number: joi_1.default.string().min(10).max(15).required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_REQUIRED,
        'string.min': message_1.VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_INVALID,
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_INVALID,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_REQUIRED
    }),
    specialization_id: joi_1.default.string().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.SPECIALIZATION_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.SPECIALIZATION_REQUIRED
    }),
    qualification: joi_1.default.string().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.QUALIFICATION_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.QUALIFICATION_REQUIRED
    }),
    year_of_experience: joi_1.default.number().required().messages({
        'number.base': message_1.VALIDATION_ERROR_MESSAGE.YEAR_OF_EXPERIENCE_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.YEAR_OF_EXPERIENCE_REQUIRED
    }),
    consultation_fee: joi_1.default.number().required().messages({
        'number.base': message_1.VALIDATION_ERROR_MESSAGE.CONSULTATION_FEE_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.CONSULTATION_FEE_REQUIRED
    }),
    average_rating: joi_1.default.number().optional().messages({
        'number.base': message_1.VALIDATION_ERROR_MESSAGE.AVERAGE_RATING_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.AVERAGE_RATING_REQUIRED
    }),
    total_reviews: joi_1.default.number().optional().messages({
        'number.base': message_1.VALIDATION_ERROR_MESSAGE.TOTAL_REVIEWS_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.TOTAL_REVIEWS_REQUIRED
    }),
    clinic_address: joi_1.default.string().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.CLINIC_ADDRESS_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.CLINIC_ADDRESS_REQUIRED
    }),
    city: joi_1.default.string().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.CITY_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.CITY_REQUIRED
    }),
    state: joi_1.default.string().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.STATE_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.STATE_REQUIRED
    }),
    country: joi_1.default.string().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.COUNTRY_REQUIRED,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.COUNTRY_REQUIRED
    })
});
exports.updateDoctorSchema = exports.doctorSchema.fork(['password'], (schema) => {
    return schema.optional();
});
//# sourceMappingURL=authValidation.js.map