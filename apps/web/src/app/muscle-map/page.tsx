'use client';

import React from 'react';
import { MuscleMap2D } from '@/components/muscle-map/MuscleMap2D';
import { Layers, Sparkles, Activity, ShieldCheck } from 'lucide-react';

export default function MuscleMapPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan/15 border border-cyan/30 text-cyan mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Anatomical Telemetry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Interactive 2D Muscle Activation & Recovery Map
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Interact with the anterior and posterior anatomical body heatmap. Tap any muscle group to inspect recovery readiness, weekly training volume, antagonist muscle balance, and recommended exercises.
        </p>
      </div>

      {/* Main 2D Muscle Map Component */}
      <MuscleMap2D />
    </div>
  );
}
