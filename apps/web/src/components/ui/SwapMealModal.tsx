'use client';

import React, { useState, useEffect } from 'react';
import { Meal, FoodItem } from '@fithealth/types';
import { api } from '@/lib/api';
import { X, RefreshCw, Check, Sparkles, Flame } from 'lucide-react';

interface SwapMealModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAlternative: (mealId: string, newFood: FoodItem) => void;
}

export const SwapMealModal: React.FC<SwapMealModalProps> = ({
  meal,
  isOpen,
  onClose,
  onSelectAlternative
}) => {
  const [alternatives, setAlternatives] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !meal) return;
    setLoading(true);
    api.getSwapMealAlternatives(meal.id)
      .then(res => {
        setAlternatives(res.alternatives || []);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err);
        setLoading(false);
      });
  }, [isOpen, meal]);

  if (!isOpen || !meal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-surface border border-surface-border rounded-2xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Smart Meal Swap Engine</h3>
              <p className="text-xs text-slate-400">Balanced macro-equivalent substitutes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface-muted hover:bg-surface-hover text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Meal Reference */}
        <div className="p-3.5 rounded-xl bg-surface-muted/60 border border-surface-border flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-cyan uppercase tracking-wider">Current Selection</span>
            <div className="text-sm font-bold text-white">{meal.name}</div>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-white">{meal.targetMacros.calories} kcal</span>
            <div className="text-[11px] text-slate-400">
              P: {meal.targetMacros.proteinG}g • C: {meal.targetMacros.carbsG}g • F: {meal.targetMacros.fatG}g
            </div>
          </div>
        </div>

        {/* Alternatives List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span>Recommended Replacements (±10% Macros)</span>
          </h4>

          {loading ? (
            <div className="py-8 text-center text-slate-400 text-xs animate-pulse">
              Computing optimal macro balances...
            </div>
          ) : alternatives.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching alternatives found with this dietary filter.
            </div>
          ) : (
            alternatives.map((alt) => (
              <div
                key={alt.id}
                className="p-3.5 rounded-xl bg-surface-muted/40 hover:bg-surface-muted border border-surface-border hover:border-cyan/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{alt.icon || '🥗'}</span>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan transition-colors">
                      {alt.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {alt.servingSize} • {alt.cuisine || 'Healthy'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-white">{alt.calories} kcal</span>
                    <div className="text-[10px] text-slate-400">
                      P: {alt.proteinG}g | C: {alt.carbsG}g | F: {alt.fatG}g
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectAlternative(meal.id, alt);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-cyan text-slate-950 font-bold hover:bg-cyan-dark transition-colors shadow-glow-cyan"
                    title="Swap to this meal"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
