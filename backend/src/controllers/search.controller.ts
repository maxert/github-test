import { Request, Response } from 'express';
import { githubApi } from '@/utils/githubApi';
import { BaseController } from '@/core/base.controller';
import { ApiResponse } from '@/types/api-response';
import { HttpException } from '@/exceptions/HttpException';

export class SearchController extends BaseController {
  searchRepositories = this.wrap(async (req: Request, res: Response<ApiResponse<any[]>>) => {
    const query = req.query.q as string;

    if (!query) {
      throw new HttpException(400, 'Query parameter "q" is required');
    }

    try {
      const repos = await githubApi.searchRepositories(query);
      this.success(res, repos, 'Repositories fetched successfully');
    } catch (error: any) {
      if (error.response?.status === 403) {
        throw new HttpException(429, 'GitHub rate limit exceeded. Please try manual input.');
      }
      throw new HttpException(500, 'Failed to fetch repositories from GitHub.');
    }
  });

}
