import { WorkoutPlan, WorkoutDay, WorkoutExercise, Exercise, FitnessGoal } from '@fithealth/types';
import { SEED_EXERCISES } from '../database/seedData';
import { v4 as uuidv4 } from 'uuid';

export function generate7DayWorkoutPlan(userId: string, goal: FitnessGoal, experienceLevel: 'beginner' | 'intermediate' | 'advanced'): WorkoutPlan {
  const planId = `plan-${uuidv4().slice(0, 8)}`;
  const weekStart = new Date().toISOString().split('T')[0];

  const findEx = (id: string): Exercise => {
    const ex = SEED_EXERCISES.find(e => e.id === id);
    if (!ex) throw new Error(`Exercise ${id} not found in catalog`);
    return ex;
  };

  const createWorkoutExercise = (exerciseId: string, sets: number, reps: string, restSec: number, order: number, notes?: string): WorkoutExercise => ({
    id: `we-${uuidv4().slice(0, 8)}`,
    workoutDayId: '',
    exerciseId,
    exercise: findEx(exerciseId),
    sets,
    targetReps: reps,
    restSeconds: restSec,
    orderIndex: order,
    notes
  });

  const repRange = goal === 'fat_loss' ? '12-15' : goal === 'muscle_gain' ? '8-12' : '10-12';
  const restTime = goal === 'muscle_gain' ? 90 : 60;

  const days: WorkoutDay[] = [
    {
      id: `day-mon-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 1,
      dayName: 'Monday',
      bodyPartFocus: 'Chest & Triceps',
      estimatedDurationMin: 55,
      isRestDay: false,
      exercises: [
        createWorkoutExercise('barbell-bench-press', 4, repRange, restTime, 1, 'Warm up rotator cuffs with light bands. Focus on explosive concentric drive.'),
        createWorkoutExercise('incline-dumbbell-press', 3, '10-12', 75, 2, 'Angle bench at 30 degrees. Feel deep stretch at bottom of rep.'),
        createWorkoutExercise('rope-tricep-pushdown', 4, '12-15', 60, 3, 'Flaring the rope ends apart at lockout for maximum lateral head contraction.')
      ]
    },
    {
      id: `day-tue-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 2,
      dayName: 'Tuesday',
      bodyPartFocus: 'Back & Biceps',
      estimatedDurationMin: 60,
      isRestDay: false,
      exercises: [
        createWorkoutExercise('lat-pulldown', 4, repRange, restTime, 1, 'Drive elbows straight into back pockets. 1 second pause at clavicle.'),
        createWorkoutExercise('barbell-bent-over-row', 4, '8-10', 90, 2, 'Maintain 45-degree hip hinge without rounding lumbar spine.'),
        createWorkoutExercise('barbell-bicep-curl', 3, '10-12', 60, 3, 'Keep elbows glued to ribs. Strict tempo with 3s eccentric.')
      ]
    },
    {
      id: `day-wed-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 3,
      dayName: 'Wednesday',
      bodyPartFocus: 'Legs & Calves',
      estimatedDurationMin: 65,
      isRestDay: false,
      exercises: [
        createWorkoutExercise('barbell-back-squat', 4, '6-10', 120, 1, 'Hit parallel depth with knees tracking aligned with toes.'),
        createWorkoutExercise('barbell-hip-thrust', 4, '10-12', 90, 2, 'Squeeze glutes hard at the top lockout. Keep chin tucked.'),
        createWorkoutExercise('leg-extensions', 3, '12-15', 60, 3, 'Full quad extension with 1-second hold.'),
        createWorkoutExercise('seated-leg-curl', 3, '12-15', 60, 4, 'Slow hamstring eccentric stretch.'),
        createWorkoutExercise('standing-calf-raises', 4, '15-20', 45, 5, 'Full ankle dorsiflexion and 2s pause at top.')
      ]
    },
    {
      id: `day-thu-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 4,
      dayName: 'Thursday',
      bodyPartFocus: 'Shoulders & Traps',
      estimatedDurationMin: 50,
      isRestDay: false,
      exercises: [
        createWorkoutExercise('overhead-barbell-press', 4, '8-10', 90, 1, 'Squeeze glutes and core to stabilize thoracic spine.'),
        createWorkoutExercise('dumbbell-lateral-raises', 4, '12-15', 60, 2, 'Lead with elbows in scapular plane for lateral delt width.'),
        createWorkoutExercise('hanging-leg-raises', 3, '12-15', 60, 3, 'Curl pelvis upward toward chest without swinging.')
      ]
    },
    {
      id: `day-fri-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 5,
      dayName: 'Friday',
      bodyPartFocus: 'Back & Posterior Chain',
      estimatedDurationMin: 55,
      isRestDay: false,
      exercises: [
        createWorkoutExercise('conventional-deadlift', 4, '5-8', 120, 1, 'Pull slack out of bar and drive floor away.'),
        createWorkoutExercise('pull-ups', 3, '8-12', 90, 2, 'Full dead hang to chin over bar.'),
        createWorkoutExercise('barbell-bicep-curl', 3, '10-12', 60, 3, 'Hypertrophy finisher.')
      ]
    },
    {
      id: `day-sat-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 6,
      dayName: 'Saturday',
      bodyPartFocus: 'Core & Cardio',
      estimatedDurationMin: 45,
      isRestDay: false,
      exercises: [
        createWorkoutExercise('hanging-leg-raises', 4, '15', 45, 1, 'Controlled cadence.'),
        createWorkoutExercise('rope-tricep-pushdown', 3, '15', 45, 2, 'High-volume pump.'),
        createWorkoutExercise('standing-calf-raises', 3, '20', 30, 3, 'Calf conditioning.')
      ]
    },
    {
      id: `day-sun-${uuidv4().slice(0, 6)}`,
      planId,
      dayOfWeek: 0,
      dayName: 'Sunday',
      bodyPartFocus: 'Rest & Recovery',
      estimatedDurationMin: 0,
      isRestDay: true,
      exercises: []
    }
  ];

  // Set back-references
  days.forEach(d => {
    d.exercises.forEach(e => {
      e.workoutDayId = d.id;
    });
  });

  return {
    id: planId,
    userId,
    weekStartDate: weekStart,
    title: `7-Day Body-Part Split (${goal.replace('_', ' ').toUpperCase()})`,
    goal,
    days,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}
