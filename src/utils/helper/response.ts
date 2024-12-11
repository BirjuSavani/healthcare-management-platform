import { Response as ExpressResponse } from 'express';
import { ErrorResponse, SuccessResponse } from './interface/responseInterface';

export class ResponseHandler {
  static success<T>(
    res: ExpressResponse,
    statusCode: number,
    success: boolean,
    message: string,
    data: T
  ): SuccessResponse<T> {
    const response = {
      statusCode,
      success,
      message,
      data,
    };
    res.status(statusCode).json(response);
    return response;
  }

  static error(
    res: ExpressResponse,
    statusCode: number,
    success: boolean,
    message: string,
    error?: any
  ): ErrorResponse {
    const response = {
      statusCode,
      success: false,
      message,
      error,
    };
    res.status(statusCode).json(response);
    return response;
  }
}
