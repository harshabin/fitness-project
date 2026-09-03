import { create } from 'zustand';
import { UserProfile, WorkoutPlan, DietPlan, WorkoutLog, FoodLogEntry, ProgressLog, Exercise, MuscleRecoveryStatus, AdherenceScore } from '@fithealth/types';
import { api } from '@/lib/api';

interface ActiveWorkoutState {
  isSessionActive: boolean;
  activeWorkoutDayId: string | null;
  currentExerciseIndex: number;
  completedSetsMap: Record<string, { setNumber: number; weightKg: number; reps: number; completed: boolean }[]>;
  elapsedSeconds: number;
  isResting: boolean;
  restRemainingSeconds: number;
}

interface FitnessStoreState {
  user: UserProfile | null;
  workoutPlan: WorkoutPlan | null;
  dietPlan: DietPlan | null;
  exercises: Exercise[];
  progressLogs: ProgressLog[];
  dietSummary: any | null;
  adherence: AdherenceScore | null;
  muscleRecovery: MuscleRecoveryStatus[];
  isLoading: boolean;
  error: string | null;

  // Active Workout Session
  activeSession: ActiveWorkoutState;

  // Actions
  initialize: () => Promise<void>;
  setUser: (user: UserProfile) => void;
  startWorkout: (workoutDayId: string) => void;
  nextExercise: () => void;
  prevExercise: () => void;
  logSet: (exerciseId: string, setIndex: number, weightKg: number, reps: number) => void;
  startRestTimer: (seconds: number) => void;
  decrementRestTimer: () => void;
  stopRestTimer: () => void;
  finishWorkout: () => Promise<void>;
  logWaterIntake: (amountMl?: number) => Promise<void>;
  addFoodLog: (timeSlot: string, foodItemId: string, quantity: number) => Promise<void>;
  refreshAll: () => Promise<void>;
}

