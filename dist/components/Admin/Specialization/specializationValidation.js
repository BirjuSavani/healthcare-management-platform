"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specializationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const message_1 = require("../../../constant/message");
exports.specializationSchema = joi_1.default.object({
    specialization_name: joi_1.default.string().min(3).max(30).trim().required().messages({
        'string.base': message_1.VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_REQUIRED,
        'string.min': message_1.VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_MIN_LENGTH,
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_MAX_LENGTH,
        'any.required': message_1.VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_REQUIRED
    }),
    description: joi_1.default.string().max(255).allow('', null).optional().messages({
        'string.max': message_1.VALIDATION_ERROR_MESSAGE.DESCRIPTION_MAX_LENGTH
    })
});
//# sourceMappingURL=specializationValidation.js.map