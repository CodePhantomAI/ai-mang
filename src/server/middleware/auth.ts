import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface JwtPayload {
  userId: string;
  organizationId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
      organizationId?: string;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findOne({ 
      _id: decoded.userId,
      organizationId: decoded.organizationId,
      isActive: true 
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.organizationId = decoded.organizationId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'נא להתחבר מחדש' });
  }
};

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'אין הרשאה לבצע פעולה זו' });
    }
    next();
  };
};
