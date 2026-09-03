import { MuscleGroupInfo, MuscleGroupId } from '@fithealth/types';

export const MUSCLE_GROUPS_REGISTRY: Record<MuscleGroupId, MuscleGroupInfo> = {
  chest_upper: {
    id: 'chest_upper',
    name: 'Upper Pectorals (Clavicular Head)',
    category: 'Chest',
    description: 'Upper fibers of the chest responsible for shoulder flexion and horizontal adduction at an upward angle.',
    meshNodeName: 'Pectoralis_Upper',
    antagonistId: 'rhomboids',
    relatedExerciseIds: ['incline-dumbbell-press', 'incline-barbell-bench-press', 'low-to-high-cable-fly']
  },
  chest_mid: {
    id: 'chest_mid',
    name: 'Mid Pectorals (Sternal Head)',
    category: 'Chest',
    description: 'Central chest mass responsible for standard horizontal adduction across the torso.',
    meshNodeName: 'Pectoralis_Mid',
    antagonistId: 'rhomboids',
    relatedExerciseIds: ['barbell-bench-press', 'dumbbell-bench-press', 'cable-chest-fly', 'push-ups']
  },
  chest_lower: {
    id: 'chest_lower',
    name: 'Lower Pectorals (Abdominal Head)',
    category: 'Chest',
    description: 'Lower chest fibers aiding in downward horizontal adduction and arm depression.',
    meshNodeName: 'Pectoralis_Lower',
    antagonistId: 'traps',
    relatedExerciseIds: ['decline-bench-press', 'chest-dips', 'high-to-low-cable-fly']
  },
  lats: {
    id: 'lats',
    name: 'Latissimus Dorsi',
    category: 'Back',
    description: 'Broadest muscle of the back responsible for arm extension, adduction, and internal rotation.',
    meshNodeName: 'Latissimus_Dorsi',
    antagonistId: 'deltoids_front',
    relatedExerciseIds: ['lat-pulldown', 'pull-ups', 'barbell-bent-over-row', 'single-arm-dumbbell-row', 'cable-straight-arm-pulldown']
  },
  traps: {
    id: 'traps',
    name: 'Trapezius (Upper & Mid)',
    category: 'Back',
    description: 'Diamond-shaped muscle spanning neck and mid-spine responsible for scapular elevation and retraction.',
    meshNodeName: 'Trapezius',
    antagonistId: 'chest_lower',
    relatedExerciseIds: ['dumbbell-shrugs', 'barbell-shrugs', 'face-pulls', 'rack-pulls']
  },
  rhomboids: {
    id: 'rhomboids',
    name: 'Rhomboids & Mid-Back',
    category: 'Back',
    description: 'Deep mid-back muscles crucial for scapular retraction and thoracic posture stabilization.',
    meshNodeName: 'Rhomboids',
    antagonistId: 'chest_mid',
    relatedExerciseIds: ['seated-cable-row', 'chest-supported-t-bar-row', 'face-pulls']
  },
  lower_back: {
    id: 'lower_back',
    name: 'Erector Spinae (Lower Back)',
    category: 'Back',
    description: 'Spinal erectors running down the posterior chain responsible for vertebral extension and hip stability.',
    meshNodeName: 'Erector_Spinae',
    antagonistId: 'abs',
    relatedExerciseIds: ['conventional-deadlift', 'romanian-deadlift', 'hyperextensions', 'good-mornings']
  },
  deltoids_front: {
    id: 'deltoids_front',
    name: 'Anterior Deltoids (Front Shoulder)',
    category: 'Shoulders',
    description: 'Front shoulder head responsible for arm flexion and pushing overhead.',
    meshNodeName: 'Deltoid_Anterior',
    antagonistId: 'deltoids_rear',
    relatedExerciseIds: ['overhead-barbell-press', 'seated-dumbbell-shoulder-press', 'front-dumbbell-raise']
  },
  deltoids_side: {
    id: 'deltoids_side',
    name: 'Lateral Deltoids (Side Shoulder)',
    category: 'Shoulders',
    description: 'Lateral shoulder head responsible for arm abduction creating upper-body shoulder width.',
    meshNodeName: 'Deltoid_Lateral',
    antagonistId: 'lats',
    relatedExerciseIds: ['dumbbell-lateral-raises', 'cable-lateral-raises', 'egyptian-cable-lateral-raise']
  },
  deltoids_rear: {
    id: 'deltoids_rear',
    name: 'Posterior Deltoids (Rear Shoulder)',
    category: 'Shoulders',
    description: 'Rear shoulder head responsible for horizontal shoulder abduction and external rotation.',
    meshNodeName: 'Deltoid_Posterior',
    antagonistId: 'deltoids_front',
    relatedExerciseIds: ['face-pulls', 'reverse-pec-deck-fly', 'bent-over-dumbbell-rear-delt-fly']
  },
  biceps: {
    id: 'biceps',
    name: 'Biceps Brachii',
    category: 'Arms',
    description: 'Front upper-arm muscle responsible for elbow flexion and forearm supination.',
    meshNodeName: 'Biceps_Brachii',
    antagonistId: 'triceps',
    relatedExerciseIds: ['barbell-bicep-curl', 'incline-dumbbell-curl', 'hammer-curls', 'preacher-curl']
  },
  triceps: {
    id: 'triceps',
    name: 'Triceps Brachii (All 3 Heads)',
    category: 'Arms',
    description: 'Posterior upper-arm muscle (lateral, long, medial heads) responsible for elbow extension.',
    meshNodeName: 'Triceps_Brachii',
    antagonistId: 'biceps',
    relatedExerciseIds: ['rope-tricep-pushdown', 'skull-crushers', 'overhead-cable-tricep-extension', 'close-grip-bench-press']
  },
  forearms: {
    id: 'forearms',
    name: 'Forearm Flexors & Extensors',
    category: 'Arms',
    description: 'Forearm musculature providing grip strength and wrist stability.',
    meshNodeName: 'Forearms',
    relatedExerciseIds: ['wrist-curls', 'farmer-walks', 'dead-hangs']
  },
  quadriceps: {
    id: 'quadriceps',
    name: 'Quadriceps Femoris',
    category: 'Legs',
    description: 'Four-headed front thigh muscle group responsible for knee extension.',
    meshNodeName: 'Quadriceps',
    antagonistId: 'hamstrings',
    relatedExerciseIds: ['barbell-back-squat', 'leg-press', 'leg-extensions', 'bulgarian-split-squats', 'hack-squats']
  },
  hamstrings: {
    id: 'hamstrings',
    name: 'Hamstrings (Biceps Femoris / Semitendinosus)',
    category: 'Legs',
    description: 'Posterior thigh muscles responsible for knee flexion and hip extension.',
    meshNodeName: 'Hamstrings',
    antagonistId: 'quadriceps',
    relatedExerciseIds: ['romanian-deadlift', 'seated-leg-curl', 'lying-leg-curl', 'glute-ham-raise']
  },
  glutes: {
    id: 'glutes',
    name: 'Gluteus Maximus & Medius',
    category: 'Legs',
    description: 'Largest posterior muscle group driving hip extension, abduction, and pelvis stabilization.',
    meshNodeName: 'Gluteus',
    antagonistId: 'quadriceps',
    relatedExerciseIds: ['barbell-hip-thrust', 'barbell-back-squat', 'romanian-deadlift', 'cable-glute-kickbacks']
  },
  calves: {
    id: 'calves',
    name: 'Gastrocnemius & Soleus',
    category: 'Legs',
    description: 'Lower posterior leg muscles driving ankle plantarflexion.',
    meshNodeName: 'Calves',
    relatedExerciseIds: ['standing-calf-raises', 'seated-calf-raises', 'leg-press-calf-press']
  },
  abs: {
    id: 'abs',
    name: 'Rectus Abdominis (Six-Pack)',
    category: 'Core',
    description: 'Anterior core wall responsible for spinal flexion and abdominal compression.',
    meshNodeName: 'Rectus_Abdominis',
    antagonistId: 'lower_back',
    relatedExerciseIds: ['hanging-leg-raises', 'cable-crunches', 'plank', 'ab-wheel-rollout']
  },
  obliques: {
    id: 'obliques',
    name: 'Internal & External Obliques',
    category: 'Core',
    description: 'Lateral abdominal muscles driving torso rotation and lateral flexion.',
    meshNodeName: 'Obliques',
    relatedExerciseIds: ['hanging-windshield-wipers', 'side-plank', 'cable-woodchoppers', 'russian-twists']
  }
};
