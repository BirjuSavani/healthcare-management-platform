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

