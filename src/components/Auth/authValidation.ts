import Joi from 'joi';
import { VALIDATION_ERROR_MESSAGE } from '../../constant/message';
import { IRole } from './interface/authInterface';

export const authSchema = Joi.object({
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
  role: Joi.string().valid(IRole.ADMIN, IRole.DOCTOR, IRole.END_USER).optional().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED,
    'string.valid': VALIDATION_ERROR_MESSAGE.ROLE_INVALID
    // 'any.required': VALIDATION_ERROR_MESSAGE.ROLE_REQUIRED,
  }),
  date_of_birth: Joi.date().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.DATE_OF_BIRTH_REQUIRED
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED,
    'any.only': VALIDATION_ERROR_MESSAGE.GENDER_INVALID,
    'any.required': VALIDATION_ERROR_MESSAGE.GENDER_REQUIRED
  })
});

export const loginSchema = Joi.object({
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
  })
});

export const doctorSchema = Joi.object({
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
  role: Joi.string().valid(IRole.DOCTOR).optional().messages({
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
  medical_license_number: Joi.string().min(10).max(15).required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_REQUIRED,
    'string.min': VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_INVALID,
    'string.max': VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_INVALID,
    'any.required': VALIDATION_ERROR_MESSAGE.MEDICAL_LICENSE_NUMBER_REQUIRED
  }),
  specialization_id: Joi.string().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.SPECIALIZATION_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.SPECIALIZATION_REQUIRED
  }),
  qualification: Joi.string().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.QUALIFICATION_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.QUALIFICATION_REQUIRED
  }),
  year_of_experience: Joi.number().required().messages({
    'number.base': VALIDATION_ERROR_MESSAGE.YEAR_OF_EXPERIENCE_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.YEAR_OF_EXPERIENCE_REQUIRED
  }),
  consultation_fee: Joi.number().required().messages({
    'number.base': VALIDATION_ERROR_MESSAGE.CONSULTATION_FEE_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.CONSULTATION_FEE_REQUIRED
  }),
  average_rating: Joi.number().optional().messages({
    'number.base': VALIDATION_ERROR_MESSAGE.AVERAGE_RATING_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.AVERAGE_RATING_REQUIRED
  }),
  total_reviews: Joi.number().optional().messages({
    'number.base': VALIDATION_ERROR_MESSAGE.TOTAL_REVIEWS_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.TOTAL_REVIEWS_REQUIRED
  }),
  clinic_address: Joi.string().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.CLINIC_ADDRESS_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.CLINIC_ADDRESS_REQUIRED
  }),
  city: Joi.string().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.CITY_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.CITY_REQUIRED
  }),
  state: Joi.string().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.STATE_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.STATE_REQUIRED
  }),
  country: Joi.string().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.COUNTRY_REQUIRED,
    'any.required': VALIDATION_ERROR_MESSAGE.COUNTRY_REQUIRED
  })
});

export const updateDoctorSchema = doctorSchema.fork(['password'], (schema) => {
  return schema.optional();
});
