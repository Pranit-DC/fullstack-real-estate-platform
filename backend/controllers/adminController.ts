import { Request, Response } from 'express';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  req.session.isAdmin = true;
  res.status(200).json({ message: 'Login successful.' });
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Logout failed.' });
      return;
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully.' });
  });
};

// Used by frontend on mount to restore auth state from existing session cookie
export const me = (req: Request, res: Response): void => {
  res.status(200).json({ isAdmin: req.session?.isAdmin === true });
};
