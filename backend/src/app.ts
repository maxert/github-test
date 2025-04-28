import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import {errorMiddleware} from "./middlewares/error.middleware";
import searchRoutes from '@/routes/search.routes';

const app = express();

// Безпека
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));

app.use(express.json());
app.use(cookieParser());

// Роути
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/search', searchRoutes);
app.use(errorMiddleware);
// База даних
AppDataSource.initialize()
    .then(() => console.log('Connected to Database'))
    .catch((error) => console.error('Database connection error:', error));

export default app;
