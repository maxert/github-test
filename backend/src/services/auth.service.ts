import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppDataSource } from '@/config/database';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { LoginUserDto } from '@/dtos/login-user.dto';
import { UserResponseDto } from '@/dtos/user-response.dto';
import { HttpException } from '@/exceptions/HttpException';
import { BaseService } from '@/core/base.service';

export class AuthService extends BaseService {
  private userRepository = AppDataSource.getRepository(User);

  async register(dto: CreateUserDto): Promise<{ token: string; user: UserResponseDto }> {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });

    if (existing) {
      throw new HttpException(409, 'User with this email already exists');
    }

    const hashedPassword = await hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashedPassword });
    await this.userRepository.save(user);

    const token = this.generateToken(user);
    return {
      token,
      user: this.toDto(UserResponseDto, user),
    };
  }

  async login(dto: LoginUserDto): Promise<{ token: string; user: UserResponseDto }> {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });

    if (!user) {
      throw new HttpException(401, 'Invalid credentials');
    }

    const isPasswordValid = await compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(401, 'Invalid credentials');
    }

    const token = this.generateToken(user);
    return {
      token,
      user: this.toDto(UserResponseDto, user),
    };
  }

  private generateToken(user: User): string {
    const payload = { id: user.id, email: user.email, role: user.role };
    const secret = process.env.JWT_SECRET!;
    return sign(payload, secret, { expiresIn: '7d' });
  }
}
