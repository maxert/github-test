import { User } from '@/entities/user.entity';
import { UserResponseDto } from '@/dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';

export function toUserResponse(user: User): UserResponseDto {
  return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
}
