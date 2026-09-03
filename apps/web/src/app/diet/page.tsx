'use client';

import React, { useState, useEffect } from 'react';
import { useFitnessStore } from '@/stores/useFitnessStore';
import { MacroRing } from '@/components/ui/MacroRing';
import { SwapMealModal } from '@/components/ui/SwapMealModal';
import { Meal, FoodItem } from '@fithealth/types';
import { api } from '@/lib/api';
import { 
  UtensilsCrossed, 
  Droplet, 
  Plus, 
  RefreshCw, 
  Search, 
  Sparkles, 
  Flame, 
  Check, 
  Clock,
  Heart
} from 'lucide-react';

export default function DietPage() {
  const { dietPlan, dietSummary, logWaterIntake, addFoodLog, initialize } = useFitnessStore();

  const [activeSwapMeal, setActiveSwapMeal] = useState<Meal | null>(null);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedSlotForLog, setSelectedSlotForLog] = useState('lunch');

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const items = await api.searchFoodItems(q);
      setSearchResults(items);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSwapAlternative = (mealId: string, newFood: FoodItem) => {
    // Replaces the food item in the current meal locally
    if (!dietPlan) return;
    const meal = dietPlan.meals.find(m => m.id === mealId);
    if (meal) {
      meal.name = newFood.name;
      meal.items = [{
        foodItem: newFood,
        quantity: 1,
        calculatedMacros: {
          calories: newFood.calories,
          proteinG: newFood.proteinG,
          carbsG: newFood.carbsG,
          fatG: newFood.fatG,
          fiberG: newFood.fiberG
        }
      }];
    }
  };

  const targetCals = dietSummary?.targetCalories || dietPlan?.targetCalories || 2800;
  const consumedCals = dietSummary?.consumedCalories || 1640;
  const targetProtein = dietPlan?.macroSplit?.proteinG || 160;
  const consumedProtein = dietSummary?.consumedMacros?.proteinG || 118;
  const targetCarbs = dietPlan?.macroSplit?.carbsG || 320;
  const consumedCarbs = dietSummary?.consumedMacros?.carbsG || 185;
  const targetFat = dietPlan?.macroSplit?.fatG || 75;
  const consumedFat = dietSummary?.consumedMacros?.fatG || 48;

  const waterConsumed = dietSummary?.waterConsumedMl || 1750;
  const waterTarget = dietSummary?.waterTargetMl || 3000;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan/15 border border-cyan/30 text-cyan mb-2">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Target Macronutrient Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {dietPlan?.title || 'Personalized Precision Nutrition'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dynamic calorie and macronutrient balancing calibrated to your metabolic rate and body composition goal.
          </p>
        </div>
      </div>

      {/* Top Nutrition & Macro Gauges Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface/90 backdrop-blur-xl border border-surface-border shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-surface-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Energy Target</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {consumedCals} <span className="text-lg font-normal text-slate-400">/ {targetCals} kcal</span>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-300">Caloric Target Fulfillment</span>
              <span className="text-cyan">{Math.round((consumedCals / targetCals) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-crimson via-amber to-cyan rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, (consumedCals / targetCals) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Macro Rings Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
          <MacroRing
            current={consumedProtein}
            target={targetProtein}
            label="Protein"
            unit="g"
            color="#FF2A4B"
            size={115}
            strokeWidth={9}
          />
          <MacroRing
            current={consumedCarbs}
            target={targetCarbs}
            label="Carbohydrates"
            unit="g"
            color="#00F0FF"
            size={115}
            strokeWidth={9}
          />
          <MacroRing
            current={consumedFat}
            target={targetFat}
            label="Healthy Fats"
            unit="g"
            color="#FFB800"
            size={115}
            strokeWidth={9}
          />
          <MacroRing
            current={dietPlan?.macroSplit?.fiberG || 35}
            target={38}
            label="Dietary Fiber"
            unit="g"
            color="#00E676"
            size={115}
            strokeWidth={9}
          />
        </div>
      </div>

      {/* Main Grid: Meal Timeline (7 Cols) + Water & Food Search Logger (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Meal Schedule & Swap Engine (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span>Programmed Daily Meals</span>
            </h3>
            <span className="text-xs text-slate-400">Click swap for balanced alternatives</span>
          </div>

          <div className="space-y-4">
            {dietPlan?.meals.map((meal) => (
              <div
                key={meal.id}
                className="p-5 rounded-2xl bg-surface/85 backdrop-blur-xl border border-surface-border hover:border-cyan/40 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-cyan/15 text-cyan uppercase tracking-wider">
                        {meal.timeSlot.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{meal.recommendedTime}</span>
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1.5">{meal.name}</h4>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSwapMeal(meal);
                      setIsSwapModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-surface-muted hover:bg-surface text-slate-300 hover:text-cyan border border-surface-border text-xs font-semibold transition-colors flex items-center space-x-1.5 shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Swap Meal</span>
                  </button>
                </div>

                {/* Macro pill summary */}
                <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-surface-muted/60 border border-surface-border text-xs">
                  <span className="font-bold text-white">{meal.targetMacros.calories} kcal</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-crimson font-medium">P: {meal.targetMacros.proteinG}g</span>
                  <span className="text-cyan font-medium">C: {meal.targetMacros.carbsG}g</span>
                  <span className="text-amber font-medium">F: {meal.targetMacros.fatG}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hydration Tracker + Food Logger (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hydration Tracker */}
          <div className="p-6 rounded-3xl bg-surface/90 backdrop-blur-xl border border-surface-border shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplet className="w-5 h-5 text-cyan fill-cyan" />
                <h3 className="text-base font-bold text-white">Hydration Telemetry</h3>
              </div>
              <span className="text-xs font-mono text-cyan font-bold">
                {waterConsumed} / {waterTarget} ml
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (waterConsumed / waterTarget) * 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {[250, 500, 750].map((amt) => (
                <button
                  key={amt}
                  onClick={() => logWaterIntake(amt)}
                  className="py-2.5 rounded-xl bg-cyan/10 hover:bg-cyan text-cyan hover:text-slate-950 border border-cyan/30 text-xs font-bold transition-all flex items-center justify-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+{amt}ml</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Food Search & Logger */}
          <div className="p-6 rounded-3xl bg-surface/90 backdrop-blur-xl border border-surface-border shadow-2xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Search className="w-4 h-4 text-emerald" />
                <span>Search & Log Custom Food</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Lookup ingredients or meals in database</p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search chicken, oats, salmon, tofu..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-surface-muted border border-surface-border text-white text-xs sm:text-sm focus:outline-none focus:border-cyan"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>

            {/* Results Drawer */}
            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {searchResults.map((f) => (
                  <div
                    key={f.id}
                    className="p-3 rounded-xl bg-surface-muted border border-surface-border flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{f.name}</div>
                      <div className="text-[10px] text-slate-400">{f.calories} kcal • {f.proteinG}g protein</div>
                    </div>
                    <button
                      onClick={async () => {
                        await addFoodLog(selectedSlotForLog, f.id, 1);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="p-1.5 rounded-lg bg-emerald text-slate-950 hover:bg-emerald-dark transition-colors"
                      title="Log item"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Swap Meal Dialog */}
      <SwapMealModal
        meal={activeSwapMeal}
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        onSelectAlternative={handleSwapAlternative}
      />
    </div>
  );
}
