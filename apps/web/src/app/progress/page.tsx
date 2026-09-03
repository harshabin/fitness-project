'use client';

import React, { useState, useEffect } from 'react';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { api } from '@/lib/api';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  TrendingUp, 
  Scale, 
  Award, 
  Calendar, 
  Plus, 
  Check, 
  Activity, 
  Ruler,
  Dumbbell
} from 'lucide-react';

export default function ProgressPage() {
  const { user, progressLogs, adherence, initialize } = useFitnessStore();

  const [newWeight, setNewWeight] = useState(user?.weightKg || 76);
  const [chestCm, setChestCm] = useState(104);
  const [waistCm, setWaistCm] = useState(81);
  const [bicepCm, setBicepCm] = useState(38);
  const [thighCm, setThighCm] = useState(59);
  const [isLogging, setIsLogging] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.logProgress({
        userId: user?.id,
        weightKg: Number(newWeight),
        measurements: {
          chestCm: Number(chestCm),
          waistCm: Number(waistCm),
          leftBicepCm: Number(bicepCm),
          rightBicepCm: Number(bicepCm),
          leftThighCm: Number(thighCm),
          rightThighCm: Number(thighCm)
        }
      });
      setSuccessMsg('Progress logged successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      setIsLogging(false);
      await initialize();
    } catch (e) {
      console.warn(e);
    }
  };

  // Prepare chart data from logs
  const weightChartData = progressLogs?.length
    ? progressLogs.map((p) => ({
        date: p.date.slice(5),
        weight: p.weightKg,
        target: user?.targetWeightKg || 80
      }))
    : [
        { date: '08-22', weight: 75.2, target: 80 },
        { date: '08-23', weight: 75.5, target: 80 },
        { date: '08-24', weight: 75.8, target: 80 },
        { date: '08-25', weight: 75.6, target: 80 },
        { date: '08-26', weight: 76.0, target: 80 },
        { date: '08-27', weight: 76.2, target: 80 },
        { date: '08-28', weight: 76.0, target: 80 },
      ];

  const volumeChartData = [
    { day: 'Mon', volume: 4650, group: 'Chest' },
    { day: 'Tue', volume: 5200, group: 'Back' },
    { day: 'Wed', volume: 6800, group: 'Legs' },
    { day: 'Thu', volume: 3900, group: 'Shoulders' },
    { day: 'Fri', volume: 4800, group: 'Arms' },
    { day: 'Sat', volume: 2900, group: 'Core' },
    { day: 'Sun', volume: 0, group: 'Rest' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald/15 border border-emerald/30 text-emerald mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Biometric Telemetry & Overload Metrics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Progress & Body Composition Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track progressive tonnage, rolling weight trajectories, and anatomical circumference logs.
          </p>
        </div>

        <button
          onClick={() => setIsLogging(!isLogging)}
          className="px-5 py-2.5 rounded-2xl bg-cyan text-slate-950 font-bold text-xs sm:text-sm shadow-glow-cyan hover:bg-cyan-dark transition-colors flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Measurements</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald/20 border border-emerald/40 text-emerald text-xs font-bold animate-fadeIn">
          {successMsg}
        </div>
      )}

      {/* Measurement Log Form Drawer */}
      {isLogging && (
        <form
          onSubmit={handleLogProgress}
          className="p-6 rounded-3xl bg-surface/95 backdrop-blur-xl border border-cyan/40 shadow-glow-cyan space-y-6 animate-scaleUp"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Scale className="w-4 h-4 text-cyan" />
              <span>Record Today's Biometrics</span>
            </h3>
            <span className="text-xs text-slate-400">Date: Today</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={newWeight}
                onChange={(e) => setNewWeight(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-muted border border-surface-border text-white text-xs font-bold focus:outline-none focus:border-cyan"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Chest (cm)</label>
              <input
                type="number"
                step="0.5"
                value={chestCm}
                onChange={(e) => setChestCm(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-muted border border-surface-border text-white text-xs font-bold focus:outline-none focus:border-cyan"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Waist (cm)</label>
              <input
                type="number"
                step="0.5"
                value={waistCm}
                onChange={(e) => setWaistCm(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-muted border border-surface-border text-white text-xs font-bold focus:outline-none focus:border-cyan"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Biceps (cm)</label>
              <input
                type="number"
                step="0.5"
                value={bicepCm}
                onChange={(e) => setBicepCm(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-muted border border-surface-border text-white text-xs font-bold focus:outline-none focus:border-cyan"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Thighs (cm)</label>
              <input
                type="number"
                step="0.5"
                value={thighCm}
                onChange={(e) => setThighCm(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-surface-muted border border-surface-border text-white text-xs font-bold focus:outline-none focus:border-cyan"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsLogging(false)}
              className="px-4 py-2 rounded-xl bg-surface-muted text-xs font-semibold text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan text-slate-950 text-xs font-bold hover:bg-cyan-dark"
            >
              Save Metrics
            </button>
          </div>
        </form>
      )}

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface/85 backdrop-blur-xl border border-surface-border flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Current Body Weight</span>
            <div className="text-2xl font-black text-white mt-0.5">{user?.weightKg || 76} kg</div>
            <span className="text-[11px] text-emerald font-semibold">Target: {user?.targetWeightKg || 80} kg</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan/15 flex items-center justify-center text-cyan">
            <Scale className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface/85 backdrop-blur-xl border border-surface-border flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Weekly Total Volume</span>
            <div className="text-2xl font-black text-white mt-0.5">{(adherence?.totalVolumeKgLifted || 18450).toLocaleString()} kg</div>
            <span className="text-[11px] text-cyan font-semibold">+12% vs last week</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-crimson/15 flex items-center justify-center text-crimson">
            <Dumbbell className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface/85 backdrop-blur-xl border border-surface-border flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Compliance Adherence</span>
            <div className="text-2xl font-black text-emerald mt-0.5">{adherence?.overallScore || 88}%</div>
            <span className="text-[11px] text-slate-400 font-semibold">{adherence?.activeStreakDays || 5}-Day Active Streak</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald/15 flex items-center justify-center text-emerald">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weight Trajectory Line Chart (7 Columns) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-surface/85 backdrop-blur-xl border border-surface-border shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-cyan" />
              <span>Weight Trajectory & Trend (kg)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Daily Weigh-ins</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={['dataMin - 1', 'dataMax + 2']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0E131C',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#00F0FF"
                  strokeWidth={3}
                  dot={{ fill: '#00F0FF', r: 4 }}
                  name="Weight (kg)"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#64748B"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                  name="Goal Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Volume Load Bar Chart (5 Columns) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-surface/85 backdrop-blur-xl border border-surface-border shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Dumbbell className="w-4 h-4 text-crimson" />
              <span>Weekly Volume Load (kg)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Per Session</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0E131C',
                    borderColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#FFF',
                    fontSize: '12px'
                  }}
                />
                <Bar
                  dataKey="volume"
                  fill="#FF2A4B"
                  radius={[8, 8, 0, 0]}
                  name="Volume (kg)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
