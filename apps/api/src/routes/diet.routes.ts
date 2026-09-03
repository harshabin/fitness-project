import { Router } from 'express';
import { db } from '../database/dbStore';
import { generateDietPlan, findSwapMealAlternatives } from '../services/dietPlanGenerator';
import { v4 as uuidv4 } from 'uuid';
import { FoodLogEntry } from '@fithealth/types';

export const dietRouter = Router();

// GET /diet-plan/current
dietRouter.get('/current', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  let plan = db.dietPlans.get(userId);

  if (!plan) {
    const user = db.users.get(userId) || db.users.get('user-alex-01')!;
    plan = generateDietPlan(userId, user.targetCalories, user.weightKg, user.goal, user.dietPreference, 3000);
    db.dietPlans.set(userId, plan);
  }

  res.json(plan);
});

// POST /diet-plan/generate - Generate fresh meal plan
dietRouter.post('/generate', (req, res) => {
  const { userId = 'user-alex-01', targetCalories, dietPreference } = req.body;
  const user = db.users.get(userId) || db.users.get('user-alex-01')!;

  const cals = targetCalories || user.targetCalories;
  const pref = dietPreference || user.dietPreference;

  const newPlan = generateDietPlan(userId, cals, user.weightKg, user.goal, pref, 3000);
  db.dietPlans.set(userId, newPlan);

  res.json(newPlan);
});

// GET /diet-plan/food-items - Search foods
dietRouter.get('/food-items', (req, res) => {
  const { q } = req.query;
  let items = db.foodItems;

  if (q) {
    const query = (q as string).toLowerCase();
    items = items.filter(f => f.name.toLowerCase().includes(query) || f.cuisine?.toLowerCase().includes(query));
  }

  res.json(items);
});

// POST /diet-plan/swap-meal - Get alternatives for a meal
dietRouter.post('/swap-meal', (req, res) => {
  const { mealId, userId = 'user-alex-01' } = req.body;
  const plan = db.dietPlans.get(userId);
  const user = db.users.get(userId);

  if (!plan) return res.status(404).json({ error: 'Diet plan not found' });

  const meal = plan.meals.find(m => m.id === mealId);
  if (!meal) return res.status(404).json({ error: 'Meal not found' });

  const alternatives = findSwapMealAlternatives(meal, user?.dietPreference || 'omnivore');
  res.json({
    currentMeal: meal,
    alternatives
  });
});

// POST /diet-plan/log-food - Log a food item consumed
dietRouter.post('/log-food', (req, res) => {
  const {
    userId = 'user-alex-01',
    timeSlot = 'lunch',
    foodItemId,
    quantity = 1
  } = req.body;

  const food = db.foodItems.find(f => f.id === foodItemId);
  if (!food) return res.status(404).json({ error: 'Food item not found' });

  const entry: FoodLogEntry = {
    id: `flog-${uuidv4().slice(0, 8)}`,
    userId,
    date: new Date().toISOString().split('T')[0],
    timeSlot,
    foodItemId,
    foodItemName: food.name,
    quantity,
    servingSize: food.servingSize,
    calories: Math.round(food.calories * quantity),
    proteinG: Math.round(food.proteinG * quantity),
    carbsG: Math.round(food.carbsG * quantity),
    fatG: Math.round(food.fatG * quantity),
    loggedAt: new Date().toISOString()
  };

  db.foodLogs.push(entry);
  res.status(201).json(entry);
});

// GET /diet-plan/summary - Get today's consumed macros and water
dietRouter.get('/summary', (req, res) => {
  const userId = (req.query.userId as string) || 'user-alex-01';
  const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
  const user = db.users.get(userId) || db.users.get('user-alex-01')!;
  const plan = db.dietPlans.get(userId) || db.dietPlans.get('user-alex-01')!;

  const userLogs = db.foodLogs.filter(f => f.userId === userId && f.date === date);

  const consumed = userLogs.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      proteinG: acc.proteinG + item.proteinG,
      carbsG: acc.carbsG + item.carbsG,
      fatG: acc.fatG + item.fatG,
      fiberG: acc.fiberG
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 }
  );

  const waterConsumedMl = db.waterLogs.get(`${userId}:${date}`) || 1750;

  res.json({
    date,
    targetCalories: user.targetCalories,
    consumedCalories: consumed.calories,
    targetMacros: plan.macroSplit,
    consumedMacros: consumed,
    waterTargetMl: plan.waterTargetMl || 3000,
    waterConsumedMl,
    foodLogs: userLogs
  });
});

// POST /diet-plan/log-water - Add water intake
dietRouter.post('/log-water', (req, res) => {
  const { userId = 'user-alex-01', amountMl = 250, date = new Date().toISOString().split('T')[0] } = req.body;
  const key = `${userId}:${date}`;
  const current = db.waterLogs.get(key) || 0;
  const updated = current + amountMl;
  db.waterLogs.set(key, updated);

  res.json({ date, waterConsumedMl: updated });
});
