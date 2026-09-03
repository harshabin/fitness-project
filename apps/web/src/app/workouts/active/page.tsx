'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { Exercise2DViewer } from '@/components/exercise/Exercise2DViewer';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Timer, 
  Flame, 
  Dumbbell, 
  CheckCircle2, 
  ArrowLeft,
  RefreshCw,
  Sparkles,
  Trophy
} from 'lucide-react';
import Link from 'next/link';

export default function ActiveWorkoutHUD() {
  const router = useRouter();
  const { 
    activeSession, 
    workoutPlan, 
    nextExercise, 
    prevExercise, 
    logSet, 
    startRestTimer, 
    finishWorkout 
  } = useFitnessStore();

  const [elapsed, setElapsed] = useState(0);
  const [activeSets, setActiveSets] = useState<{ weight: number; reps: number; done: boolean }[]>([]);
  const [showFinishedModal, setShowFinishedModal] = useState(false);

  // Timer interval for total workout duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDay = workoutPlan?.days.find(d => d.id === activeSession.activeWorkoutDayId) || workoutPlan?.days[0];
  const exercises = currentDay?.exercises || [];
  const currentWorkoutExercise = exercises[activeSession.currentExerciseIndex] || exercises[0];
  const exercise = currentWorkoutExercise?.exercise;

  // Initialize sets for current exercise
  useEffect(() => {
    if (!currentWorkoutExercise) return;
    const numSets = currentWorkoutExercise.sets || 3;
    const targetRepsNum = parseInt(currentWorkoutExercise.targetReps) || 10;

    const saved = activeSession.completedSetsMap[currentWorkoutExercise.exerciseId] || [];
    const sets = Array.from({ length: numSets }, (_, i) => ({
      weight: saved[i]?.weightKg || 60,
      reps: saved[i]?.reps || targetRepsNum,
      done: saved[i]?.completed || false
    }));

    setActiveSets(sets);
  }, [currentWorkoutExercise, activeSession.completedSetsMap]);

  const handleToggleSet = (index: number) => {
    const updated = [...activeSets];
    const isNowDone = !updated[index].done;
    updated[index].done = isNowDone;
    setActiveSets(updated);

    if (exercise) {
      logSet(exercise.id, index, updated[index].weight, updated[index].reps);
    }

    if (isNowDone) {
      // Trigger rest timer
      startRestTimer(currentWorkoutExercise?.restSeconds || 60);
    }
  };

  const handleFinish = async () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowFinishedModal(true);
  };

  const confirmFinish = async () => {
    await finishWorkout();
    router.push('/');
  };

  const formatElapsed = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!exercise) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No active workout selected.</h2>
        <Link href="/workouts" className="px-5 py-2.5 rounded-xl bg-crimson text-white text-xs font-bold inline-block">
          Choose a Workout Split
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Session HUD Bar */}
      <div className="p-4 rounded-2xl bg-surface/90 backdrop-blur-xl border border-surface-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Link
            href="/workouts"
            className="p-2 rounded-xl bg-surface-muted hover:bg-surface-hover text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald">Live Workout In Progress</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">{currentDay?.bodyPartFocus}</h2>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Elapsed Timer */}
          <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-surface-muted border border-surface-border text-cyan">
            <Timer className="w-4 h-4" />
            <span className="font-mono font-bold text-xs sm:text-sm text-white">{formatElapsed(elapsed)}</span>
          </div>

          {/* Finish Button */}
          <button
            onClick={handleFinish}
            className="px-4 py-2 rounded-xl bg-emerald hover:bg-emerald-dark text-slate-950 text-xs font-extrabold shadow-glow-emerald transition-all flex items-center space-x-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish Workout</span>
          </button>
        </div>
      </div>

      {/* Main HUD Grid: 2D Visualizer (6 Cols) + Set Logger (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 2D Visualizer (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Exercise {activeSession.currentExerciseIndex + 1} of {exercises.length}
              </span>
              <h3 className="text-xl font-extrabold text-white">{exercise.name}</h3>
            </div>

            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-crimson/15 text-crimson border border-crimson/30 uppercase">
              {exercise.difficulty}
            </span>
          </div>

          <Exercise2DViewer
            exerciseId={exercise.id}
            exerciseName={exercise.name}
            category={exercise.category}
            equipment={exercise.equipment}
            difficulty={exercise.difficulty}
            fallbackMediaUrl={exercise.fallbackMediaUrl}
            instructions={exercise.instructions}
            tips={exercise.tips}
            commonMistakes={exercise.commonMistakes}
          />
        </div>

        {/* Live Set & Reps Logger (6 Columns) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-surface/90 backdrop-blur-xl border border-surface-border shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div>
                <h4 className="text-base font-bold text-white">Target Protocol</h4>
                <p className="text-xs text-slate-400">
                  {currentWorkoutExercise.sets} sets • {currentWorkoutExercise.targetReps} reps • {currentWorkoutExercise.restSeconds}s rest
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-cyan/15 text-cyan border border-cyan/30">
                Overload Engine
              </span>
            </div>

            {/* Set Table Rows */}
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                <div className="col-span-2">Set</div>
                <div className="col-span-4">Weight (kg)</div>
                <div className="col-span-4">Reps</div>
                <div className="col-span-2 text-center">Done</div>
              </div>

              {activeSets.map((set, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl border transition-all ${
                    set.done
                      ? 'bg-emerald/10 border-emerald/40 text-white'
                      : 'bg-surface-muted/50 border-surface-border text-slate-200'
                  }`}
                >
                  <div className="col-span-2 font-bold text-xs pl-2">#{idx + 1}</div>

                  <div className="col-span-4">
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const copy = [...activeSets];
                        copy[idx].weight = val;
                        setActiveSets(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-surface border border-surface-border text-xs font-bold text-white focus:outline-none focus:border-cyan text-center"
                    />
                  </div>

                  <div className="col-span-4">
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const copy = [...activeSets];
                        copy[idx].reps = val;
                        setActiveSets(copy);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-surface border border-surface-border text-xs font-bold text-white focus:outline-none focus:border-cyan text-center"
                    />
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() => handleToggleSet(idx)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        set.done
                          ? 'bg-emerald text-slate-950 shadow-glow-emerald font-black scale-105'
                          : 'bg-surface hover:bg-surface-hover text-slate-400 border border-surface-border'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cue notes */}
            {currentWorkoutExercise.notes && (
              <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-surface-border text-xs text-slate-300">
                <strong className="text-cyan">Coach Note: </strong>
                {currentWorkoutExercise.notes}
              </div>
            )}
          </div>

          {/* Exercise Step Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-border">
            <button
              onClick={prevExercise}
              disabled={activeSession.currentExerciseIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-surface-muted hover:bg-surface border border-surface-border text-xs font-bold text-slate-300 disabled:opacity-40 flex items-center space-x-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Exercise</span>
            </button>

            <button
              onClick={nextExercise}
              disabled={activeSession.currentExerciseIndex >= exercises.length - 1}
              className="px-5 py-2.5 rounded-xl bg-cyan text-slate-950 text-xs font-bold shadow-glow-cyan hover:bg-cyan-dark transition-colors disabled:opacity-40 flex items-center space-x-1.5"
            >
              <span>Next Exercise</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showFinishedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full p-8 rounded-3xl bg-surface border border-emerald/50 shadow-glow-emerald text-center space-y-6 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald/20 border border-emerald/40 text-emerald flex items-center justify-center mx-auto shadow-glow-emerald">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">Workout Crushed!</h3>
              <p className="text-xs text-slate-300">
                Your progressive overload volume and set analytics have been synced to your profile.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-muted border border-surface-border grid grid-cols-2 gap-3 text-left">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Duration</span>
                <div className="text-sm font-bold text-white">{formatElapsed(elapsed)}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Focus</span>
                <div className="text-sm font-bold text-cyan">{currentDay?.bodyPartFocus}</div>
              </div>
            </div>

            <button
              onClick={confirmFinish}
              className="w-full py-3.5 rounded-2xl bg-emerald text-slate-950 font-black text-sm shadow-glow-emerald hover:bg-emerald-dark transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
