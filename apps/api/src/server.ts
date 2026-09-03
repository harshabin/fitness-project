import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { workoutRouter } from './routes/workout.routes';
import { exerciseRouter } from './routes/exercise.routes';
import { dietRouter } from './routes/diet.routes';
import { progressRouter } from './routes/progress.routes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'FitHealth Core API Gateway',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/workout-plan', workoutRouter);
app.use('/exercises', exerciseRouter);
app.use('/diet-plan', dietRouter);
app.use('/progress', progressRouter);

app.listen(PORT, () => {
  console.log(`🚀 FitHealth API Gateway running on http://localhost:${PORT}`);
});
