export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ErrorResponse {
    success: false;
    message: string;
    validationErrors?: Record<string, string[]>;
}