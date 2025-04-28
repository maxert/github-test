import { Project } from '@/entities/project.entity';
import { ProjectResponseDto } from '@/dtos/project-response.dto';
import { plainToInstance } from 'class-transformer';

export function toProjectResponse(project: Project): ProjectResponseDto {
  return plainToInstance(ProjectResponseDto, project, { excludeExtraneousValues: true });
}
