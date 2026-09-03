export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
export type FitnessGoal = 'fat_loss' | 'muscle_gain' | 'maintenance' | 'endurance' | 'recomposition';
export type DietPreference = 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'low_carb';
export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone?: string;
    avatarUrl?: string;
    age: number;
    gender: Gender;
    heightCm: number;
    weightKg: number;
    targetWeightKg?: number;
    activityLevel: ActivityLevel;
    goal: FitnessGoal;
    dietPreference: DietPreference;
    medicalNotes?: string;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    bmi: number;
    bmiCategory: 'underweight' | 'normal' | 'overweight' | 'obese';
    bmr: number;
    tdee: number;
    targetCalories: number;
    isOnboarded: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export interface AuthResponse {
    user: UserProfile;
    tokens: AuthTokens;
}
export interface OnboardingInput {
    name: string;
    age: number;
    gender: Gender;
    heightCm: number;
    weightKg: number;
    targetWeightKg?: number;
    activityLevel: ActivityLevel;
    goal: FitnessGoal;
    dietPreference: DietPreference;
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    medicalNotes?: string;
}
//# sourceMappingURL=auth.types.d.ts.map