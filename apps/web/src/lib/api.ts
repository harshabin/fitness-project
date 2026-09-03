import { UserProfile, WorkoutPlan, DietPlan, WorkoutLog, FoodLogEntry, ProgressLog, Exercise, FoodItem, AdherenceScore, MuscleRecoveryStatus, OnboardingInput } from '@fithealth/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[FitHealth API] Request to ${endpoint} failed, falling back to local computation:`, err);
    throw err;
  }
}

export const api = {
  // Auth & Profile
  getUser: (userId: string = 'user-alex-01') => fetchJson<UserProfile>(`/users/me?userId=${userId}`),
  updateUser: (data: Partial<UserProfile>) => fetchJson<UserProfile>('/users/me', { method: 'PUT', body: JSON.stringify(data) }),
  signupOnboard: (data: OnboardingInput) => fetchJson<{ user: UserProfile; tokens: any }>('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),

  // Workouts & Exercises
  getWorkoutPlan: (userId: string = 'user-alex-01') => fetchJson<WorkoutPlan>(`/workout-plan/current?userId=${userId}`),
  generateWorkoutPlan: (data: { userId?: string; goal: string; experienceLevel: string }) => 
    fetchJson<WorkoutPlan>('/workout-plan/generate', { method: 'POST', body: JSON.stringify(data) }),
  logWorkout: (data: any) => fetchJson<{ success: boolean; log: WorkoutLog; progressionAdvice: string }>('/workout-plan/log', { method: 'POST', body: JSON.stringify(data) }),
  getWorkoutLogs: (userId: string = 'user-alex-01') => fetchJson<WorkoutLog[]>(`/workout-plan/logs?userId=${userId}`),
  getExercises: () => fetchJson<Exercise[]>('/exercises'),
  getExerciseById: (id: string) => fetchJson<Exercise>(`/exercises/${id}`),

  // Diet & Nutrition
  getDietPlan: (userId: string = 'user-alex-01') => fetchJson<DietPlan>(`/diet-plan/current?userId=${userId}`),
  getDietSummary: (userId: string = 'user-alex-01', date?: string) => 
    fetchJson<{
      date: string;
      targetCalories: number;
      consumedCalories: number;
      targetMacros: any;
      consumedMacros: any;
      waterTargetMl: number;
      waterConsumedMl: number;
      foodLogs: FoodLogEntry[];
    }>(`/diet-plan/summary?userId=${userId}${date ? `&date=${date}` : ''}`),
  logFood: (data: { userId?: string; timeSlot: string; foodItemId: string; quantity: number }) => 
    fetchJson<FoodLogEntry>('/diet-plan/log-food', { method: 'POST', body: JSON.stringify(data) }),
  logWater: (amountMl: number = 250, userId: string = 'user-alex-01') => 
    fetchJson<{ date: string; waterConsumedMl: number }>('/diet-plan/log-water', { method: 'POST', body: JSON.stringify({ userId, amountMl }) }),
  getSwapMealAlternatives: (mealId: string, userId: string = 'user-alex-01') => 
    fetchJson<{ currentMeal: any; alternatives: FoodItem[] }>('/diet-plan/swap-meal', { method: 'POST', body: JSON.stringify({ mealId, userId }) }),
  searchFoodItems: (query: string = '') => fetchJson<FoodItem[]>(`/diet-plan/food-items?q=${encodeURIComponent(query)}`),

  // Progress & Telemetry
  getProgressLogs: (userId: string = 'user-alex-01') => fetchJson<ProgressLog[]>(`/progress?userId=${userId}`),
  logProgress: (data: Partial<ProgressLog>) => fetchJson<ProgressLog>('/progress', { method: 'POST', body: JSON.stringify(data) }),
  getAdherenceScore: (userId: string = 'user-alex-01') => fetchJson<AdherenceScore>(`/progress/adherence?userId=${userId}`),
  getMuscleRecovery: (userId: string = 'user-alex-01') => fetchJson<MuscleRecoveryStatus[]>(`/progress/muscle-recovery?userId=${userId}`)
};
