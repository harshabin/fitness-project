import { UserProfile, WorkoutPlan, DietPlan, WorkoutLog, FoodLogEntry, ProgressLog, Exercise, FoodItem } from '@fithealth/types';
import { SEED_EXERCISES, SEED_FOOD_ITEMS } from './seedData';
import { generate7DayWorkoutPlan } from '../services/workoutPlanGenerator';
import { generateDietPlan } from '../services/dietPlanGenerator';
import { calculateBMI, calculateBMR, calculateTDEE, calculateTargetCalories, calculateTargetWaterMl } from '../services/biometricsEngine';

class DatabaseStore {
  public users: Map<string, UserProfile> = new Map();
  public workoutPlans: Map<string, WorkoutPlan> = new Map();
  public dietPlans: Map<string, DietPlan> = new Map();
  public workoutLogs: WorkoutLog[] = [];
  public foodLogs: FoodLogEntry[] = [];
  public waterLogs: Map<string, number> = new Map(); // key: "userId:YYYY-MM-DD", val: ml
  public progressLogs: ProgressLog[] = [];
  public exercises: Exercise[] = [...SEED_EXERCISES];
  public foodItems: FoodItem[] = [...SEED_FOOD_ITEMS];

  constructor() {
    this.seedDefaultUser();
  }

  private seedDefaultUser() {
    const defaultUserId = 'user-alex-01';
    const age = 26;
    const gender = 'male';
    const heightCm = 178;
    const weightKg = 76;
    const activityLevel = 'moderately_active';
    const goal = 'muscle_gain';
    const dietPref = 'omnivore';

    const { bmi, category } = calculateBMI(weightKg, heightCm);
    const bmr = calculateBMR(gender, weightKg, heightCm, age);
    const tdee = calculateTDEE(bmr, activityLevel);
    const targetCalories = calculateTargetCalories(tdee, goal);
    const waterTargetMl = calculateTargetWaterMl(weightKg, activityLevel);

    const defaultUser: UserProfile = {
      id: defaultUserId,
      email: 'alex.fitness@fithealth.io',
      name: 'Alex Rivera',
      age,
      gender,
      heightCm,
      weightKg,
      targetWeightKg: 80,
      activityLevel,
      goal,
      dietPreference: dietPref,
      experienceLevel: 'intermediate',
      bmi,
      bmiCategory: category,
      bmr,
      tdee,
      targetCalories,
      isOnboarded: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.users.set(defaultUserId, defaultUser);

    // Seed workout plan
    const workoutPlan = generate7DayWorkoutPlan(defaultUserId, goal, 'intermediate');
    this.workoutPlans.set(defaultUserId, workoutPlan);

    // Seed diet plan
    const dietPlan = generateDietPlan(defaultUserId, targetCalories, weightKg, goal, dietPref, waterTargetMl);
    this.dietPlans.set(defaultUserId, dietPlan);

    // Seed initial progress logs (weight history)
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 86400000);
      const dateStr = d.toISOString().split('T')[0];
      const weightNoise = (Math.sin(i) * 0.4).toFixed(1);

      this.progressLogs.push({
        id: `prog-${i}`,
        userId: defaultUserId,
        date: dateStr,
        weightKg: parseFloat((75.6 + parseFloat(weightNoise)).toFixed(1)),
        bodyFatPercentage: 14.5 - i * 0.05,
        measurements: {
          chestCm: 104,
          waistCm: 81,
          leftBicepCm: 38,
          rightBicepCm: 38.2,
          leftThighCm: 59,
          rightThighCm: 59.5
        },
        createdAt: d.toISOString()
      });

      // Seed water logs
      this.waterLogs.set(`${defaultUserId}:${dateStr}`, 2500 + i * 150);
    }

    // Seed workout history
    this.workoutLogs.push({
      id: 'log-prev-1',
      userId: defaultUserId,
      workoutDayId: workoutPlan.days[0].id,
      date: new Date(today.getTime() - 86400000 * 2).toISOString().split('T')[0],
      durationSeconds: 3200,
      totalVolumeKg: 4650,
      feelingRating: 5,
      completed: true,
      exercisesCompleted: [
        {
          id: 'ec-1',
          workoutLogId: 'log-prev-1',
          workoutExerciseId: workoutPlan.days[0].exercises[0]?.id || 'we-1',
          exerciseId: 'barbell-bench-press',
          sets: [
            { setNumber: 1, reps: 10, weightKg: 70, completed: true },
            { setNumber: 2, reps: 10, weightKg: 75, completed: true },
            { setNumber: 3, reps: 8, weightKg: 80, completed: true },
            { setNumber: 4, reps: 8, weightKg: 80, completed: true }
          ]
        }
      ]
    });
  }
}

export const db = new DatabaseStore();
