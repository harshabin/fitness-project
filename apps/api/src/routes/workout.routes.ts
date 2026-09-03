import { Router } from 'express';
import { db } from '../database/dbStore';
import { generate7DayWorkoutPlan } from '../services/workoutPlanGenerator';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutLog } from '@fithealth/types';

export const workoutRouter = Router();

// GET /workout-plan/current
workoutRouter.get('/current', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  let plan = db.workoutPlans.get(userId);

  if (!plan) {
    const user = db.users.get(userId) || db.users.get('user-alex-01')!;
    plan = generate7DayWorkoutPlan(userId, user.goal, user.experienceLevel);
    db.workoutPlans.set(userId, plan);
  }

  res.json(plan);
});

// POST /workout-plan/generate - Generate fresh 7-day split
workoutRouter.post('/generate', (req, res) => {
  const { userId = 'user-alex-01', goal, experienceLevel } = req.body;
  const user = db.users.get(userId);

  const selectedGoal = goal || user?.goal || 'muscle_gain';
  const selectedExp = experienceLevel || user?.experienceLevel || 'intermediate';

  const newPlan = generate7DayWorkoutPlan(userId, selectedGoal, selectedExp);
  db.workoutPlans.set(userId, newPlan);

  res.json(newPlan);
});

// GET /workout-plan/day/:id
workoutRouter.get('/day/:id', (req, res) => {
  const dayId = req.params.id;
  let foundDay = null;

  for (const plan of db.workoutPlans.values()) {
    const day = plan.days.find(d => d.id === dayId);
    if (day) {
      foundDay = day;
      break;
    }
  }

  if (!foundDay) {
    return res.status(404).json({ error: 'Workout day not found' });
  }

  res.json(foundDay);
});

// POST /workout-plan/log - Submit completed workout session
workoutRouter.post('/log', (req, res) => {
  const {
    userId = 'user-alex-01',
    workoutDayId,
    durationSeconds = 2400,
    exercisesCompleted = [],
    feelingRating = 5,
    notes = ''
  } = req.body;

  // Compute total volume lifted (weight * reps across completed sets)
  let totalVolumeKg = 0;
  for (const ex of exercisesCompleted) {
    if (ex.sets) {
      for (const set of ex.sets) {
        if (set.completed && set.weightKg && set.reps) {
          totalVolumeKg += set.weightKg * set.reps;
        }
      }
    }
  }

  const newLog: WorkoutLog = {
    id: `wlog-${uuidv4().slice(0, 8)}`,
    userId,
    workoutDayId,
    date: new Date().toISOString().split('T')[0],
    durationSeconds,
    totalVolumeKg,
    exercisesCompleted,
    feelingRating,
    notes,
    completed: true
  };

  db.workoutLogs.unshift(newLog);

  res.status(201).json({
    success: true,
    log: newLog,
    progressionAdvice: 'Great job! On your next session, try to add +1 rep on your top sets to maintain progressive overload.'
  });
});

// GET /workout-plan/logs - Get user workout history
workoutRouter.get('/logs', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  const logs = db.workoutLogs.filter(l => l.userId === userId);
  res.json(logs);
});
