import { ApiResponse, ErrorResponse } from '@/types/api-response';

export class ResponseBuilder {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      ...(message ? { message } : {}),
    };
  }

  static error(message: string): ErrorResponse {
    return {
      success: false,
      message,
    };
  }
}
