import { HttpException } from './HttpException';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  public validationErrors: Record<string, string[]>;

  constructor(errors: ValidationError[]) {
    super(400, 'Validation failed');

    this.validationErrors = {};

    for (const error of errors) {
      if (error.constraints) {
        this.validationErrors[error.property] = Object.values(error.constraints);
      }
    }
  }
}
