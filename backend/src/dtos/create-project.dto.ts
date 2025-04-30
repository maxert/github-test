import { Matches } from 'class-validator';

export class CreateProjectDto {
  @Matches(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/, { message: 'Невірний формат: має бути owner/repo' })
  path!: string;

}
