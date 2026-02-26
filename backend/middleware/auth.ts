import { Request, Response, NextFunction } from 'express';

// Extend express-session's SessionData to include isAdmin flag
declare module 'express-session' {
  interface SessionData {
    isAdmin: boolean;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session?.isAdmin) {
    next();
    return;
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};
