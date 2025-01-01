import { NextFunction, Request, RequestHandler, Response } from 'express';

export function asyncHandler<T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // Pass any errors to Express's error handler
  };
}
