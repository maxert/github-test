import { Router } from 'express';
import { SearchController } from '@/controllers/search.controller';
import { authenticateToken } from '@/middlewares/auth.middleware';

const router = Router();
const controller = new SearchController();

router.get('/repositories', authenticateToken, controller.searchRepositories);

export default router;
