import { Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { ValidationException } from '@/exceptions/ValidationException';

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response
) {
  const status = error instanceof HttpException ? error.status : 500;
  const message = error.message || 'Internal server error';

  const response: any = {
    success: false,
    message,
  };

  if (error instanceof ValidationException) {
    response.validationErrors = error.validationErrors;
  }

  console.error(`[ERROR] ${status} - ${message}`);
  res.status(status).json(response);
}
