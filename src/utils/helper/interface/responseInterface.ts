export interface ErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  error?: any;
  data?: any;
}

export interface SuccessResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  error?: any;
}

export interface IApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}
