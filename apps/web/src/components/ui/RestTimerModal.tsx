'use client';

import React, { useEffect } from 'react';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { Timer, Plus, Minus, X, Check } from 'lucide-react';

export const RestTimerModal: React.FC = () => {
  const { activeSession, decrementRestTimer, stopRestTimer, startRestTimer } = useFitnessStore();

  useEffect(() => {
    if (!activeSession.isResting || activeSession.restRemainingSeconds <= 0) return;

    const interval = setInterval(() => {
      decrementRestTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession.isResting, activeSession.restRemainingSeconds, decrementRestTimer]);

  if (!activeSession.isResting || activeSession.restRemainingSeconds <= 0) return null;

  const mins = Math.floor(activeSession.restRemainingSeconds / 60);
  const secs = activeSession.restRemainingSeconds % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="p-4 bg-surface/95 backdrop-blur-2xl border border-cyan/40 rounded-2xl shadow-glow-cyan flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan">
          <Timer className="w-6 h-6 animate-pulse" />
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-cyan">Rest Countdown</div>
          <div className="text-2xl font-mono font-black text-white">{formattedTime}</div>
        </div>

        {/* Quick adjustments */}
        <div className="flex items-center space-x-1.5 pl-2 border-l border-surface-border">
          <button
            onClick={() => startRestTimer(activeSession.restRemainingSeconds + 30)}
            className="p-2 rounded-lg bg-surface hover:bg-surface-hover text-slate-300 text-xs font-bold border border-surface-border flex items-center space-x-0.5"
            title="+30 Seconds"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>30s</span>
          </button>

          <button
            onClick={stopRestTimer}
            className="p-2 rounded-lg bg-emerald hover:bg-emerald-dark text-slate-950 font-bold transition-colors"
            title="Skip Rest"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
