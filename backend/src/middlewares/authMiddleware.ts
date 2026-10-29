import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Token tidak ditemukan atau tidak valid.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as { id: number; username: string };
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Token kedaluwarsa atau tidak sah.' });
    return;
  }
};

// Mengekspor alias verifyToken agar kompatibel dengan file lain yang mengimpor verifyToken
export const verifyToken = authMiddleware;