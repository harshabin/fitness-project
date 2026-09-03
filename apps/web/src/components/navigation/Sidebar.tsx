'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  Layers, 
  TrendingUp, 
  Sliders, 
  Sparkles,
  HeartPulse
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/workouts', label: 'Workouts & Splits', icon: Dumbbell },
    { href: '/muscle-map', label: 'Muscle Anatomy Map', icon: Layers, highlight: true },
    { href: '/diet', label: 'Diet & Nutrition', icon: UtensilsCrossed },
    { href: '/progress', label: 'Progress & Health', icon: TrendingUp },
    { href: '/onboarding', label: 'Biometrics & Goals', icon: Sliders },
  ];

  return (
    <aside className="w-full md:w-64 md:min-h-[calc(100vh-4rem)] bg-[#0A0E15]/90 border-r border-surface-border p-4 flex md:flex-col justify-between shrink-0">
      <div className="space-y-1.5 w-full">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 hidden md:block">
          Main Navigation
        </div>

        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-crimson/20 to-crimson/5 text-crimson border border-crimson/30 shadow-glow-crimson font-bold'
                    : item.highlight
                    ? 'text-cyan hover:bg-cyan/10 border border-cyan/20'
                    : 'text-slate-400 hover:text-white hover:bg-surface-muted/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-crimson' : item.highlight ? 'text-cyan' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="hidden lg:inline-block ml-auto px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-cyan/20 text-cyan">
                    2D Map
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Health Shield Badge */}
      <div className="hidden md:block p-4 rounded-2xl bg-gradient-to-br from-surface to-surface-muted border border-surface-border relative overflow-hidden">
        <div className="flex items-center space-x-2 text-xs font-bold text-white mb-1">
          <HeartPulse className="w-4 h-4 text-crimson animate-pulse" />
          <span>Biometric Engine</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          TDEE and progressive overload calculations synced in real-time.
        </p>
      </div>
    </aside>
  );
};
