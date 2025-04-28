export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export interface ValidationErrorResponse {
  success: false;
  message: string;
  validationErrors: Record<string, string[]>;
}
