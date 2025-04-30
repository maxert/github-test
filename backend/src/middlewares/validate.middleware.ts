import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationException } from '@/exceptions/ValidationException';

export function validateDto<T extends object>(dtoClass: new () => T) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      throw new ValidationException(errors);
    }

    next();
  };
}
