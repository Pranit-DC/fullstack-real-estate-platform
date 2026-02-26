import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/db';
import contentRoutes from './routes/content';
import adminRoutes from './routes/admin';
import errorHandler from './middleware/errorHandler';

const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
  })
);

app.use('/content', contentRoutes);
app.use('/admin', adminRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Must be last — catches all errors passed via next(err)
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});
