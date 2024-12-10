import { Response as ExpressResponse } from 'express';
import { ErrorResponse, ResponseData, SuccessResponse } from './interface/responseInterface';

export class ResponseHandler {
  static success<T>(statusCode: number, success: boolean, message: string, data: T): SuccessResponse<T> {
    return {
      statusCode,
      success: true,
      message,
      data,
    };
  }

  static error(statusCode: number, success: boolean, message: string, error?: any): ErrorResponse {
    return {
      statusCode,
      success: false,
      message,
      error,
    };
  }

  static response(
    res: ExpressResponse,
    statusCode: number,
    success: boolean,
    message: string,
    data:any,
    error?: any
  ): ResponseData {
    return {
      res,
      statusCode,
      success,
      message,
      data,
      error,
    };
  }
}
