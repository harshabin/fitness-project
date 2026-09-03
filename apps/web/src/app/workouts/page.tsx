'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { Exercise2DViewer } from '@/components/exercise/Exercise2DViewer';
import { WorkoutDay, Exercise } from '@fithealth/types';
import { Dumbbell, Play, Clock, Sparkles, ChevronRight, Eye, ShieldCheck, RefreshCw, Flame } from 'lucide-react';

export default function WorkoutsPage() {
  const { workoutPlan, startWorkout, initialize } = useFitnessStore();
  const [selectedDayId, setSelectedDayId] = useState<string>('');
  const [previewExercise, setPreviewExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (workoutPlan?.days?.length && !selectedDayId) {
      const todayNum = new Date().getDay();
      const currentDay = workoutPlan.days.find(d => d.dayOfWeek === todayNum) || workoutPlan.days[0];
      setSelectedDayId(currentDay.id);
      if (currentDay.exercises?.length) {
        setPreviewExercise(currentDay.exercises[0].exercise);
      }
    }
  }, [workoutPlan, selectedDayId]);

  const activeDay = workoutPlan?.days.find(d => d.id === selectedDayId) || workoutPlan?.days[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-crimson/15 border border-crimson/30 text-crimson mb-2">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>7-Day Body-Part Split</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {workoutPlan?.title || 'Hypertrophy Body-Part Split'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Engineered for progressive overload, mechanical tension, and systematic muscle group recovery.
          </p>
        </div>

        {activeDay && !activeDay.isRestDay && (
          <Link
            href="/workouts/active"
            onClick={() => startWorkout(activeDay.id)}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-crimson to-crimson-dark text-white font-extrabold text-xs sm:text-sm shadow-glow-crimson hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch {activeDay.dayName} Workout</span>
          </Link>
        )}
      </div>

      {/* 7-Day Day Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {workoutPlan?.days.map((day) => {
          const isSelected = day.id === selectedDayId;

          return (
            <button
              key={day.id}
              onClick={() => {
                setSelectedDayId(day.id);
                if (day.exercises?.length) {
                  setPreviewExercise(day.exercises[0].exercise);
                } else {
                  setPreviewExercise(null);
                }
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                isSelected
                  ? 'bg-gradient-to-b from-crimson/25 to-surface border-crimson/50 shadow-glow-crimson'
                  : 'bg-surface/80 hover:bg-surface border-surface-border text-slate-400'
              }`}
            >
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                  isSelected ? 'text-crimson' : 'text-slate-500'
                }`}>
                  {day.dayName}
                </span>
                <span className="text-xs font-bold text-white line-clamp-1 mt-0.5">
                  {day.bodyPartFocus}
                </span>
              </div>

              <div className="text-[10px] text-slate-400 font-medium mt-2">
                {day.isRestDay ? 'Recovery' : `${day.exercises?.length || 0} exercises`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Content: Exercise List (6 Cols) + 3D Biomechanics Demonstrator (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Exercise List (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
              <span>{activeDay?.dayName} Protocol — {activeDay?.bodyPartFocus}</span>
            </h3>
            <span className="text-xs text-slate-400 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeDay?.estimatedDurationMin || 55} Mins</span>
            </span>
          </div>

          {activeDay?.isRestDay ? (
            <div className="p-8 rounded-3xl bg-surface/80 border border-surface-border text-center space-y-3">
              <Sparkles className="w-8 h-8 text-cyan mx-auto" />
              <h4 className="text-base font-bold text-white">Scheduled Active Recovery</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No lifting session today. Give your muscular fibers and central nervous system time to recover and synthesize new protein.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeDay?.exercises?.map((we, index) => {
                const isSelected = previewExercise?.id === we.exercise?.id;

                return (
                  <div
                    key={we.id}
                    onClick={() => setPreviewExercise(we.exercise)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-surface border-cyan shadow-glow-cyan'
                        : 'bg-surface/80 hover:bg-surface border-surface-border'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-cyan text-slate-950 shadow-sm' : 'bg-surface-muted text-slate-300 border border-surface-border'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{we.exercise?.name}</h4>
                          <div className="text-xs text-slate-400 mt-0.5">
                            {we.sets} sets × {we.targetReps} reps • {we.restSeconds}s rest
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-crimson/15 text-crimson border border-crimson/30 uppercase">
                          {we.exercise?.equipment}
                        </span>
                      </div>
                    </div>

                    {/* Muscle activation badge pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-surface-border/60">
                      {we.exercise?.targetMusclePrimary?.map((m) => (
                        <span key={m} className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-crimson/20 text-crimson">
                          Primary: {m.replace('_', ' ')}
                        </span>
                      ))}
                      {we.exercise?.targetMuscleSecondary?.map((m) => (
                        <span key={m} className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-amber/20 text-amber">
                          Secondary: {m.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2D Exercise Visual Guide & Form Cue Panel (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Eye className="w-4 h-4 text-cyan" />
              <span>Exercise Visual Guide & Technique</span>
            </h3>
            <span className="text-xs text-cyan font-mono">2D Reference</span>
          </div>

          {previewExercise ? (
            <div className="space-y-4">
              <Exercise2DViewer
                exerciseId={previewExercise.id}
                exerciseName={previewExercise.name}
                category={previewExercise.category}
                equipment={previewExercise.equipment}
                difficulty={previewExercise.difficulty}
                fallbackMediaUrl={previewExercise.fallbackMediaUrl}
                instructions={previewExercise.instructions}
                tips={previewExercise.tips}
                commonMistakes={previewExercise.commonMistakes}
              />

              {/* Form & Biomechanical Cues */}
              <div className="p-5 rounded-2xl bg-surface/90 border border-surface-border space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan" />
                  <span>Key Execution Checklist & Cues</span>
                </h4>

                <ul className="space-y-2 text-xs text-slate-300">
                  {previewExercise.instructions.map((ins, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-4 h-4 rounded-full bg-surface-muted border border-surface-border text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-[380px] rounded-2xl bg-surface/60 border border-surface-border flex items-center justify-center text-slate-400 text-xs">
              Select an exercise on the left to view reference photo and form cues.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
