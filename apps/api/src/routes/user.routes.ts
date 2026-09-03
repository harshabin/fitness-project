import { Router } from 'express';
import { db } from '../database/dbStore';
import { calculateBMI, calculateBMR, calculateTDEE, calculateTargetCalories, calculateTargetWaterMl } from '../services/biometricsEngine';

export const userRouter = Router();

// GET /users/me
userRouter.get('/me', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  const user = db.users.get(userId) || db.users.get('user-alex-01');

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// PUT /users/me - Update biometrics and recompute targets
userRouter.put('/me', (req, res) => {
  const userId = (req.body.id as string) || 'user-alex-01';
  const existing = db.users.get(userId);

  if (!existing) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedData = { ...existing, ...req.body };
  const { bmi, category } = calculateBMI(updatedData.weightKg, updatedData.heightCm);
  const bmr = calculateBMR(updatedData.gender, updatedData.weightKg, updatedData.heightCm, updatedData.age);
  const tdee = calculateTDEE(bmr, updatedData.activityLevel);
  const targetCalories = calculateTargetCalories(tdee, updatedData.goal);
  const waterTargetMl = calculateTargetWaterMl(updatedData.weightKg, updatedData.activityLevel);

  const updatedUser = {
    ...updatedData,
    bmi,
    bmiCategory: category,
    bmr,
    tdee,
    targetCalories,
    waterTargetMl,
    updatedAt: new Date().toISOString()
  };

  db.users.set(userId, updatedUser);
  res.json(updatedUser);
});
