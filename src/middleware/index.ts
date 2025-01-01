import { Application, NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import requestTimeout from './requestTimeout';

export default (app: Application) => {
  // Apply requestTimeout middleware
  app.use(requestTimeout);

  // Logging middleware for incoming requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(__filename, req.method, '', 'Incoming request', {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      body: sanitizeRequestBody(req.body),
      headers: req.headers,
    });
    next();
  });
};

/**
 * Sanitize sensitive data from request body before logging
 * @param body - Request body to be sanitized
 * @returns Sanitized body
 */
function sanitizeRequestBody(body: any) {
  // Remove sensitive data, such as passwords, from the request body
  if (body) {
    const sanitizedBody = { ...body };
    if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
    // Add any other fields you want to sanitize here
    return sanitizedBody;
  }
  return body;
}