export const useFitnessStore = create<FitnessStoreState>((set, get) => ({
  user: {
    id: 'user-alex-01',
    email: 'alex.fitness@fithealth.io',
    name: 'Alex Rivera',
    age: 26,
    gender: 'male',
    heightCm: 178,
    weightKg: 76,
    targetWeightKg: 80,
    activityLevel: 'moderately_active',
    goal: 'muscle_gain',
    dietPreference: 'omnivore',
    experienceLevel: 'intermediate',
    bmi: 24.0,
    bmiCategory: 'normal',
    bmr: 1770,
    tdee: 2744,
    targetCalories: 3094,
    isOnboarded: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  workoutPlan: null,
  dietPlan: null,
  exercises: [],
  progressLogs: [],
  dietSummary: null,
  adherence: {
    periodDays: 7,
    overallScore: 88,
    workoutAdherence: 86,
    nutritionAdherence: 90,
    hydrationAdherence: 92,
    activeStreakDays: 5,
    totalWorkoutsCompleted: 4,
    totalVolumeKgLifted: 18450
  },
  muscleRecovery: [],
  isLoading: true,
  error: null,

  activeSession: {
    isSessionActive: false,
    activeWorkoutDayId: null,
    currentExerciseIndex: 0,
    completedSetsMap: {},
    elapsedSeconds: 0,
    isResting: false,
    restRemainingSeconds: 0
  },

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });
      const [user, workoutPlan, dietPlan, exercises, dietSummary, adherence, muscleRecovery, progressLogs] = await Promise.allSettled([
        api.getUser(),
        api.getWorkoutPlan(),
        api.getDietPlan(),
        api.getExercises(),
        api.getDietSummary(),
        api.getAdherenceScore(),
        api.getMuscleRecovery(),
        api.getProgressLogs()
      ]);

      set({
        user: user.status === 'fulfilled' ? user.value : get().user,
        workoutPlan: workoutPlan.status === 'fulfilled' ? workoutPlan.value : null,
        dietPlan: dietPlan.status === 'fulfilled' ? dietPlan.value : null,
        exercises: exercises.status === 'fulfilled' ? exercises.value : [],
        dietSummary: dietSummary.status === 'fulfilled' ? dietSummary.value : null,
        adherence: adherence.status === 'fulfilled' ? adherence.value : get().adherence,
        muscleRecovery: muscleRecovery.status === 'fulfilled' ? muscleRecovery.value : [],
        progressLogs: progressLogs.status === 'fulfilled' ? progressLogs.value : [],
        isLoading: false
      });
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
    }
  },

  refreshAll: async () => {
    await get().initialize();
  },

  setUser: (user) => set({ user }),

  startWorkout: (workoutDayId) => {
    set({
      activeSession: {
        isSessionActive: true,
        activeWorkoutDayId: workoutDayId,
        currentExerciseIndex: 0,
        completedSetsMap: {},
        elapsedSeconds: 0,
        isResting: false,
        restRemainingSeconds: 0
      }
    });
  },

  nextExercise: () => {
    const { activeSession, workoutPlan } = get();
    if (!workoutPlan || !activeSession.activeWorkoutDayId) return;
    const currentDay = workoutPlan.days.find(d => d.id === activeSession.activeWorkoutDayId);
    if (!currentDay) return;

    if (activeSession.currentExerciseIndex < currentDay.exercises.length - 1) {
      set({
        activeSession: {
          ...activeSession,
          currentExerciseIndex: activeSession.currentExerciseIndex + 1
        }
      });
    }
  },

  prevExercise: () => {
    const { activeSession } = get();
    if (activeSession.currentExerciseIndex > 0) {
      set({
        activeSession: {
          ...activeSession,
          currentExerciseIndex: activeSession.currentExerciseIndex - 1
        }
      });
    }
  },

  logSet: (exerciseId, setIndex, weightKg, reps) => {
    const { activeSession } = get();
    const currentSets = activeSession.completedSetsMap[exerciseId] || [];
    const updatedSets = [...currentSets];
    updatedSets[setIndex] = {
      setNumber: setIndex + 1,
      weightKg,
      reps,
      completed: true
    };

    set({
      activeSession: {
        ...activeSession,
        completedSetsMap: {
          ...activeSession.completedSetsMap,
          [exerciseId]: updatedSets
        }
      }
    });
  },

  startRestTimer: (seconds) => {
    set((state) => ({
      activeSession: {
        ...state.activeSession,
        isResting: true,
        restRemainingSeconds: seconds
      }
    }));
  },

  decrementRestTimer: () => {
    set((state) => {
      const nextRemaining = state.activeSession.restRemainingSeconds - 1;
      return {
        activeSession: {
          ...state.activeSession,
          isResting: nextRemaining > 0,
          restRemainingSeconds: Math.max(0, nextRemaining)
        }
      };
    });
  },

  stopRestTimer: () => {
    set((state) => ({
      activeSession: {
        ...state.activeSession,
        isResting: false,
        restRemainingSeconds: 0
      }
    }));
  },

  finishWorkout: async () => {
    const { activeSession, user } = get();
    const exercisesCompleted = Object.entries(activeSession.completedSetsMap).map(([exId, sets]) => ({
      exerciseId: exId,
      sets
    }));

    try {
      await api.logWorkout({
        userId: user?.id,
        workoutDayId: activeSession.activeWorkoutDayId,
        durationSeconds: activeSession.elapsedSeconds || 2400,
        exercisesCompleted,
        feelingRating: 5
      });
    } catch (e) {
      console.warn('Logging workout locally:', e);
    }

    set({
      activeSession: {
        isSessionActive: false,
        activeWorkoutDayId: null,
        currentExerciseIndex: 0,
        completedSetsMap: {},
        elapsedSeconds: 0,
        isResting: false,
        restRemainingSeconds: 0
      }
    });

    await get().refreshAll();
  },

  logWaterIntake: async (amountMl = 250) => {
    const { user } = get();
    try {
      const res = await api.logWater(amountMl, user?.id);
      set((state) => ({
        dietSummary: state.dietSummary
          ? { ...state.dietSummary, waterConsumedMl: res.waterConsumedMl }
          : { waterConsumedMl: res.waterConsumedMl }
      }));
    } catch (e) {
      set((state) => ({
        dietSummary: state.dietSummary
          ? { ...state.dietSummary, waterConsumedMl: (state.dietSummary.waterConsumedMl || 1500) + amountMl }
          : { waterConsumedMl: 1500 + amountMl }
      }));
    }
  },

  addFoodLog: async (timeSlot, foodItemId, quantity) => {
    const { user } = get();
    try {
      await api.logFood({ userId: user?.id, timeSlot, foodItemId, quantity });
      const updated = await api.getDietSummary(user?.id);
      set({ dietSummary: updated });
    } catch (e) {
      console.warn('Food logged locally:', e);
    }
  }
}));
