import { Response as ExpressResponse } from 'express';

export interface ErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  error?: any;
}

export interface SuccessResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ResponseData {
  res: ExpressResponse;
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  error?: any;
}
