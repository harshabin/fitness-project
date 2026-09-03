'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Activity, 
  User, 
  LogIn,
  AlertCircle
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, login, logout } = useFitnessStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Quick Demo Profiles
  const demoAccounts = [
    {
      name: 'Alex Rivera',
      email: 'alex.fitness@fithealth.io',
      role: 'Intermediate Hypertrophy',
      stats: '76kg · 178cm · Muscle Gain',
      badge: 'bg-cyan/15 text-cyan border-cyan/30'
    },
    {
      name: 'Sarah Chen',
      email: 'sarah.c@fithealth.io',
      role: 'Fat Loss & Conditioning',
      stats: '62kg · 165cm · Caloric Deficit',
      badge: 'bg-emerald/15 text-emerald border-emerald/30'
    },
    {
      name: 'Marcus Vance',
      email: 'marcus.v@fithealth.io',
      role: 'Strength & Powerlifting',
      stats: '88kg · 182cm · High Volume',
      badge: 'bg-crimson/15 text-crimson border-crimson/30'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const success = await login(email, password);
      if (success) {
        setSuccessMsg('Authentication successful! Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/');
        }, 800);
      } else {
        setErrorMsg('Failed to sign in. Please verify your credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo-password-123');
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await login(demoEmail, 'demo-password-123');
      setSuccessMsg(`Logged in as ${demoEmail.split('@')[0]}!`);
      setTimeout(() => {
        router.push('/');
      }, 700);
    } catch (err) {
      setErrorMsg('Demo login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-crimson/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan/15 border border-cyan/30 text-cyan mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FitHealth Secure Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sign In to Your Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Access your personalized 3D anatomical recovery heatmaps, adaptive meal logs, and progressive overload targets.
          </p>
        </div>

        {/* Current Session Banner (if logged in) */}
        {user && (
          <div className="p-4 rounded-2xl bg-surface/90 border border-cyan/30 backdrop-blur-md flex items-center justify-between shadow-glow-cyan">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center text-slate-950 font-bold">
                {user.name?.[0] || 'U'}
              </div>
              <div>
                <div className="text-xs text-slate-400">Currently active as</div>
                <div className="text-sm font-bold text-white">{user.name} ({user.email})</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => logout()}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-surface-muted hover:bg-surface border border-surface-border text-slate-300 transition-colors"
              >
                Sign Out
              </button>
              <Link
                href="/"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan text-slate-950 shadow-glow-cyan transition-transform hover:scale-105"
              >
                Dashboard →
              </Link>
            </div>
          </div>
        )}

        {/* Main Auth Card */}
        <div className="bg-surface/85 backdrop-blur-xl rounded-3xl border border-surface-border p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Notification Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-crimson/15 border border-crimson/40 text-crimson text-xs flex items-center space-x-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald/15 border border-emerald/40 text-emerald text-xs flex items-center space-x-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.fitness@fithealth.io"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-muted/90 border border-surface-border focus:border-cyan/60 focus:ring-2 focus:ring-cyan/20 text-white placeholder-slate-500 text-sm transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => alert('For testing, password verification is enabled. You can use any password or click any Demo account below!')}
                  className="text-[11px] text-cyan hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-surface-muted/90 border border-surface-border focus:border-cyan/60 focus:ring-2 focus:ring-cyan/20 text-white placeholder-slate-500 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-surface-border bg-surface-muted text-cyan focus:ring-cyan/20"
                />
                <span>Remember session for 30 days</span>
              </label>

              <div className="flex items-center space-x-1 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                <span>256-bit Encrypted</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan via-blue-500 to-cyan bg-[length:200%_auto] hover:bg-right text-slate-950 font-bold text-sm shadow-glow-cyan transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Profiles */}
          <div className="pt-2 border-t border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                ⚡ Quick 1-Click Demo Profiles
              </span>
              <span className="text-[10px] text-slate-500">Click to preview instantly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleDemoLogin(account.email)}
                  disabled={isLoading}
                  className="p-3 rounded-2xl bg-surface-muted/60 hover:bg-surface-muted border border-surface-border text-left transition-all hover:scale-[1.02] flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white group-hover:text-cyan transition-colors">
                        {account.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {account.role}
                    </div>
                  </div>
                  <div className="mt-2 text-[9px] font-semibold text-slate-500">
                    {account.stats}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              New to FitHealth?{' '}
              <Link href="/onboarding" className="text-cyan font-bold hover:underline">
                Complete Biometric Onboarding & Generate Workout Plan →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
