import { DietPreference } from './auth.types';

export interface MacroSplit {
  proteinG: number;
  carbsG: number;
  fatG: number;
  calories: number;
  fiberG?: number;
}

export type MealTimeSlot = 'breakfast' | 'morning_snack' | 'lunch' | 'evening_snack' | 'dinner';

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  servingSize: string; // e.g. "100g", "1 cup (240ml)", "2 large eggs"
  servingGrams: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
  dietPreference: DietPreference[];
  cuisine?: string;
  icon?: string;
}

export interface MealItem {
  foodItem: FoodItem;
  quantity: number; // multiplier of servingSize
  calculatedMacros: MacroSplit;
}

export interface Meal {
  id: string;
  dietPlanId: string;
  timeSlot: MealTimeSlot;
  name: string;
  recommendedTime: string; // e.g. "08:00 AM"
  targetMacros: MacroSplit;
  items: MealItem[];
  swapSuggestions?: Meal[];
}

export interface DietPlan {
  id: string;
  userId: string;
  title: string;
  targetCalories: number;
  macroSplit: MacroSplit;
  dietPreference: DietPreference;
  waterTargetMl: number;
  meals: Meal[];
  createdAt: string;
  updatedAt: string;
}

export interface FoodLogEntry {
  id: string;
  userId: string;
  date: string;
  timeSlot: MealTimeSlot;
  foodItemId: string;
  foodItemName: string;
  quantity: number;
  servingSize: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  loggedAt: string;
}

export interface DailyNutritionSummary {
  date: string;
  targetCalories: number;
  consumedCalories: number;
  targetMacros: MacroSplit;
  consumedMacros: MacroSplit;
  waterTargetMl: number;
  waterConsumedMl: number;
  foodLogs: FoodLogEntry[];
}
