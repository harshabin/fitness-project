'use client';

import React, { useState } from 'react';
import { MuscleGroupId } from '@fithealth/types';
import { MUSCLE_GROUPS_REGISTRY } from '@fithealth/three-scenes';
import { 
  Activity, 
  Flame, 
  Dumbbell, 
  ChevronRight, 
  RotateCw, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import Link from 'next/link';

interface MuscleMap2DProps {
  onMuscleSelect?: (muscleId: MuscleGroupId) => void;
  className?: string;
}

interface MuscleRegion {
  id: MuscleGroupId;
  label: string;
  category: 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Core';
  view: 'front' | 'back';
  x: number; // percentage on diagram
  y: number; // percentage on diagram
  width: number;
  height: number;
  pathD?: string;
}

const MUSCLE_REGIONS: MuscleRegion[] = [
  // Front View
  { id: 'chest_upper', label: 'Upper Chest', category: 'Chest', view: 'front', x: 38, y: 22, width: 24, height: 7 },
  { id: 'chest_mid', label: 'Mid Chest', category: 'Chest', view: 'front', x: 36, y: 28, width: 28, height: 8 },
  { id: 'chest_lower', label: 'Lower Chest', category: 'Chest', view: 'front', x: 38, y: 35, width: 24, height: 6 },
  { id: 'deltoids_front', label: 'Front Delts', category: 'Shoulders', view: 'front', x: 26, y: 20, width: 11, height: 10 },
  { id: 'deltoids_side', label: 'Side Delts', category: 'Shoulders', view: 'front', x: 22, y: 24, width: 9, height: 11 },
  { id: 'biceps', label: 'Biceps', category: 'Arms', view: 'front', x: 21, y: 34, width: 10, height: 12 },
  { id: 'forearms', label: 'Forearms', category: 'Arms', view: 'front', x: 17, y: 46, width: 9, height: 14 },
  { id: 'abs', label: 'Abs (Core)', category: 'Core', view: 'front', x: 42, y: 40, width: 16, height: 16 },
  { id: 'obliques', label: 'Obliques', category: 'Core', view: 'front', x: 34, y: 42, width: 8, height: 14 },
  { id: 'quadriceps', label: 'Quadriceps (Quads)', category: 'Legs', view: 'front', x: 36, y: 58, width: 28, height: 20 },
  { id: 'calves', label: 'Calves (Shins)', category: 'Legs', view: 'front', x: 38, y: 80, width: 24, height: 14 },

  // Back View
  { id: 'traps', label: 'Trapezius (Traps)', category: 'Back', view: 'back', x: 38, y: 17, width: 24, height: 11 },
  { id: 'rhomboids', label: 'Rhomboids', category: 'Back', view: 'back', x: 40, y: 26, width: 20, height: 10 },
  { id: 'lats', label: 'Lats (Latissimus)', category: 'Back', view: 'back', x: 34, y: 32, width: 32, height: 14 },
  { id: 'deltoids_rear', label: 'Rear Delts', category: 'Shoulders', view: 'back', x: 25, y: 20, width: 11, height: 10 },
  { id: 'triceps', label: 'Triceps', category: 'Arms', view: 'back', x: 20, y: 31, width: 10, height: 14 },
  { id: 'lower_back', label: 'Lower Back', category: 'Back', view: 'back', x: 42, y: 43, width: 16, height: 10 },
  { id: 'glutes', label: 'Gluteus (Glutes)', category: 'Legs', view: 'back', x: 36, y: 51, width: 28, height: 13 },
  { id: 'hamstrings', label: 'Hamstrings', category: 'Legs', view: 'back', x: 37, y: 65, width: 26, height: 16 },
  { id: 'calves', label: 'Calves (Gastrocnemius)', category: 'Legs', view: 'back', x: 38, y: 81, width: 24, height: 14 },
];

export const MuscleMap2D: React.FC<MuscleMap2DProps> = ({ onMuscleSelect, className = '' }) => {
  const [selectedMuscleId, setSelectedMuscleId] = useState<MuscleGroupId>('chest_mid');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

  const mockRecoveryData: Record<string, number> = {
    chest_mid: 92,
    chest_upper: 90,
    chest_lower: 88,
    lats: 78,
    traps: 85,
    rhomboids: 80,
    lower_back: 75,
    deltoids_front: 85,
    deltoids_side: 70,
    deltoids_rear: 82,
    biceps: 95,
    triceps: 60,
    forearms: 90,
    quadriceps: 88,
    hamstrings: 90,
    glutes: 82,
    abs: 100,
    obliques: 92,
    calves: 95
  };

  const selectedMuscleInfo = MUSCLE_GROUPS_REGISTRY[selectedMuscleId] || MUSCLE_GROUPS_REGISTRY.chest_mid;
  const recoveryPct = mockRecoveryData[selectedMuscleId] || 85;

  const handleMuscleClick = (id: MuscleGroupId) => {
    setSelectedMuscleId(id);
    if (onMuscleSelect) onMuscleSelect(id);
  };

  const getRecoveryColor = (pct: number) => {
    if (pct >= 90) return { bg: 'bg-emerald/20', text: 'text-emerald', border: 'border-emerald/50', hex: '#00E676' };
    if (pct >= 75) return { bg: 'bg-cyan/20', text: 'text-cyan', border: 'border-cyan/50', hex: '#00F0FF' };
    if (pct >= 55) return { bg: 'bg-amber/20', text: 'text-amber', border: 'border-amber/50', hex: '#FFB800' };
    return { bg: 'bg-crimson/20', text: 'text-crimson', border: 'border-crimson/50', hex: '#FF2A4B' };
  };

  const visibleRegions = MUSCLE_REGIONS.filter(
    (r) => r.view === currentView && (activeCategory === 'All' || r.category === activeCategory)
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      {/* 2D Anatomical Map Viewport (8 Columns) */}
      <div className="lg:col-span-8 relative bg-gradient-to-b from-[#0B0F17] via-[#070A0F] to-[#040609] rounded-3xl border border-surface-border p-6 shadow-2xl flex flex-col justify-between overflow-hidden min-h-[560px]">
        {/* Top Controls: Filter Badges & View Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
          {/* Category Filter Badges */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan text-slate-950 shadow-glow-cyan font-bold'
                    : 'bg-surface/70 text-slate-300 hover:bg-surface border border-surface-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Front / Back Toggle Buttons */}
          <div className="flex items-center bg-surface-muted/90 rounded-2xl p-1 border border-surface-border text-xs">
            <button
              onClick={() => setCurrentView('front')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                currentView === 'front'
                  ? 'bg-crimson text-white shadow-glow-crimson'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Anterior (Front)
            </button>
            <button
              onClick={() => setCurrentView('back')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                currentView === 'back'
                  ? 'bg-crimson text-white shadow-glow-crimson'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Posterior (Back)
            </button>
          </div>
        </div>

        {/* Center 2D Anatomical Schematic Silhouette */}
        <div className="relative flex-1 flex items-center justify-center my-2">
          {/* Background Radial Glow */}
          <div className="absolute w-72 h-72 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

          {/* SVG Silhouette Schematic with interactive muscle zones */}
          <div className="relative w-full max-w-[360px] h-[460px] bg-surface/30 rounded-3xl border border-surface-border/80 p-4 flex items-center justify-center">
            {/* Base Human Outline Graphic */}
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full text-slate-700 select-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Head */}
              <ellipse cx="100" cy="35" rx="18" ry="24" className="fill-slate-900/80 stroke-slate-700" />
              {/* Neck */}
              <path d="M92 58 L92 70 M108 58 L108 70" stroke="currentColor" />
              
              {/* Torso Outline */}
              <path
                d="M70 70 C70 70, 50 85, 45 130 C40 170, 55 190, 55 190 L65 230 L80 230 L85 360 L100 360 L115 360 L120 230 L135 230 L145 190 C145 190, 160 170, 155 130 C150 85, 130 70, 130 70 Z"
                className="fill-slate-950/90 stroke-slate-800"
              />
              
              {/* Arms */}
              <path d="M45 130 L30 190 L22 250" strokeWidth="6" strokeLinecap="round" className="stroke-slate-800" />
              <path d="M155 130 L170 190 L178 250" strokeWidth="6" strokeLinecap="round" className="stroke-slate-800" />

              {/* Legs */}
              <path d="M80 230 L75 310 L72 385" strokeWidth="12" strokeLinecap="round" className="stroke-slate-900" />
              <path d="M120 230 L125 310 L128 385" strokeWidth="12" strokeLinecap="round" className="stroke-slate-900" />
            </svg>

            {/* Clickable 2D Muscle Region Badges on the Silhouette */}
            <div className="absolute inset-0 p-4">
              {visibleRegions.map((region) => {
                const isSelected = selectedMuscleId === region.id;
                const rec = mockRecoveryData[region.id] || 85;
                const colors = getRecoveryColor(rec);

                return (
                  <button
                    key={`${region.id}-${region.label}`}
                    onClick={() => handleMuscleClick(region.id)}
                    style={{
                      left: `${region.x}%`,
                      top: `${region.y}%`,
                      width: `${region.width}%`,
                      height: `${region.height}%`
                    }}
                    className={`absolute rounded-xl transition-all flex flex-col items-center justify-center p-1 text-[10px] font-bold border ${
                      isSelected
                        ? 'bg-crimson text-white border-white shadow-glow-crimson scale-110 z-20'
                        : `${colors.bg} ${colors.text} ${colors.border} hover:scale-105 hover:z-10 backdrop-blur-sm`
                    }`}
                    title={`${region.label} — ${rec}% Recovered`}
                  >
                    <span className="truncate max-w-full">{region.label}</span>
                    <span className="text-[9px] font-extrabold opacity-90">{rec}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-border text-xs text-slate-300">
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="font-bold text-slate-400">Recovery Heatmap:</span>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald shadow-glow-emerald" />
              <span>Ready (90%+)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan" />
              <span>Optimal (75-89%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber" />
              <span>Recovering (55-74%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
              <span>Fatigued (&lt;55%)</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Tap any muscle region to inspect telemetry</span>
        </div>
      </div>

      {/* Muscle Detail Telemetry Inspector Card (4 Columns) */}
      <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-surface/90 backdrop-blur-xl rounded-3xl border border-surface-border shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan/15 text-cyan border border-cyan/30">
                {selectedMuscleInfo.category} Group
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {selectedMuscleInfo.id}</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">{selectedMuscleInfo.name}</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedMuscleInfo.description}</p>
          </div>

          {/* Recovery Status Gauge */}
          <div className="p-4 rounded-2xl bg-surface-muted/60 border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-200">
                <Activity className="w-4 h-4 text-emerald" />
                <span>Recovery Readiness</span>
              </div>
              <span className="text-sm font-bold text-emerald">{recoveryPct}% Primed</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan to-emerald rounded-full transition-all duration-700"
                style={{ width: `${recoveryPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Weekly Sets Logged: <strong className="text-white">16 sets</strong></span>
              <span>Optimal Window: <strong className="text-cyan">12-20 sets</strong></span>
            </div>
          </div>

          {/* Antagonist Muscle Balance Note */}
          {selectedMuscleInfo.antagonistId && (
            <div className="p-3.5 rounded-xl bg-cyan/10 border border-cyan/30 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-cyan">Antagonist Balance: </strong>
                Pair training with{' '}
                <span className="text-white font-semibold capitalize">
                  {selectedMuscleInfo.antagonistId.replace('_', ' ')}
                </span>{' '}
                to prevent muscular imbalances.
              </div>
            </div>
          )}

          {/* Targeting Exercises */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-crimson" />
              <span>Recommended Target Exercises</span>
            </h4>

            <div className="space-y-2">
              {selectedMuscleInfo.relatedExerciseIds.map((exId) => (
                <div
                  key={exId}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-muted/40 hover:bg-surface-muted border border-surface-border/80 transition-colors"
                >
                  <span className="text-xs font-medium text-slate-200 capitalize">
                    {exId.replace(/-/g, ' ')}
                  </span>
                  <Link
                    href={`/workouts`}
                    className="p-1 rounded-lg bg-surface hover:bg-crimson hover:text-white text-slate-400 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-surface-border">
          <Link
            href="/workouts"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-crimson to-crimson-dark text-white text-sm font-bold shadow-glow-crimson hover:opacity-95 transition-opacity flex items-center justify-center space-x-2"
          >
            <Flame className="w-4 h-4" />
            <span>Train {selectedMuscleInfo.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
