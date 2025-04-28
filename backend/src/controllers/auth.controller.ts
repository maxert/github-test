import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { LoginUserDto } from '@/dtos/login-user.dto';
import { ApiResponse } from '@/types/api-response';
import { UserResponseDto } from '@/dtos/user-response.dto';
import { BaseController } from '@/core/base.controller';

export class AuthController extends BaseController {
  private authService = new AuthService();

  register = this.wrap(async (req: Request, res: Response<ApiResponse<UserResponseDto>>) => {
    const dto: CreateUserDto = req.body;
    const { token, user } = await this.authService.register(dto); // ← повертаємо і токен, і юзера

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів
    });

    this.success(res, user, 'User registered successfully', 201);
  });

  login = this.wrap(async (req: Request, res: Response<ApiResponse<UserResponseDto>>) => {
    const dto: LoginUserDto = req.body;
    const { token, user } = await this.authService.login(dto);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів
    });

    this.success(res, user, 'Logged in successfully');
  });

  logout = this.wrap(async (_req: Request, res: Response<ApiResponse<null>>) => {
    res.clearCookie('token');
    this.noContent(res);
  });

  profile = this.wrap(async (req: Request, res: Response<ApiResponse<UserResponseDto>>) => {
    this.success(res, req.user, 'Profile data retrieved');
  });
}
