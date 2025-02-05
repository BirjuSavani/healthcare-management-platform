export interface IErrorResponse {
  statusCode: number;
  success: boolean;
  message: string;
  error?: any;
  data?: any;
}

export interface ISuccessResponse<T = any> {
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
