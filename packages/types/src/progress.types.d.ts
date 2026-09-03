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
    periodDays: number;
    overallScore: number;
    workoutAdherence: number;
    nutritionAdherence: number;
    hydrationAdherence: number;
    activeStreakDays: number;
    totalWorkoutsCompleted: number;
    totalVolumeKgLifted: number;
}
export interface MuscleRecoveryStatus {
    muscleId: string;
    muscleName: string;
    lastTrainedDate?: string;
    recoveryPercentage: number;
    weeklySetsCount: number;
    optimalSetsRange: [number, number];
}
//# sourceMappingURL=progress.types.d.ts.map