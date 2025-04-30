import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '@/types/express';

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies['token'];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' + token });
  }
}
