import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ResponseHandler } from '../utils/helper';
import httpStatus from 'http-status';

const validationMiddleware =
  (schema: Joi.Schema) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return ResponseHandler.error(res, httpStatus.BAD_REQUEST, false, error.message, error.details);
    }
    next();
  };

export default validationMiddleware;
