import { Expose } from 'class-transformer';
import { UserRole } from '@/entities/user.entity';

export class UserResponseDto {
  @Expose()
  id!: number;

  @Expose()
  email!: string;

  @Expose()
  role!: UserRole;

  @Expose()
  createdAt?: Date;
}
