import { Router } from 'express';
import { db } from '../database/dbStore';
import { v4 as uuidv4 } from 'uuid';
import { calculateBMI, calculateBMR, calculateTDEE, calculateTargetCalories, calculateTargetWaterMl } from '../services/biometricsEngine';
import { generate7DayWorkoutPlan } from '../services/workoutPlanGenerator';
import { generateDietPlan } from '../services/dietPlanGenerator';
import { UserProfile } from '@fithealth/types';

export const authRouter = Router();

// Mock JWT Token generator for clean API usage
function generateTokens(userId: string) {
  return {
    accessToken: `fit_access_${userId}_${Date.now()}`,
    refreshToken: `fit_refresh_${userId}_${Date.now()}`,
    expiresIn: 86400
  };
}

// POST /auth/login
authRouter.post('/login', (req, res) => {
  const { email } = req.body;
  // If email exists, return user, else return default demo user
  let user = Array.from(db.users.values()).find(u => u.email === email);
  if (!user) {
    user = db.users.get('user-alex-01');
  }

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    user,
    tokens: generateTokens(user.id)
  });
});

// POST /auth/signup / onboarding
authRouter.post('/signup', (req, res) => {
  const {
    name = 'Athlete',
    email = `user_${Date.now()}@fithealth.io`,
    age = 25,
    gender = 'male',
    heightCm = 175,
    weightKg = 72,
    targetWeightKg = 75,
    activityLevel = 'moderately_active',
    goal = 'muscle_gain',
    dietPreference = 'omnivore',
    experienceLevel = 'intermediate',
    medicalNotes
  } = req.body;

  const userId = `user-${uuidv4().slice(0, 8)}`;
  const { bmi, category } = calculateBMI(weightKg, heightCm);
  const bmr = calculateBMR(gender, weightKg, heightCm, age);
  const tdee = calculateTDEE(bmr, activityLevel);
  const targetCalories = calculateTargetCalories(tdee, goal);
  const waterTargetMl = calculateTargetWaterMl(weightKg, activityLevel);

  const newUser: UserProfile = {
    id: userId,
    email,
    name,
    age: Number(age),
    gender,
    heightCm: Number(heightCm),
    weightKg: Number(weightKg),
    targetWeightKg: Number(targetWeightKg),
    activityLevel,
    goal,
    dietPreference,
    experienceLevel,
    medicalNotes,
    bmi,
    bmiCategory: category,
    bmr,
    tdee,
    targetCalories,
    isOnboarded: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.users.set(userId, newUser);

  // Auto-generate customized 7-day workout & diet plans
  const workoutPlan = generate7DayWorkoutPlan(userId, goal, experienceLevel);
  db.workoutPlans.set(userId, workoutPlan);

  const dietPlan = generateDietPlan(userId, targetCalories, weightKg, goal, dietPreference, waterTargetMl);
  db.dietPlans.set(userId, dietPlan);

  res.status(201).json({
    user: newUser,
    tokens: generateTokens(userId)
  });
});
