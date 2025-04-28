import { Expose } from 'class-transformer';

export class ProjectResponseDto {
  @Expose()
  id!: number;

  @Expose()
  owner!: string;

  @Expose()
  name!: string;

  @Expose()
  url!: string;

  @Expose()
  stars!: number;

  @Expose()
  forks!: number;

  @Expose()
  issues!: number;

  @Expose()
  createdAtGithub!: number;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
