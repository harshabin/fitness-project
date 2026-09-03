'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MuscleMap2D } from '@/components/muscle-map/MuscleMap2D';
import { Layers, Sparkles, Box, Map, Info, Activity } from 'lucide-react';

const HumanModel3DViewer = dynamic(
  () => import('@/components/muscle-map/HumanModel3DViewer').then((mod) => mod.HumanModel3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[580px] rounded-3xl bg-surface/50 border border-surface-border flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-cyan/15 border border-cyan/30 flex items-center justify-center animate-pulse">
          <Layers className="w-6 h-6 text-cyan animate-spin" />
        </div>
        <p className="text-sm font-semibold text-slate-300">Loading 3D Anatomical Mannequin Engine...</p>
      </div>
    ),
  }
);

export default function MuscleMapPage() {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with 3D/2D View Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan/15 border border-cyan/30 text-cyan mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biomechanical Telemetry Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Anatomical Muscle Activation & Recovery Viewer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Inspect real-time muscle recovery readiness, weekly training stimulus volume, antagonist balance, and targeted exercises. Rotate in 360° or switch between 3D Mannequin and 2D Thermal map.
          </p>
        </div>

        {/* 3D vs 2D View Switcher */}
        <div className="flex items-center bg-surface-muted/90 p-1.5 rounded-2xl border border-surface-border self-start md:self-auto shadow-lg">
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === '3d'
                ? 'bg-cyan text-slate-950 shadow-glow-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>3D Interactive Model</span>
          </button>

          <button
            onClick={() => setViewMode('2d')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === '2d'
                ? 'bg-crimson text-white shadow-glow-crimson'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>2D Thermal Heatmap</span>
          </button>
        </div>
      </div>

      {/* Dynamic Viewport (3D Mannequin by default, 2D Heatmap available) */}
      {viewMode === '3d' ? (
        <HumanModel3DViewer />
      ) : (
        <MuscleMap2D />
      )}
    </div>
  );
}
