import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '@/types/api-response';
import { ResponseBuilder } from '@/utils/response.builder';

export abstract class BaseController {
  protected success<T>(res: Response<ApiResponse<T>>, data: T, message?: string, status = 200) {
    return res.status(status).json(ResponseBuilder.success(data, message));
  }

  protected noContent(res: Response<ApiResponse<null>>) {
    return res.status(200).json(ResponseBuilder.success(null));
  }

  protected wrap<T = unknown>(
    _fn: (_req: Request, _res: Response<ApiResponse<T>>, _next: NextFunction) => Promise<void | Response<ApiResponse<T>>>
  ) {
    return (_req: Request, _res: Response<ApiResponse<T>>, _next: NextFunction) => {
      void _fn(_req, _res, _next).catch(_next);
    };
  }
}
