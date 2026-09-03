import { DietPlan, Meal, MealItem, FoodItem, MacroSplit, DietPreference, FitnessGoal } from '@fithealth/types';
import { SEED_FOOD_ITEMS } from '../database/seedData';
import { v4 as uuidv4 } from 'uuid';

export function calculateMacros(targetCalories: number, weightKg: number, goal: FitnessGoal): MacroSplit {
  let proteinPerKg = 2.0; // standard default
  let fatRatio = 0.25; // 25% of calories from fat

  if (goal === 'fat_loss') {
    proteinPerKg = 2.2; // High protein preserves lean mass in deficit
    fatRatio = 0.25;
  } else if (goal === 'muscle_gain') {
    proteinPerKg = 2.0;
    fatRatio = 0.25;
  } else if (goal === 'endurance') {
    proteinPerKg = 1.6;
    fatRatio = 0.20; // higher carb focus
  }

  const proteinG = Math.round(weightKg * proteinPerKg);
  const proteinCals = proteinG * 4;

  const fatCals = Math.round(targetCalories * fatRatio);
  const fatG = Math.round(fatCals / 9);

  const remainingCals = Math.max(0, targetCalories - (proteinCals + fatCals));
  const carbsG = Math.round(remainingCals / 4);

  return {
    calories: targetCalories,
    proteinG,
    carbsG,
    fatG,
    fiberG: Math.round(targetCalories / 1000 * 14) // 14g per 1000 cals standard
  };
}

export function generateDietPlan(userId: string, targetCalories: number, weightKg: number, goal: FitnessGoal, dietPref: DietPreference, waterTargetMl: number): DietPlan {
  const planId = `diet-${uuidv4().slice(0, 8)}`;
  const macroSplit = calculateMacros(targetCalories, weightKg, goal);

  const getFood = (id: string): FoodItem => {
    const f = SEED_FOOD_ITEMS.find(item => item.id === id);
    if (!f) return SEED_FOOD_ITEMS[0];
    return f;
  };

  // Filter foods by diet preference if possible
  const isVeg = dietPref === 'vegetarian' || dietPref === 'vegan';
  const isVegan = dietPref === 'vegan';

  let breakfastFood = isVegan 
    ? getFood('food-tofu-scramble') 
    : isVeg 
      ? getFood('food-egg-avocado-toast') 
      : getFood('food-oats-whey');

  let lunchFood = isVegan 
    ? getFood('food-chickpea-tempeh-curry') 
    : isVeg 
      ? getFood('food-lentil-paneer-bowl') 
      : getFood('food-chicken-rice-bowl');

  let snackFood = isVegan
    ? getFood('food-chickpea-tempeh-curry')
    : getFood('food-greek-yogurt-snack');

  let dinnerFood = isVegan
    ? getFood('food-tofu-scramble')
    : isVeg
      ? getFood('food-lentil-paneer-bowl')
      : getFood('food-salmon-quinoa-bowl');

  const createMeal = (timeSlot: Meal['timeSlot'], name: string, recTime: string, food: FoodItem, multiplier: number): Meal => {
    const calculatedMacros: MacroSplit = {
      calories: Math.round(food.calories * multiplier),
      proteinG: Math.round(food.proteinG * multiplier),
      carbsG: Math.round(food.carbsG * multiplier),
      fatG: Math.round(food.fatG * multiplier),
      fiberG: Math.round((food.fiberG || 0) * multiplier)
    };

    return {
      id: `meal-${uuidv4().slice(0, 6)}`,
      dietPlanId: planId,
      timeSlot,
      name,
      recommendedTime: recTime,
      targetMacros: calculatedMacros,
      items: [
        {
          foodItem: food,
          quantity: multiplier,
          calculatedMacros
        }
      ]
    };
  };

  const meals: Meal[] = [
    createMeal('breakfast', 'Power Energy Breakfast', '08:00 AM', breakfastFood, 1.0),
    createMeal('lunch', 'Lean Protein Muscle Lunch', '01:00 PM', lunchFood, 1.0),
    createMeal('evening_snack', 'Pre/Post Workout Refuel', '04:30 PM', snackFood, 1.0),
    createMeal('dinner', 'Nutrient-Dense Recovery Dinner', '08:00 PM', dinnerFood, 1.0)
  ];

  return {
    id: planId,
    userId,
    title: `Balanced ${goal.replace('_', ' ').toUpperCase()} Nutrition Plan`,
    targetCalories,
    macroSplit,
    dietPreference: dietPref,
    waterTargetMl,
    meals,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function findSwapMealAlternatives(currentMeal: Meal, dietPref: DietPreference): FoodItem[] {
  const currentCals = currentMeal.targetMacros.calories;
  const tolerance = 0.25; // 25% margin

  return SEED_FOOD_ITEMS.filter(item => {
    if (currentMeal.items.some(i => i.foodItem.id === item.id)) return false;
    const matchesPref = dietPref === 'omnivore' || item.dietPreference.includes(dietPref);
    const inRange = item.calories >= currentCals * (1 - tolerance) && item.calories <= currentCals * (1 + tolerance);
    return matchesPref && inRange;
  });
}
