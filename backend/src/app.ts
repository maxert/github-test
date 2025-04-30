import express from 'express';
import { initDatabase } from '@/utils/init-database';
import { errorMiddleware } from '@/middlewares/error.middleware';
import authRoutes from '@/routes/auth.routes';
import projectRoutes from '@/routes/project.routes';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
const app = express();

(async () => {
  await initDatabase();

  app.use(express.json());
  app.use(helmet());
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }));

  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);

  app.use(errorMiddleware);

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
})();
