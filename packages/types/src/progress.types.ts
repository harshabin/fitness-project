export interface BodyMeasurements {
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  leftBicepCm?: number;
  rightBicepCm?: number;
  leftThighCm?: number;
  rightThighCm?: number;
  shouldersCm?: number;
  neckCm?: number;
}

export interface ProgressLog {
  id: string;
  userId: string;
  date: string;
  weightKg: number;
  bodyFatPercentage?: number;
  measurements?: BodyMeasurements;
  photoFrontUrl?: string;
  photoSideUrl?: string;
  photoBackUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface AdherenceScore {
  periodDays: number; // e.g. 7 or 30
  overallScore: number; // 0 to 100%
  workoutAdherence: number; // 0 to 100%
  nutritionAdherence: number; // 0 to 100%
  hydrationAdherence: number; // 0 to 100%
  activeStreakDays: number;
  totalWorkoutsCompleted: number;
  totalVolumeKgLifted: number;
}

export interface MuscleRecoveryStatus {
  muscleId: string;
  muscleName: string;
  lastTrainedDate?: string;
  recoveryPercentage: number; // 0 to 100 (100 = fully recovered)
  weeklySetsCount: number;
  optimalSetsRange: [number, number]; // e.g. [12, 20]
}
