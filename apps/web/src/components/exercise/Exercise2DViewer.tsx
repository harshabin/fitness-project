'use client';

import React, { useState } from 'react';
import { MuscleActivationMap } from '@fithealth/types';
import { getExerciseVisual } from '@/lib/exerciseImages';
import { 
  Camera, 
  Maximize2, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Dumbbell, 
  Flame, 
  Activity, 
  ShieldCheck, 
  Sparkles,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';

interface Exercise2DViewerProps {
  exerciseId?: string;
  exerciseName?: string;
  category?: string;
  equipment?: string;
  difficulty?: string;
  muscleActivations?: MuscleActivationMap;
  fallbackMediaUrl?: string;
  instructions?: string[];
  tips?: string[];
  commonMistakes?: string[];
  className?: string;
}

export const Exercise2DViewer: React.FC<Exercise2DViewerProps> = ({
  exerciseId = 'barbell-bench-press',
  exerciseName = 'Exercise Demonstration',
  category,
  equipment = 'barbell',
  difficulty = 'intermediate',
  muscleActivations = {},
  fallbackMediaUrl,
  instructions = [],
  tips = [],
  commonMistakes = [],
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'cues' | 'muscles'>('photo');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const visualData = getExerciseVisual(exerciseId, fallbackMediaUrl);
  const displayImage = !imageError ? (fallbackMediaUrl || visualData.imageUrl) : visualData.imageUrl;

  return (
    <div className={`relative w-full rounded-2xl bg-gradient-to-b from-surface via-surface-muted to-[#070A0F] border border-surface-border overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header Strip */}
      <div className="p-4 border-b border-surface-border flex flex-wrap items-center justify-between gap-2 bg-surface/90 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-cyan/15 border border-cyan/40 text-cyan shadow-glow-cyan flex items-center space-x-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>2D Biomechanical Reference</span>
          </span>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-crimson/15 text-crimson border border-crimson/30">
            {equipment}
          </span>
        </div>

        {/* View Tabs */}
        <div className="flex items-center bg-surface-muted rounded-xl p-1 border border-surface-border text-xs">
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === 'photo'
                ? 'bg-cyan text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Visual Reference
          </button>
          <button
            onClick={() => setActiveTab('cues')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === 'cues'
                ? 'bg-cyan text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Form & Cues
          </button>
          <button
            onClick={() => setActiveTab('muscles')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeTab === 'muscles'
                ? 'bg-cyan text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Muscles
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-4 sm:p-5">
        {/* Tab 1: Photo Reference */}
        {activeTab === 'photo' && (
          <div className="space-y-4 animate-fadeIn">
            {/* 2D Photo Container */}
            <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-surface-border bg-slate-950 group">
              <img
                src={displayImage}
                alt={exerciseName}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent pointer-events-none" />

              {/* Bottom Photo Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
                <div className="pointer-events-auto max-w-[80%]">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-900/80 backdrop-blur-md text-cyan border border-cyan/40 mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Reference Angle</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white line-clamp-1 drop-shadow-md">
                    {exerciseName}
                  </h4>
                </div>

                <button
                  onClick={() => setIsZoomModalOpen(true)}
                  className="pointer-events-auto p-2 rounded-xl bg-surface/80 hover:bg-surface text-slate-200 border border-surface-border backdrop-blur-md transition-all hover:scale-105"
                  title="Expand Full Photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Form Key Cue Banner */}
            <div className="p-3.5 rounded-xl bg-surface-muted/70 border border-surface-border flex items-start space-x-3">
              <div className="w-6 h-6 rounded-lg bg-cyan/15 border border-cyan/30 text-cyan flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs text-slate-300">
                <strong className="text-cyan font-bold">Key Execution Cue: </strong>
                {visualData.executionKeyCue}
              </div>
            </div>

            {/* Targeted Muscle Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Primary Focus:</span>
              {visualData.primaryMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-crimson/15 text-crimson border border-crimson/40 shadow-glow-crimson"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse mr-1.5" />
                  {muscle}
                </span>
              ))}
              {visualData.secondaryMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-amber/15 text-amber border border-amber/40"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber mr-1.5" />
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Form & Execution Cues */}
        {activeTab === 'cues' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Step-by-Step Instructions */}
            <div className="p-4 rounded-xl bg-surface-muted/50 border border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-cyan" />
                  <span>Biomechanical Execution Protocol</span>
                </h4>
                <span className="text-[11px] font-mono text-slate-400">Tempo: {visualData.tempoAdvice}</span>
              </div>

              <div className="space-y-2.5">
                {(instructions.length > 0 ? instructions : [
                  'Position your body with firm foundational stability before starting.',
                  'Initiate movement from the primary target muscle group with controlled eccentric cadence.',
                  'Drive through the full range of motion, achieving peak contraction at the apex.',
                  'Lower under 2-3 seconds controlled negative stretch.'
                ]).map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-lg bg-cyan/15 text-cyan border border-cyan/30 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes & Safety */}
            {(commonMistakes.length > 0 || tips.length > 0) && (
              <div className="p-4 rounded-xl bg-crimson/10 border border-crimson/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-crimson flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-crimson" />
                  <span>Common Mistakes & Joint Safety</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {(commonMistakes.length > 0 ? commonMistakes : tips).map((mistake, i) => (
                    <li key={i} className="leading-relaxed">
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Muscle Matrix */}
        {activeTab === 'muscles' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-xl bg-surface-muted/50 border border-surface-border space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Primary Target Drivers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {visualData.primaryMuscles.map((m, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-crimson/20 border border-crimson/40 text-crimson text-xs font-bold flex items-center space-x-2 shadow-glow-crimson"
                    >
                      <span className="w-2 h-2 rounded-full bg-crimson" />
                      <span>{m}</span>
                      <span className="text-[10px] opacity-80 uppercase ml-1">(Primary)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Synergists & Stabilizers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {visualData.secondaryMuscles.map((m, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-amber/15 border border-amber/30 text-amber text-xs font-semibold flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                      <span>{m}</span>
                      <span className="text-[10px] opacity-75 uppercase ml-1">(Synergist)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Zoom Photo Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-surface rounded-3xl border border-surface-border overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-surface-border flex items-center justify-between bg-surface-muted/80">
              <div className="flex items-center space-x-2">
                <Dumbbell className="w-4 h-4 text-cyan" />
                <h3 className="text-sm font-bold text-white">{exerciseName} — High-Res Reference</h3>
              </div>
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 rounded-xl bg-surface hover:bg-surface-hover text-slate-300 border border-surface-border transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60">
              <img
                src={displayImage}
                alt={exerciseName}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            <div className="p-4 border-t border-surface-border bg-surface-muted/80 flex items-center justify-between text-xs text-slate-300">
              <span><strong>Category:</strong> {visualData.targetCategory}</span>
              <span><strong>Primary:</strong> {visualData.primaryMuscles.join(', ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
