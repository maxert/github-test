import { UserRole } from '@/entities/user.entity';

export interface UserPayload {
  id: number;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}
