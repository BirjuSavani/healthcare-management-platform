import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { GLOBAL_MESSAGE } from '../constant/message';
import { ResponseHandler } from '../utils/helper';
import { setTimeout, clearTimeout } from 'timers';

// Middleware to handle request timeout
const requestTimeout = (req: Request, res: Response, next: NextFunction): any => {
  // Set a timeout to 1 minute
  const timeout: number = 60 * 1000;

  const timer = setTimeout(() => {
    return ResponseHandler.error(res, httpStatus.REQUEST_TIMEOUT, false, GLOBAL_MESSAGE.REQUEST_TIMEOUT, GLOBAL_MESSAGE.REQUEST_TIMEOUT);
  }, timeout);

  // Clear the timeout if the request is successful
  res.on('finish', () => {
    clearTimeout(timer);
  });

  next();
};

export default requestTimeout;
