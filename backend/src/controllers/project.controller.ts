import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '@/services/project.service';
import { CreateProjectDto } from '@/dtos/create-project.dto';
import { ApiResponse } from '@/types/api-response';
import { ProjectResponseDto } from '@/dtos/project-response.dto';
import { BaseController } from '@/core/base.controller';
import { ResponseBuilder } from '@/utils/response.builder';

export class ProjectController extends BaseController {
  private projectService = new ProjectService();

  create = this.wrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateProjectDto = req.body;
      const userId = req.user.id;
      const project = await this.projectService.createProject(dto, userId);
      res.status(201).json(ResponseBuilder.success(project));
    } catch (error) {
      next(error); // ⬅️ Передаємо помилку в глобальний обробник!
    }
  });

  getAll = this.wrap(async (req: Request, res: Response<ApiResponse<ProjectResponseDto[]>>) => {
    const userId = req.user.id;
    const projects = await this.projectService.getAllProjects(userId);

    this.success(res, projects, 'Projects fetched successfully');
  });

  update = this.wrap(async (req: Request, res: Response<ApiResponse<ProjectResponseDto>>) => {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;
    const updatedProject = await this.projectService.updateProject(projectId, userId);
    this.success(res, updatedProject, 'Project updated successfully');
  });

  delete = this.wrap(async (req: Request, res: Response<ApiResponse<null>>) => {
    const projectId = parseInt(req.params.id);
    const userId = req.user.id;
    await this.projectService.deleteProject(projectId, userId);

    this.noContent(res);
  });
}
