import { UserProfile, OnboardingInput, Gender, ActivityLevel, FitnessGoal, DietPreference } from '@fithealth/types';

export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: UserProfile['bmiCategory'] } {
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category: UserProfile['bmiCategory'] = 'normal';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'normal';
  else if (bmi < 30) category = 'overweight';
  else category = 'obese';

  return { bmi, category };
}

export function calculateBMR(gender: Gender, weightKg: number, heightCm: number, age: number): number {
  // Mifflin-St Jeor Equation
  if (gender === 'female') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  }
  // Default to male / standard
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  };

  const mult = multipliers[activityLevel] || 1.375;
  return Math.round(bmr * mult);
}

export function calculateTargetCalories(tdee: number, goal: FitnessGoal): number {
  switch (goal) {
    case 'fat_loss':
      return Math.round(tdee - 450); // Moderate healthy deficit
    case 'muscle_gain':
      return Math.round(tdee + 350); // Lean caloric surplus
    case 'endurance':
      return Math.round(tdee + 150);
    case 'recomposition':
      return Math.round(tdee - 150);
    case 'maintenance':
    default:
      return tdee;
  }
}

export function calculateTargetWaterMl(weightKg: number, activityLevel: ActivityLevel): number {
  // Base: 35ml per kg
  let baseMl = weightKg * 35;
  if (activityLevel === 'moderately_active') baseMl += 400;
  if (activityLevel === 'very_active' || activityLevel === 'extra_active') baseMl += 800;
  return Math.round(baseMl / 250) * 250; // Round to nearest 250ml cup
}
