export type MuscleGroupId = 'chest_upper' | 'chest_mid' | 'chest_lower' | 'lats' | 'traps' | 'rhomboids' | 'lower_back' | 'deltoids_front' | 'deltoids_side' | 'deltoids_rear' | 'biceps' | 'triceps' | 'forearms' | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves' | 'abs' | 'obliques';
export type MuscleCategory = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Core';
export interface MuscleGroupInfo {
    id: MuscleGroupId;
    name: string;
    category: MuscleCategory;
    description: string;
    meshNodeName: string;
    meshNodeNames?: string[];
    antagonistId?: MuscleGroupId;
    relatedExerciseIds: string[];
}
export type ActivationLevel = 'primary' | 'secondary' | 'stabilizer' | 'inactive';
export interface MuscleActivationMap {
    [muscleId: string]: ActivationLevel;
}
export type CameraPreset = 'front' | 'side_right' | 'side_left' | 'back' | 'top' | 'isometric' | 'focus_chest' | 'focus_back' | 'focus_legs' | 'focus_arms';
export interface CameraViewConfig {
    position: [number, number, number];
    target: [number, number, number];
    fov?: number;
}
//# sourceMappingURL=muscle-3d.types.d.ts.map