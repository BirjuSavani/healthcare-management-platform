import Joi from 'joi';
import { VALIDATION_ERROR_MESSAGE } from '../../../constant/message';
import { IRole } from '../../Auth/interface/authInterface';

export const updateUserSchema = Joi.object({
  first_name: Joi.string().min(3).max(30).required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.FIRST_NAME_REQUIRED,
    'string.min': VALIDATION_ERROR_MESSAGE.FIRST_NAME_MIN_LENGTH,
    'string.max': VALIDATION_ERROR_MESSAGE.FIRST_NAME_MAX_LENGTH,
    'any.required': VALIDATION_ERROR_MESSAGE.FIRST_NAME_REQUIRED
  }),
  last_name: Joi.string().min(3).max(30).required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.LAST_NAME_REQUIRED,
    'string.min': VALIDATION_ERROR_MESSAGE.LAST_NAME_MIN_LENGTH,
    'string.max': VALIDATION_ERROR_MESSAGE.LAST_NAME_MAX_LENGTH,
    'any.required': VALIDATION_ERROR_MESSAGE.LAST_NAME_REQUIRED
  }),
  profile_image: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.EMAIL_REQUIRED,
    'string.email': VALIDATION_ERROR_MESSAGE.EMAIL_INVALID,
    'any.required': VALIDATION_ERROR_MESSAGE.EMAIL_REQUIRED
  }),
  password: Joi.string().min(8).max(30).required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.PASSWORD_REQUIRED,
    'string.min': VALIDATION_ERROR_MESSAGE.PASSWORD_MIN_LENGTH,
    'string.max': VALIDATION_ERROR_MESSAGE.PASSWORD_MAX_LENGTH,
    'any.required': VALIDATION_ERROR_MESSAGE.PASSWORD_REQUIRED
  }),
  phone_number: Joi.string().pattern(/^\d+$/).min(10).max(15).required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_REQUIRED,
    'string.pattern.base': VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_INVALID,
    'string.min': VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_INVALID,
    'string.max': VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_INVALID,
    'any.required': VALIDATION_ERROR_MESSAGE.PHONE_NUMBER_REQUIRED
  }),
  role: Joi.string().valid(IRole.ADMIN, IRole.END_USER).required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED,
    'string.valid': VALIDATION_ERROR_MESSAGE.ROLE_INVALID,
    'any.required': VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED
  }),
  date_of_birth: Joi.date().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED,
    'any.only': VALIDATION_ERROR_MESSAGE.GENDER_INVALID,
    'any.required': VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED
  }),
  isActive: Joi.boolean().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.IS_ACTIVE_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.IS_ACTIVE_REQUIRED
  })
});
