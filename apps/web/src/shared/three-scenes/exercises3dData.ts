import { Exercise, MuscleActivationMap, CameraPreset } from '@fithealth/types';

export interface Exercise3DConfig {
  exerciseId: string;
  defaultCamera: CameraPreset;
  animationSpeed: number;
  equipmentMesh?: 'barbell' | 'dumbbell_pair' | 'cable_handle' | 'pullup_bar' | 'bench_flat' | 'bench_incline' | 'bodyweight';
  kinematicType: 
    | 'bench_press'
    | 'incline_press'
    | 'squat'
    | 'deadlift'
    | 'overhead_press'
    | 'lat_pulldown'
    | 'pullup'
    | 'bent_over_row'
    | 'bicep_curl'
    | 'tricep_pushdown'
    | 'lateral_raise'
    | 'leg_extension'
    | 'leg_curl'
    | 'hip_thrust'
    | 'plank'
    | 'hanging_leg_raise'
    | 'calf_raise';
  muscleActivations: MuscleActivationMap;
}

export const EXERCISES_3D_CATALOG: Record<string, Exercise3DConfig> = {
  'barbell-bench-press': {
    exerciseId: 'barbell-bench-press',
    defaultCamera: 'isometric',
    animationSpeed: 1.0,
    equipmentMesh: 'bench_flat',
    kinematicType: 'bench_press',
    muscleActivations: {
      chest_mid: 'primary',
      chest_lower: 'primary',
      deltoids_front: 'secondary',
      triceps: 'secondary',
      lats: 'stabilizer'
    }
  },
  'incline-dumbbell-press': {
    exerciseId: 'incline-dumbbell-press',
    defaultCamera: 'isometric',
    animationSpeed: 1.0,
    equipmentMesh: 'bench_incline',
    kinematicType: 'incline_press',
    muscleActivations: {
      chest_upper: 'primary',
      deltoids_front: 'secondary',
      triceps: 'secondary'
    }
  },
  'barbell-back-squat': {
    exerciseId: 'barbell-back-squat',
    defaultCamera: 'isometric',
    animationSpeed: 0.9,
    equipmentMesh: 'barbell',
    kinematicType: 'squat',
    muscleActivations: {
      quadriceps: 'primary',
      glutes: 'primary',
      hamstrings: 'secondary',
      calves: 'stabilizer',
      lower_back: 'stabilizer',
      abs: 'stabilizer'
    }
  },
  'conventional-deadlift': {
    exerciseId: 'conventional-deadlift',
    defaultCamera: 'side_right',
    animationSpeed: 0.85,
    equipmentMesh: 'barbell',
    kinematicType: 'deadlift',
    muscleActivations: {
      lower_back: 'primary',
      hamstrings: 'primary',
      glutes: 'primary',
      traps: 'secondary',
      lats: 'secondary',
      forearms: 'secondary',
      quadriceps: 'secondary'
    }
  },
  'overhead-barbell-press': {
    exerciseId: 'overhead-barbell-press',
    defaultCamera: 'front',
    animationSpeed: 1.0,
    equipmentMesh: 'barbell',
    kinematicType: 'overhead_press',
    muscleActivations: {
      deltoids_front: 'primary',
      deltoids_side: 'secondary',
      triceps: 'secondary',
      traps: 'secondary',
      abs: 'stabilizer'
    }
  },
  'lat-pulldown': {
    exerciseId: 'lat-pulldown',
    defaultCamera: 'back',
    animationSpeed: 1.0,
    equipmentMesh: 'cable_handle',
    kinematicType: 'lat_pulldown',
    muscleActivations: {
      lats: 'primary',
      rhomboids: 'secondary',
      biceps: 'secondary',
      traps: 'stabilizer'
    }
  },
  'pull-ups': {
    exerciseId: 'pull-ups',
    defaultCamera: 'back',
    animationSpeed: 0.9,
    equipmentMesh: 'pullup_bar',
    kinematicType: 'pullup',
    muscleActivations: {
      lats: 'primary',
      biceps: 'secondary',
      rhomboids: 'secondary',
      forearms: 'stabilizer'
    }
  },
  'barbell-bent-over-row': {
    exerciseId: 'barbell-bent-over-row',
    defaultCamera: 'side_right',
    animationSpeed: 1.0,
    equipmentMesh: 'barbell',
    kinematicType: 'bent_over_row',
    muscleActivations: {
      lats: 'primary',
      rhomboids: 'primary',
      traps: 'secondary',
      deltoids_rear: 'secondary',
      biceps: 'secondary',
      lower_back: 'stabilizer'
    }
  },
  'barbell-bicep-curl': {
    exerciseId: 'barbell-bicep-curl',
    defaultCamera: 'focus_arms',
    animationSpeed: 1.1,
    equipmentMesh: 'barbell',
    kinematicType: 'bicep_curl',
    muscleActivations: {
      biceps: 'primary',
      forearms: 'secondary',
      deltoids_front: 'stabilizer'
    }
  },
  'rope-tricep-pushdown': {
    exerciseId: 'rope-tricep-pushdown',
    defaultCamera: 'side_right',
    animationSpeed: 1.1,
    equipmentMesh: 'cable_handle',
    kinematicType: 'tricep_pushdown',
    muscleActivations: {
      triceps: 'primary',
      forearms: 'stabilizer',
      chest_mid: 'stabilizer'
    }
  },
  'dumbbell-lateral-raises': {
    exerciseId: 'dumbbell-lateral-raises',
    defaultCamera: 'front',
    animationSpeed: 1.0,
    equipmentMesh: 'dumbbell_pair',
    kinematicType: 'lateral_raise',
    muscleActivations: {
      deltoids_side: 'primary',
      traps: 'secondary',
      forearms: 'stabilizer'
    }
  },
  'leg-extensions': {
    exerciseId: 'leg-extensions',
    defaultCamera: 'side_right',
    animationSpeed: 1.0,
    equipmentMesh: 'bodyweight',
    kinematicType: 'leg_extension',
    muscleActivations: {
      quadriceps: 'primary'
    }
  },
  'seated-leg-curl': {
    exerciseId: 'seated-leg-curl',
    defaultCamera: 'side_right',
    animationSpeed: 1.0,
    equipmentMesh: 'bodyweight',
    kinematicType: 'leg_curl',
    muscleActivations: {
      hamstrings: 'primary',
      calves: 'stabilizer'
    }
  },
  'barbell-hip-thrust': {
    exerciseId: 'barbell-hip-thrust',
    defaultCamera: 'side_right',
    animationSpeed: 1.0,
    equipmentMesh: 'bench_flat',
    kinematicType: 'hip_thrust',
    muscleActivations: {
      glutes: 'primary',
      hamstrings: 'secondary',
      quadriceps: 'stabilizer',
      abs: 'stabilizer'
    }
  },
  'hanging-leg-raises': {
    exerciseId: 'hanging-leg-raises',
    defaultCamera: 'front',
    animationSpeed: 0.9,
    equipmentMesh: 'pullup_bar',
    kinematicType: 'hanging_leg_raise',
    muscleActivations: {
      abs: 'primary',
      obliques: 'secondary',
      forearms: 'stabilizer'
    }
  },
  'standing-calf-raises': {
    exerciseId: 'standing-calf-raises',
    defaultCamera: 'focus_legs',
    animationSpeed: 1.2,
    equipmentMesh: 'bodyweight',
    kinematicType: 'calf_raise',
    muscleActivations: {
      calves: 'primary',
      quadriceps: 'stabilizer'
    }
  }
};
