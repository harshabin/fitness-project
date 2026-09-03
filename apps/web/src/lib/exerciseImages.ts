// Curated high-resolution 2D exercise reference photographs and diagrams
export interface ExerciseVisualMeta {
  imageUrl: string;
  thumbnailUrl: string;
  targetCategory: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  executionKeyCue: string;
  tempoAdvice: string;
}

export const EXERCISE_VISUAL_REGISTRY: Record<string, ExerciseVisualMeta> = {
  'barbell-bench-press': {
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Chest',
    primaryMuscles: ['Mid Pectorals', 'Lower Pectorals'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    executionKeyCue: 'Scapulae retracted & depressed. 45° elbow tuck with controlled sternum touch.',
    tempoAdvice: '3-0-1-0 (3s lowering, explosive press)'
  },
  'incline-dumbbell-press': {
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Chest',
    primaryMuscles: ['Upper Clavicular Pectorals'],
    secondaryMuscles: ['Front Deltoids', 'Triceps'],
    executionKeyCue: 'Bench angle at 30-35°. Deep clavicular stretch at bottom, squeeze apex at top.',
    tempoAdvice: '3-1-1-0 (Full stretch at base)'
  },
  'barbell-back-squat': {
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Legs',
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Spinal Erectors', 'Calves'],
    executionKeyCue: 'Chest elevated, 360° intra-abdominal brace, descend until hip crease clears knee line.',
    tempoAdvice: '3-1-1-0 (Controlled descent, explosive ascent)'
  },
  'conventional-deadlift': {
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Back & Posterior Chain',
    primaryMuscles: ['Lower Back / Erector Spinae', 'Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lats', 'Trapezius', 'Forearms'],
    executionKeyCue: 'Wedge hips, pull slack out of bar, drive floor away while dragging bar along shins.',
    tempoAdvice: '1-0-1-1 (Reset each rep with tight brace)'
  },
  'overhead-barbell-press': {
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Shoulders',
    primaryMuscles: ['Anterior Deltoids'],
    secondaryMuscles: ['Lateral Deltoids', 'Triceps', 'Upper Traps'],
    executionKeyCue: 'Glutes clamped, core braced. Press vertically, pull head through arm window at lockout.',
    tempoAdvice: '2-0-1-1 (Lockout overhead with scapular elevation)'
  },
  'lat-pulldown': {
    imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Back',
    primaryMuscles: ['Latissimus Dorsi'],
    secondaryMuscles: ['Rhomboids', 'Biceps', 'Mid Traps'],
    executionKeyCue: 'Drive elbows down into rear pockets. Slight 10° torso lean, touch upper sternum.',
    tempoAdvice: '3-0-1-1 (1s peak lat contraction)'
  },
  'pull-ups': {
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Back',
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['Biceps', 'Rhomboids', 'Forearms'],
    executionKeyCue: 'Full dead hang at bottom. Depress scapulae and pull chest up to the bar without kipping.',
    tempoAdvice: '2-0-1-1 (Strict bodyweight form)'
  },
  'barbell-bent-over-row': {
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Back',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Mid Traps'],
    secondaryMuscles: ['Rear Deltoids', 'Biceps', 'Lower Back'],
    executionKeyCue: '45° hip hinge, pull bar into lower ribcage/navel, drive elbows behind back.',
    tempoAdvice: '2-0-1-1 (Squeeze shoulder blades together)'
  },
  'barbell-bicep-curl': {
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Arms',
    primaryMuscles: ['Biceps Brachii (Short & Long Head)'],
    secondaryMuscles: ['Brachialis', 'Forearm Flexors'],
    executionKeyCue: 'Pin elbows to torso sides. Strict supination without swinging lumbar spine.',
    tempoAdvice: '3-0-1-1 (3s negative lowering phase)'
  },
  'rope-tricep-pushdown': {
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Arms',
    primaryMuscles: ['Triceps Brachii (Lateral & Medial Head)'],
    secondaryMuscles: ['Forearms', 'Anconeus'],
    executionKeyCue: 'Flare rope ends outward at bottom lockout to maximize lateral head peak contraction.',
    tempoAdvice: '2-0-1-1 (Full lockout pause at bottom)'
  },
  'dumbbell-lateral-raises': {
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Shoulders',
    primaryMuscles: ['Lateral Deltoids (Side Shoulder)'],
    secondaryMuscles: ['Anterior/Posterior Delts', 'Upper Traps'],
    executionKeyCue: 'Raise in the scapular plane (30° forward). Lead with elbows, avoid trap shrugging.',
    tempoAdvice: '2-1-1-0 (1s pause at parallel)'
  },
  'leg-extensions': {
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Legs',
    primaryMuscles: ['Quadriceps (Rectus Femoris & Vasti)'],
    secondaryMuscles: ['Patellar Tendon / Stabilizers'],
    executionKeyCue: 'Align knee axis with machine fulcrum. Full extension with locked quad squeeze.',
    tempoAdvice: '2-1-1-0 (Controlled eccentric)'
  },
  'seated-leg-curl': {
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Legs',
    primaryMuscles: ['Hamstrings (Biceps Femoris & Semitendinosus)'],
    secondaryMuscles: ['Gastrocnemius (Calves)'],
    executionKeyCue: 'Dorsiflex toes, curl heels under seat, slow 3-second loaded stretch.',
    tempoAdvice: '3-0-1-1 (Emphasize negative stretch)'
  },
  'barbell-hip-thrust': {
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Legs / Glutes',
    primaryMuscles: ['Gluteus Maximus', 'Gluteus Medius'],
    secondaryMuscles: ['Hamstrings', 'Quadriceps'],
    executionKeyCue: 'Chin tucked, drive through heels, lock hips into full horizontal line at top.',
    tempoAdvice: '2-1-1-0 (Hard 1s glute contraction at top)'
  },
  'hanging-leg-raises': {
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Core',
    primaryMuscles: ['Rectus Abdominis (Lower & Mid Abs)'],
    secondaryMuscles: ['Obliques', 'Hip Flexors', 'Forearms'],
    executionKeyCue: 'Roll pelvis toward sternum rather than just swinging legs. No swing momentum.',
    tempoAdvice: '2-1-1-0 (Slow lowering)'
  },
  'standing-calf-raises': {
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1200&q=85',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80',
    targetCategory: 'Legs / Calves',
    primaryMuscles: ['Gastrocnemius (Lateral & Medial Heads)'],
    secondaryMuscles: ['Soleus', 'Tibialis Posterior'],
    executionKeyCue: 'Full ankle dorsiflexion deep stretch at bottom, drive up onto big toe balls with 2s squeeze.',
    tempoAdvice: '2-2-1-0 (2s pause in stretched position)'
  }
};

export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85';

export function getExerciseVisual(exerciseId?: string, fallbackUrl?: string): ExerciseVisualMeta {
  if (exerciseId && EXERCISE_VISUAL_REGISTRY[exerciseId]) {
    return EXERCISE_VISUAL_REGISTRY[exerciseId];
  }
  return {
    imageUrl: fallbackUrl || DEFAULT_FALLBACK_IMAGE,
    thumbnailUrl: fallbackUrl || DEFAULT_FALLBACK_IMAGE,
    targetCategory: 'Strength & Conditioning',
    primaryMuscles: ['Target Muscle Group'],
    secondaryMuscles: ['Stabilizers'],
    executionKeyCue: 'Maintain strict postural control and consistent cadence.',
    tempoAdvice: '2-0-1-0'
  };
}
