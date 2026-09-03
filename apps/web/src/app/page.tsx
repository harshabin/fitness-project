'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { MacroRing } from '@/components/ui/MacroRing';
import { 
  Flame, 
  Dumbbell, 
  Play, 
  Droplet, 
  Layers, 
  Sparkles, 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Award,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    user, 
    workoutPlan, 
    dietPlan, 
    dietSummary, 
    adherence, 
    startWorkout, 
    logWaterIntake, 
    initialize 
  } = useFitnessStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Determine today's workout
  const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  const todayWorkout = workoutPlan?.days.find(d => d.dayOfWeek === (dayIndex === 0 ? 0 : dayIndex)) || workoutPlan?.days[0];

  const targetCals = dietSummary?.targetCalories || user?.targetCalories || 2800;
  const consumedCals = dietSummary?.consumedCalories || 1450;
  const consumedProtein = dietSummary?.consumedMacros?.proteinG || 110;
  const targetProtein = dietPlan?.macroSplit?.proteinG || 160;
  const consumedCarbs = dietSummary?.consumedMacros?.carbsG || 165;
  const targetCarbs = dietPlan?.macroSplit?.carbsG || 320;
  const consumedFat = dietSummary?.consumedMacros?.fatG || 45;
  const targetFat = dietPlan?.macroSplit?.fatG || 75;

  const waterConsumed = dietSummary?.waterConsumedMl || 1750;
  const waterTarget = dietSummary?.waterTargetMl || 3000;
  const waterPct = Math.min(100, Math.round((waterConsumed / waterTarget) * 100));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome & Biometric HUD */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-surface via-surface-muted to-[#151D2A] border border-surface-border shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-crimson/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-16 w-64 h-64 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-crimson/20 border border-crimson/30 text-crimson">
              <Flame className="w-3.5 h-3.5" />
              <span>Goal: {user?.goal?.replace('_', ' ').toUpperCase() || 'MUSCLE GAIN'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">{user?.name || 'Athlete'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Your 7-day biomechanical plan is primed. Today focuses on <strong className="text-cyan">{todayWorkout?.bodyPartFocus || 'Upper Body'}</strong> with real-time visual activation tracking.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-surface/80 backdrop-blur-md border border-surface-border min-w-[110px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">BMR</span>
              <span className="text-lg font-black text-white">{user?.bmr || 1770} <span className="text-[10px] font-normal text-slate-400">kcal</span></span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface/80 backdrop-blur-md border border-surface-border min-w-[110px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TDEE</span>
              <span className="text-lg font-black text-cyan">{user?.tdee || 2744} <span className="text-[10px] font-normal text-slate-400">kcal</span></span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface/80 backdrop-blur-md border border-surface-border min-w-[110px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">BMI</span>
              <span className="text-lg font-black text-emerald">{user?.bmi || 24.0} <span className="text-[10px] font-normal text-slate-400">{user?.bmiCategory}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Workout + Daily Nutrition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Scheduled Session (7 Columns) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-surface/85 backdrop-blur-xl border border-surface-border shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-crimson">Today's Protocol</span>
              </div>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>~{todayWorkout?.estimatedDurationMin || 55} Mins</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {todayWorkout?.bodyPartFocus || 'Chest & Triceps'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {todayWorkout?.isRestDay 
                ? 'Scheduled active recovery day. Focus on hydration, mobility, and protein synthesis.'
                : `${todayWorkout?.exercises?.length || 3} exercises programmed with optimal mechanical tension.`}
            </p>

            {/* Exercise Preview List */}
            {!todayWorkout?.isRestDay && (
              <div className="mt-5 space-y-2.5">
                {todayWorkout?.exercises?.slice(0, 3).map((we, idx) => (
                  <div
                    key={we.id || idx}
                    className="p-3.5 rounded-2xl bg-surface-muted/50 border border-surface-border flex items-center justify-between hover:bg-surface-muted transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-surface flex items-center justify-center text-xs font-bold text-cyan border border-surface-border">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">{we.exercise?.name || 'Compound Exercise'}</div>
                        <div className="text-[11px] text-slate-400">{we.sets} sets × {we.targetReps} reps • {we.restSeconds}s rest</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-crimson/15 text-crimson border border-crimson/30 uppercase">
                      {we.exercise?.category || 'Chest'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-border">
            <Link
              href="/workouts"
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1 transition-colors"
            >
              <span>View Full 7-Day Split</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            {!todayWorkout?.isRestDay && (
              <Link
                href="/workouts/active"
                onClick={() => todayWorkout && startWorkout(todayWorkout.id)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-crimson to-crimson-dark text-white text-xs sm:text-sm font-extrabold shadow-glow-crimson hover:opacity-95 transition-opacity flex items-center space-x-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Workout (Visual Guide)</span>
              </Link>
            )}
          </div>
        </div>

        {/* Nutrition Overview & Macro Rings (5 Columns) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-surface/85 backdrop-blur-xl border border-surface-border shadow-2xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan">Daily Nutrition Rings</span>
              </div>
              <Link href="/diet" className="text-xs font-bold text-slate-400 hover:text-cyan transition-colors">
                Diet Hub &rarr;
              </Link>
            </div>

            {/* Macro Rings Grid */}
            <div className="grid grid-cols-3 gap-3 py-2">
              <MacroRing
                current={consumedProtein}
                target={targetProtein}
                label="Protein"
                unit="g"
                color="#FF2A4B"
                size={95}
                strokeWidth={7}
              />
              <MacroRing
                current={consumedCarbs}
                target={targetCarbs}
                label="Carbs"
                unit="g"
                color="#00F0FF"
                size={95}
                strokeWidth={7}
              />
              <MacroRing
                current={consumedFat}
                target={targetFat}
                label="Fats"
                unit="g"
                color="#FFB800"
                size={95}
                strokeWidth={7}
              />
            </div>

            {/* Calorie Bar */}
            <div className="mt-4 p-3.5 rounded-2xl bg-surface-muted/60 border border-surface-border space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Energy Consumed</span>
                <span className="font-bold text-white">{consumedCals} / <span className="text-slate-400">{targetCals} kcal</span></span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-crimson via-amber to-cyan rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (consumedCals / targetCals) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Water Logger Capsule */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan/10 to-transparent border border-cyan/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan/20 flex items-center justify-center text-cyan">
                <Droplet className="w-5 h-5 fill-cyan" />
              </div>
              <div>
                <span className="text-xs font-bold text-white">{waterConsumed} / {waterTarget} ml</span>
                <div className="text-[10px] text-cyan font-medium">{waterPct}% Hydration Target</div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => logWaterIntake(250)}
                className="px-2.5 py-1.5 rounded-xl bg-cyan/20 hover:bg-cyan text-cyan hover:text-slate-950 text-xs font-bold border border-cyan/40 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>250ml</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row: 2D Anatomical Explorer Teaser + Adherence Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 2D Muscle Activation Banner (8 Columns) */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-surface to-[#101826] border border-cyan/30 shadow-glow-cyan relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:12px_12px]" />

          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan/20 border border-cyan/40 text-cyan">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive 2D Anatomical Heatmap</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Biomechanical Muscle Activation & Fatigue Matrix
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Explore the anterior and posterior anatomical diagram. Inspect muscle recovery readiness, weekly training volume, and direct exercise links.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <Link
              href="/muscle-map"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan text-slate-950 text-xs sm:text-sm font-bold shadow-glow-cyan hover:bg-cyan-dark transition-colors"
            >
              <span>Launch Muscle Anatomy Explorer</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Adherence Telemetry (4 Columns) */}
        <div className="md:col-span-4 p-6 rounded-3xl bg-surface/85 backdrop-blur-xl border border-surface-border shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-emerald" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald">Compliance Score</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Last 7 Days</span>
          </div>

          <div className="text-center py-2">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald via-cyan to-white">
              {adherence?.overallScore || 88}%
            </div>
            <span className="text-xs font-semibold text-slate-400 mt-1 block">Elite Adherence Tier</span>
          </div>

          <div className="space-y-2 pt-2 border-t border-surface-border text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Workouts Logged</span>
              <strong className="text-white">{adherence?.totalWorkoutsCompleted || 4} / 5 sessions</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total Volume Lifted</span>
              <strong className="text-cyan">{(adherence?.totalVolumeKgLifted || 18450).toLocaleString()} kg</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
