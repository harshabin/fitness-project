import { Router } from 'express';
import { db } from '../database/dbStore';
import { calculateAdherenceScore, computeMuscleRecoveryStatuses } from '../services/adherenceEngine';
import { v4 as uuidv4 } from 'uuid';
import { ProgressLog } from '@fithealth/types';

export const progressRouter = Router();

// GET /progress - Get user progress history
progressRouter.get('/', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  const logs = db.progressLogs.filter(p => p.userId === userId);
  res.json(logs);
});

// POST /progress - Log new weight / measurements
progressRouter.post('/', (req, res) => {
  const {
    userId = 'user-alex-01',
    weightKg,
    bodyFatPercentage,
    measurements,
    photoFrontUrl,
    photoSideUrl,
    photoBackUrl,
    notes
  } = req.body;

  const date = new Date().toISOString().split('T')[0];

  const newLog: ProgressLog = {
    id: `prog-${uuidv4().slice(0, 8)}`,
    userId,
    date,
    weightKg: Number(weightKg),
    bodyFatPercentage: bodyFatPercentage ? Number(bodyFatPercentage) : undefined,
    measurements,
    photoFrontUrl,
    photoSideUrl,
    photoBackUrl,
    notes,
    createdAt: new Date().toISOString()
  };

  db.progressLogs.push(newLog);

  // Update user's current weight in profile
  const user = db.users.get(userId);
  if (user && weightKg) {
    user.weightKg = Number(weightKg);
  }

  res.status(201).json(newLog);
});

// GET /progress/adherence - Get overall adherence metrics
progressRouter.get('/adherence', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  const user = db.users.get(userId) || db.users.get('user-alex-01')!;
  const workoutLogs = db.workoutLogs.filter(l => l.userId === userId);
  const foodLogs = db.foodLogs.filter(f => f.userId === userId);

  const score = calculateAdherenceScore(workoutLogs, foodLogs, user.targetCalories, 7);
  res.json(score);
});

// GET /progress/muscle-recovery - Get real-time recovery status for all muscle groups
progressRouter.get('/muscle-recovery', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  const workoutLogs = db.workoutLogs.filter(l => l.userId === userId);
  const recoveryList = computeMuscleRecoveryStatuses(workoutLogs);
  res.json(recoveryList);
});
