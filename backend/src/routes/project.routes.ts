import { Router } from 'express';
import { ProjectController } from '@/controllers/project.controller';
import { authenticateToken } from '@/middlewares/auth.middleware';
import { validateDto } from '@/middlewares/validate.middleware';
import { CreateProjectDto } from '@/dtos/create-project.dto';

const router = Router();
const controller = new ProjectController();

router.post('/', authenticateToken, validateDto(CreateProjectDto), controller.create.bind(controller));
router.get('/', authenticateToken, controller.getAll.bind(controller));
router.put('/:id', authenticateToken, controller.update.bind(controller));
router.delete('/:id', authenticateToken, controller.delete.bind(controller));


export default router;
