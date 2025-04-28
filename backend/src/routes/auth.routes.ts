import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { validateDto } from '@/middlewares/validate.middleware';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { LoginUserDto } from '@/dtos/login-user.dto';
import { authenticateToken } from '@/middlewares/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/register', validateDto(CreateUserDto), controller.register.bind(controller));
router.post('/login', validateDto(LoginUserDto), controller.login.bind(controller));
router.post('/logout', authenticateToken, controller.logout.bind(controller));
router.get('/profile', authenticateToken, controller.profile.bind(controller));

export default router;
