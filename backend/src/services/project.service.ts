import { BaseService } from '@/core/base.service';
import { ProjectResponseDto } from '@/dtos/project-response.dto';
import { AppDataSource } from '@/config/database';
import { Project } from '@/entities/project.entity';
import { CreateProjectDto } from '@/dtos/create-project.dto';
import { githubApi } from '@/utils/githubApi';
import { HttpException } from '@/exceptions/HttpException';

export class ProjectService extends BaseService {
  private projectRepository = AppDataSource.getRepository(Project);

  async createProject(dto: CreateProjectDto, userId: number) {
    const [owner, repo] = dto.path.split('/');
    const githubData = await githubApi.getRepoData(owner, repo);

    const exists = await this.projectRepository.findOne({
      where: {
        owner: githubData.owner.login,
        name: githubData.name,
        user: { id: userId },
      },
    });

    if (exists) {
      throw new HttpException(409, 'You have already added this repository.');
    }

    const project = this.projectRepository.create({
      owner: githubData.owner.login,
      name: githubData.name,
      url: githubData.html_url,
      stars: githubData.stargazers_count,
      forks: githubData.forks_count,
      issues: githubData.open_issues_count,
      createdAtGithub: new Date(githubData.created_at).getTime(),
      user: { id: userId },
    });

    const saved = await this.projectRepository.save(project);
    return this.toDto(ProjectResponseDto, saved);
  }

  async getAllProjects(userId: number) {
    const projects = await this.projectRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
    return this.toDtos(ProjectResponseDto, projects);
  }

  async updateProject(projectId: number, userId: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, user: { id: userId } },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const githubData = await githubApi.getRepoData(project.owner, project.name);

    project.stars = githubData.stargazers_count;
    project.forks = githubData.forks_count;
    project.issues = githubData.open_issues_count;

    const updated = await this.projectRepository.save(project);
    return this.toDto(ProjectResponseDto, updated);
  }

  async deleteProject(projectId: number, userId: number) {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, user: { id: userId } },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    await this.projectRepository.remove(project);
  }
}
