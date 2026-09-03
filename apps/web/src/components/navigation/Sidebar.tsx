'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  Layers, 
  TrendingUp, 
  Sliders, 
  Sparkles,
  HeartPulse,
  LogIn,
  LogOut,
  UserCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useFitnessStore();

  const navItems = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/workouts', label: 'Workouts & Splits', icon: Dumbbell },
    { href: '/muscle-map', label: 'Muscle Anatomy Map', icon: Layers, highlight: true },
    { href: '/diet', label: 'Diet & Nutrition', icon: UtensilsCrossed },
    { href: '/progress', label: 'Progress & Health', icon: TrendingUp },
    { href: '/onboarding', label: 'Biometrics & Goals', icon: Sliders },
    { href: '/login', label: 'User Login & Auth', icon: LogIn },
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
                    3D Map
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Session Card & Biometric Engine Badge */}
      <div className="hidden md:flex flex-col space-y-3 pt-4 border-t border-surface-border/60">
        {user ? (
          <div className="p-3 rounded-2xl bg-surface/80 border border-surface-border flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                {user.name?.[0] || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{user.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-crimson hover:bg-crimson/10 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="w-full py-2.5 px-3 rounded-xl bg-cyan/15 hover:bg-cyan/25 border border-cyan/30 text-cyan text-xs font-bold text-center flex items-center justify-center space-x-1.5 transition-all shadow-glow-cyan"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In to Account</span>
          </Link>
        )}

        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-surface to-surface-muted border border-surface-border relative overflow-hidden">
          <div className="flex items-center space-x-2 text-xs font-bold text-white mb-1">
            <HeartPulse className="w-4 h-4 text-crimson animate-pulse" />
            <span>Biometric Engine</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            TDEE & progressive overload calculated in real-time.
          </p>
        </div>
      </div>
    </aside>
  );
};
