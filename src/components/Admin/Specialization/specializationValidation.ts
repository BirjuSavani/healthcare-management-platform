import Joi from 'joi';
import { VALIDATION_ERROR_MESSAGE } from '../../../constant/message';

export const specializationSchema = Joi.object({
  specialization_name: Joi.string().min(3).max(30).trim().required().messages({
    'string.base': VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_REQUIRED,
    'string.min': VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_MIN_LENGTH,
    'string.max': VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_MAX_LENGTH,
    'any.required': VALIDATION_ERROR_MESSAGE.SPECIALIZATION_NAME_REQUIRED,
  }),
  description: Joi.string().max(255).allow('', null).optional().messages({
    'string.max': VALIDATION_ERROR_MESSAGE.DESCRIPTION_MAX_LENGTH,
  }),
});
