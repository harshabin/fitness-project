import { MuscleGroupId } from './muscle-3d.types';
export type EquipmentType = 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight' | 'kettlebell' | 'resistance_band' | 'bench' | 'pullup_bar';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type BodyPartFocus = 'Chest & Triceps' | 'Back & Biceps' | 'Back & Posterior Chain' | 'Legs & Calves' | 'Shoulders & Traps' | 'Arms & Abs' | 'Core & Cardio' | 'Full Body' | 'Rest & Recovery';
export interface Exercise {
    id: string;
    name: string;
    category: string;
    targetMusclePrimary: MuscleGroupId[];
    targetMuscleSecondary: MuscleGroupId[];
    equipment: EquipmentType;
    difficulty: DifficultyLevel;
    instructions: string[];
    tips: string[];
    commonMistakes: string[];
    model3dUrl?: string;
    animationClipId: string;
    fallbackMediaUrl?: string;
    substituteExerciseIds?: string[];
}
export interface WorkoutExercise {
    id: string;
    workoutDayId: string;
    exerciseId: string;
    exercise: Exercise;
    sets: number;
    targetReps: string;
    restSeconds: number;
    orderIndex: number;
    notes?: string;
}
export interface WorkoutDay {
    id: string;
    planId: string;
    dayOfWeek: number;
    dayName: string;
    bodyPartFocus: BodyPartFocus;
    estimatedDurationMin: number;
    isRestDay: boolean;
    exercises: WorkoutExercise[];
}
export interface WorkoutPlan {
    id: string;
    userId: string;
    weekStartDate: string;
    title: string;
    goal: string;
    days: WorkoutDay[];
    createdAt: string;
    updatedAt: string;
}
export interface SetLog {
    setNumber: number;
    reps: number;
    weightKg: number;
    rpe?: number;
    completed: boolean;
}
export interface ExerciseLog {
    id: string;
    workoutLogId: string;
    workoutExerciseId: string;
    exerciseId: string;
    sets: SetLog[];
    completedAt?: string;
}
export interface WorkoutLog {
    id: string;
    userId: string;
    workoutDayId: string;
    date: string;
    durationSeconds: number;
    totalVolumeKg: number;
    exercisesCompleted: ExerciseLog[];
    feelingRating: 1 | 2 | 3 | 4 | 5;
    notes?: string;
    completed: boolean;
}
//# sourceMappingURL=workout.types.d.ts.map