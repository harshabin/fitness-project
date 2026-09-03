'use client';

import React from 'react';
import Link from 'next/link';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { Flame, Droplet, User, Bell, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, adherence, dietSummary } = useFitnessStore();

  const streak = adherence?.activeStreakDays || 5;
  const water = dietSummary?.waterConsumedMl || 2000;

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#070A0E]/85 backdrop-blur-xl border-b border-surface-border px-4 sm:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-crimson to-crimson-dark flex items-center justify-center shadow-glow-crimson group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan transition-colors">
              Fit<span className="text-crimson">Health</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Fitness Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Right Stats & Profile Badges */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Streak Counter */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber/10 border border-amber/30 text-amber shadow-sm">
          <Flame className="w-4 h-4 fill-amber animate-pulse" />
          <span className="text-xs font-bold">{streak} Day Streak</span>
        </div>

        {/* Quick Water Indicator */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan/10 border border-cyan/30 text-cyan">
          <Droplet className="w-4 h-4 fill-cyan" />
          <span className="text-xs font-bold">{(water / 1000).toFixed(1)}L Water</span>
        </div>

        {/* User Profile Pill */}
        <Link
          href="/onboarding"
          className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-full bg-surface-muted hover:bg-surface border border-surface-border transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs">
            {user?.name?.[0] || 'A'}
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden sm:inline">{user?.name || 'Alex Rivera'}</span>
        </Link>
      </div>
    </header>
  );
};
