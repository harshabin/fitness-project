'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { api } from '@/lib/api';
import { Gender, ActivityLevel, FitnessGoal, DietPreference } from '@fithealth/types';
import { Sparkles, Sliders, CheckCircle, ArrowRight, HeartPulse, Scale, Flame, ShieldAlert } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, setUser, refreshAll } = useFitnessStore();

  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [age, setAge] = useState(user?.age || 26);
  const [gender, setGender] = useState<Gender>(user?.gender || 'male');
  const [heightCm, setHeightCm] = useState(user?.heightCm || 178);
  const [weightKg, setWeightKg] = useState(user?.weightKg || 76);
  const [targetWeightKg, setTargetWeightKg] = useState(user?.targetWeightKg || 80);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(user?.activityLevel || 'moderately_active');
  const [goal, setGoal] = useState<FitnessGoal>(user?.goal || 'muscle_gain');
  const [dietPreference, setDietPreference] = useState<DietPreference>(user?.dietPreference || 'omnivore');
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(user?.experienceLevel || 'intermediate');
  const [medicalNotes, setMedicalNotes] = useState(user?.medicalNotes || '');

  const [submitting, setSubmitting] = useState(false);

  // Real-time live biometrics calculations
  const heightM = heightCm / 100;
  const liveBmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  const liveBmr = Math.round(gender === 'female' 
    ? (10 * weightKg + 6.25 * heightCm - 5 * age - 161)
    : (10 * weightKg + 6.25 * heightCm - 5 * age + 5));

  const multMap: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  };
  const liveTdee = Math.round(liveBmr * (multMap[activityLevel] || 1.55));
  const liveTargetCals = goal === 'fat_loss' ? liveTdee - 450 : goal === 'muscle_gain' ? liveTdee + 350 : liveTdee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.signupOnboard({
        name,
        age: Number(age),
        gender,
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        targetWeightKg: Number(targetWeightKg),
        activityLevel,
        goal,
        dietPreference,
        experienceLevel,
        medicalNotes
      });

      setUser(res.user);
      await refreshAll();
      router.push('/');
    } catch (err) {
      console.warn('Fallback local update:', err);
      if (user) {
        setUser({
          ...user,
          name,
          age,
          gender,
          heightCm,
          weightKg,
          targetWeightKg,
          activityLevel,
          goal,
          dietPreference,
          experienceLevel,
          medicalNotes,
          bmi: liveBmi,
          bmr: liveBmr,
          tdee: liveTdee,
          targetCalories: liveTargetCals
        });
      }
      router.push('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-bold bg-cyan/15 border border-cyan/30 text-cyan">
          <HeartPulse className="w-4 h-4" />
          <span>Biometric & Metabolic Profiler</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Personalized Fitness & Nutrition Setup
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          We use the clinical Mifflin-St Jeor metabolic model to calculate your baseline energy expenditure, macro requirements, and customized 7-day split.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (7 Columns) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 bg-surface/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-surface-border shadow-2xl">
          {/* Basic Biometrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">1. Core Biometrics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min={14}
                  max={90}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  min={100}
                  max={250}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Current Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  min={35}
                  max={250}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetWeightKg}
                  onChange={(e) => setTargetWeightKg(Number(e.target.value))}
                  min={35}
                  max={250}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                />
              </div>
            </div>
          </div>

          {/* Activity & Goals */}
          <div className="space-y-4 pt-4 border-t border-surface-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">2. Training & Metabolic Goal</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Primary Fitness Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                >
                  <option value="muscle_gain">Hypertrophy / Muscle Gain (Caloric Surplus)</option>
                  <option value="fat_loss">Fat Loss / Shredding (Caloric Deficit)</option>
                  <option value="maintenance">Body Recomposition & Maintenance</option>
                  <option value="endurance">Endurance & Functional Conditioning</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Daily Physical Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                >
                  <option value="sedentary">Sedentary (Desk job, little exercise)</option>
                  <option value="lightly_active">Lightly Active (1-3 workout days/week)</option>
                  <option value="moderately_active">Moderately Active (3-5 workout days/week)</option>
                  <option value="very_active">Very Active (6-7 intense training days)</option>
                  <option value="extra_active">Extra Active (Athlete / physical labor)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Dietary Preference</label>
                  <select
                    value={dietPreference}
                    onChange={(e) => setDietPreference(e.target.value as DietPreference)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                  >
                    <option value="omnivore">Standard / Omnivore</option>
                    <option value="vegetarian">Vegetarian (Dairy & Eggs)</option>
                    <option value="vegan">Vegan (Plant-Based)</option>
                    <option value="pescatarian">Pescatarian</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                  >
                    <option value="beginner">Beginner (&lt; 1 Year)</option>
                    <option value="intermediate">Intermediate (1-3 Years)</option>
                    <option value="advanced">Advanced (3+ Years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Injuries / Medical Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Mild lower back strain, shoulder impingement..."
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-crimson to-crimson-dark text-white font-extrabold text-sm shadow-glow-crimson hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{submitting ? 'Generating Biomechanical Plan...' : 'Save & Generate 7-Day Protocol'}</span>
          </button>
        </form>

        {/* Live Computational Biometrics Card (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#111724] to-[#0A0E17] border border-cyan/30 shadow-glow-cyan space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-cyan text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Live Metabolic Engine</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">Calculated Biometric Matrix</h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-surface/80 border border-surface-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Basal Metabolic Rate (BMR)</span>
                  <div className="text-xl font-black text-white">{liveBmr} kcal/day</div>
                </div>
                <Flame className="w-6 h-6 text-crimson" />
              </div>

              <div className="p-4 rounded-2xl bg-surface/80 border border-surface-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Total Daily Energy (TDEE)</span>
                  <div className="text-xl font-black text-cyan">{liveTdee} kcal/day</div>
                </div>
                <HeartPulse className="w-6 h-6 text-cyan" />
              </div>

              <div className="p-4 rounded-2xl bg-surface/80 border border-surface-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Target Caloric Intake</span>
                  <div className="text-xl font-black text-emerald">{liveTargetCals} kcal/day</div>
                </div>
                <Scale className="w-6 h-6 text-emerald" />
              </div>

              <div className="p-4 rounded-2xl bg-surface/80 border border-surface-border flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Body Mass Index (BMI)</span>
                  <div className="text-xl font-black text-amber">{liveBmi}</div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-amber/15 text-amber border border-amber/30 uppercase">
                  {liveBmi < 18.5 ? 'Underweight' : liveBmi < 25 ? 'Normal' : liveBmi < 30 ? 'Overweight' : 'Obese'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              These values automatically configure your daily macro splits and double-progression suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
