import { Exercise, FoodItem } from '@fithealth/types';

export const SEED_EXERCISES: Exercise[] = [
  {
    id: 'barbell-bench-press',
    name: 'Barbell Flat Bench Press',
    category: 'Chest',
    targetMusclePrimary: ['chest_mid', 'chest_lower'],
    targetMuscleSecondary: ['deltoids_front', 'triceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Lie flat on the bench with eyes directly under the racked bar.',
      'Grip the barbell slightly wider than shoulder-width with thumbs wrapped.',
      'Retract scapulae, plant feet firmly, and unrack the bar with straight arms.',
      'Lower the bar with controlled cadence to mid-sternum, keeping elbows at a ~45-degree angle.',
      'Drive feet into the floor and press the barbell back up to full elbow extension without bouncing.'
    ],
    tips: [
      'Maintain an arch in the lower back while keeping buttocks glued to the bench.',
      'Think of bending the bar in half to engage lats and stabilize the shoulders.'
    ],
    commonMistakes: [
      'Flaring elbows out at 90 degrees, which places excessive stress on rotator cuffs.',
      'Bouncing the bar off the rib cage.'
    ],
    animationClipId: 'bench_press',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
    substituteExerciseIds: ['dumbbell-bench-press', 'push-ups']
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Chest Press',
    category: 'Chest',
    targetMusclePrimary: ['chest_upper'],
    targetMuscleSecondary: ['deltoids_front', 'triceps'],
    equipment: 'dumbbell',
    difficulty: 'intermediate',
    instructions: [
      'Set an adjustable bench to an incline angle between 30 and 45 degrees.',
      'Sit back with dumbbells rested on knees, kick them up to shoulder height, and plant feet.',
      'Press dumbbells up over upper chest with palms facing forward, rotating slightly inward at the top.',
      'Lower under control until upper arms are parallel to the floor, feeling a deep stretch across the clavicular head.'
    ],
    tips: ['Keep wrist joints stacked directly over elbow joints throughout the press.'],
    commonMistakes: ['Setting bench incline higher than 45 degrees, which shifts the emphasis to anterior deltoids.'],
    animationClipId: 'incline_press',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    substituteExerciseIds: ['incline-barbell-bench-press', 'low-to-high-cable-fly']
  },
  {
    id: 'barbell-back-squat',
    name: 'Barbell High-Bar Back Squat',
    category: 'Legs',
    targetMusclePrimary: ['quadriceps', 'glutes'],
    targetMuscleSecondary: ['hamstrings', 'calves', 'lower_back'],
    equipment: 'barbell',
    difficulty: 'advanced',
    instructions: [
      'Step under the bar, placing it across the upper trapezius muscles.',
      'Step back, establishing a shoulder-width stance with toes angled slightly outward (15-30 degrees).',
      'Take a deep diaphragmatic breath into the core and brace abdominal wall.',
      'Break simultaneously at the hips and knees, descending until hip crease passes below the top of the kneecap.',
      'Drive through mid-foot and stand explosively back to starting position.'
    ],
    tips: [
      'Keep chest elevated and knees tracking in line with your 2nd and 3rd toes.',
      'Maintain neutral spine curvature throughout the descent.'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse) on ascent.',
      'Rising on toes instead of maintaining full foot contact.'
    ],
    animationClipId: 'squat',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    substituteExerciseIds: ['leg-press', 'goblet-squat']
  },
  {
    id: 'conventional-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'Back',
    targetMusclePrimary: ['lower_back', 'hamstrings', 'glutes'],
    targetMuscleSecondary: ['traps', 'lats', 'forearms', 'quadriceps'],
    equipment: 'barbell',
    difficulty: 'advanced',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot (about 1 inch from shins).',
      'Hinge at the hips and grip the bar just outside your knees with an overhand or mixed grip.',
      'Bring shins forward until they touch the bar, pull chest up to wedge into position, and engage lats.',
      'Drive through the floor, pulling the bar straight up along your shins and thighs to a full standing lockout.'
    ],
    tips: ['Pull the slack out of the barbell before initiating the floor drive.'],
    commonMistakes: [
      'Rounding the lumbar spine under heavy loads.',
      'Allowing the barbell to drift forward away from the body.'
    ],
    animationClipId: 'deadlift',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    substituteExerciseIds: ['romanian-deadlift', 'trap-bar-deadlift']
  },
  {
    id: 'overhead-barbell-press',
    name: 'Standing Overhead Barbell Press (OHP)',
    category: 'Shoulders',
    targetMusclePrimary: ['deltoids_front'],
    targetMuscleSecondary: ['deltoids_side', 'triceps', 'traps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Rack the barbell at collarbone height, gripping just outside shoulder width.',
      'Squeeze glutes and brace core tightly to lock pelvis and lumbar spine.',
      'Press the bar straight upward, tucking chin back slightly as it clears the face.',
      'Push head forward through the window of your arms at top lockout with arms fully extended.'
    ],
    tips: ['Keep forearms vertical to the floor throughout the entire movement.'],
    commonMistakes: ['Excessively hyperextending the lower back instead of engaging glutes and core.'],
    animationClipId: 'overhead_press',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    substituteExerciseIds: ['seated-dumbbell-shoulder-press']
  },
  {
    id: 'lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    category: 'Back',
    targetMusclePrimary: ['lats'],
    targetMuscleSecondary: ['rhomboids', 'biceps', 'traps'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Sit comfortably at the lat pulldown station with thighs secured firmly under the leg pads.',
      'Grip the wide bar with an overhand grip slightly wider than shoulder width.',
      'Lean back slightly (~10-15 degrees), depress scapulae, and pull the bar smoothly down to upper chest.',
      'Pause briefly in peak contraction, feeling lats squeeze, and slowly return the bar under control.'
    ],
    tips: ['Focus on pulling your elbows down into your back pockets.'],
    commonMistakes: ['Using momentum and swinging upper body back and forth.'],
    animationClipId: 'lat_pulldown',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&q=80',
    substituteExerciseIds: ['pull-ups']
  },
  {
    id: 'pull-ups',
    name: 'Bodyweight Pull-Ups',
    category: 'Back',
    targetMusclePrimary: ['lats'],
    targetMuscleSecondary: ['biceps', 'rhomboids', 'forearms'],
    equipment: 'pullup_bar',
    difficulty: 'intermediate',
    instructions: [
      'Hang from a pull-up bar with an overhand grip just outside shoulder width.',
      'Start from a dead hang with arms fully extended and scapulae retracted.',
      'Pull your chest toward the bar by driving elbows down and back.',
      'Continue until chin clears the bar, hold for a split second, and lower with complete control.'
    ],
    tips: ['Avoid kicking or kipping legs to ensure strict lat isolation.'],
    commonMistakes: ['Doing partial reps without achieving full elbow extension at the bottom.'],
    animationClipId: 'pullup',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&q=80',
    substituteExerciseIds: ['lat-pulldown', 'resistance-band-pull-ups']
  },
  {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row',
    category: 'Back',
    targetMusclePrimary: ['lats', 'rhomboids'],
    targetMuscleSecondary: ['traps', 'deltoids_rear', 'biceps', 'lower_back'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Hinge at hips with knees slightly bent until torso is roughly 45 degrees to the floor.',
      'Grip the barbell overhand shoulder-width apart, arms hanging straight down.',
      'Row the barbell up toward lower rib cage, driving elbows back and squeezing shoulder blades together.',
      'Lower slowly under control to full arm stretch.'
    ],
    tips: ['Keep neck neutral and avoid looking up at the ceiling.'],
    commonMistakes: ['Jerking torso upright during the pull.'],
    animationClipId: 'bent_over_row',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    substituteExerciseIds: ['single-arm-dumbbell-row', 'seated-cable-row']
  },
  {
    id: 'barbell-bicep-curl',
    name: 'Standing Barbell Bicep Curl',
    category: 'Arms',
    targetMusclePrimary: ['biceps'],
    targetMuscleSecondary: ['forearms'],
    equipment: 'barbell',
    difficulty: 'beginner',
    instructions: [
      'Stand upright with feet hip-width apart holding a barbell with underhand grip shoulder-width apart.',
      'Keep elbows pinned closely against your ribs.',
      'Curl the bar upward by flexing biceps until forearms are near vertical.',
      'Squeeze biceps hard at the peak, then lower under control for a 2-3 second negative.'
    ],
    tips: ['Do not let elbows swing forward during the curl.'],
    commonMistakes: ['Using lower back swing to heave the weight up.'],
    animationClipId: 'bicep_curl',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    substituteExerciseIds: ['incline-dumbbell-curl', 'cable-curl']
  },
  {
    id: 'rope-tricep-pushdown',
    name: 'Cable Rope Tricep Pushdown',
    category: 'Arms',
    targetMusclePrimary: ['triceps'],
    targetMuscleSecondary: ['forearms'],
    equipment: 'cable',
    difficulty: 'beginner',
    instructions: [
      'Attach a rope to a high cable pulley and grip both ends with palms facing each other.',
      'Lean slightly forward and pin elbows firmly to your sides.',
      'Extend arms straight down by flexing triceps, flaring the rope ends apart at the bottom lockout.',
      'Slowly allow the rope to rise back to 90 degrees at the elbow joint.'
    ],
    tips: ['Focus on spreading the rope handles apart at bottom contraction.'],
    commonMistakes: ['Letting elbows drift forward and backward.'],
    animationClipId: 'tricep_pushdown',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80',
    substituteExerciseIds: ['skull-crushers', 'overhead-cable-tricep-extension']
  },
  {
    id: 'dumbbell-lateral-raises',
    name: 'Standing Dumbbell Lateral Raise',
    category: 'Shoulders',
    targetMusclePrimary: ['deltoids_side'],
    targetMuscleSecondary: ['traps', 'forearms'],
    equipment: 'dumbbell',
    difficulty: 'beginner',
    instructions: [
      'Hold a pair of dumbbells at your sides with palms facing inward and slight elbow bend.',
      'Hinge forward very slightly at the hips.',
      'Raise dumbbells out to the sides in the scapular plane until upper arms are parallel to the floor.',
      'Lead with elbows and pour imaginary water pitchers at the top, then lower with control.'
    ],
    tips: ['Think of pushing the weights outward toward the walls rather than straight up.'],
    commonMistakes: ['Shrugging traps and using heavy momentum to swing weights up.'],
    animationClipId: 'lateral_raise',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80',
    substituteExerciseIds: ['cable-lateral-raises']
  },
  {
    id: 'leg-extensions',
    name: 'Seated Quadriceps Leg Extension',
    category: 'Legs',
    targetMusclePrimary: ['quadriceps'],
    targetMuscleSecondary: [],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust the back pad so your knee joint aligns directly with the machine pivot point.',
      'Place shin pad just above ankles and grip side handles for pelvic stability.',
      'Extend knees smoothly until legs are straight out in front of you.',
      'Squeeze quads for a 1-second peak contraction and lower under controlled tension.'
    ],
    tips: ['Do not let the weight stack slam at the bottom.'],
    commonMistakes: ['Using explosive momentum instead of strict quadriceps tension.'],
    animationClipId: 'leg_extension',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    substituteExerciseIds: ['sissy-squats', 'bulgarian-split-squats']
  },
  {
    id: 'seated-leg-curl',
    name: 'Seated Hamstring Leg Curl',
    category: 'Legs',
    targetMusclePrimary: ['hamstrings'],
    targetMuscleSecondary: ['calves'],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Adjust the machine so thigh pad rests securely against your quads and lower pad is against Achilles tendon.',
      'Flex hamstrings and curl heels down and back under the seat as far as comfortable.',
      'Pause at full knee flexion and slowly return the weight over 3 seconds.'
    ],
    tips: ['Point toes forward or slightly dorsiflexed to maximize hamstring recruitment.'],
    commonMistakes: ['Lifting hips off the seat during the curl.'],
    animationClipId: 'leg_curl',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    substituteExerciseIds: ['lying-leg-curl', 'romanian-deadlift']
  },
  {
    id: 'barbell-hip-thrust',
    name: 'Barbell Glute Hip Thrust',
    category: 'Legs',
    targetMusclePrimary: ['glutes'],
    targetMuscleSecondary: ['hamstrings', 'quadriceps'],
    equipment: 'barbell',
    difficulty: 'intermediate',
    instructions: [
      'Sit on floor with upper back against a bench and a padded barbell rolled across your hips.',
      'Plant feet flat on the floor shoulder-width apart, knees at 90 degrees at the top.',
      'Drive through heels and extend hips upward until thighs and torso form a straight horizontal line.',
      'Squeeze glutes intensely at top lockout and lower under control.'
    ],
    tips: ['Keep chin tucked to chest throughout the movement to prevent lumbar arching.'],
    commonMistakes: ['Hyperextending the lower back rather than locking out via hip extension.'],
    animationClipId: 'hip_thrust',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    substituteExerciseIds: ['glute-bridges', 'cable-glute-kickbacks']
  },
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg / Knee Raises',
    category: 'Core',
    targetMusclePrimary: ['abs'],
    targetMuscleSecondary: ['obliques', 'forearms'],
    equipment: 'pullup_bar',
    difficulty: 'intermediate',
    instructions: [
      'Hang from a pull-up bar with arms straight and body still.',
      'Flex core and curl pelvis upward, raising straight legs (or bent knees) toward chest level.',
      'Pause at the top to emphasize lower abdominal contraction, then lower legs slowly without swinging.'
    ],
    tips: ['Think of rolling your pelvis toward your sternum rather than just swinging legs.'],
    commonMistakes: ['Using pendulum swing momentum.'],
    animationClipId: 'hanging_leg_raise',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&q=80',
    substituteExerciseIds: ['cable-crunches', 'lying-leg-raises']
  },
  {
    id: 'standing-calf-raises',
    name: 'Standing Machine Calf Raise',
    category: 'Legs',
    targetMusclePrimary: ['calves'],
    targetMuscleSecondary: [],
    equipment: 'machine',
    difficulty: 'beginner',
    instructions: [
      'Place balls of feet on the edge of the block with shoulder pads resting on shoulders.',
      'Lower heels as far as possible to feel a deep calf stretch.',
      'Drive onto big toes and raise heels as high as possible into peak contraction.',
      'Hold the peak for 2 seconds before descending.'
    ],
    tips: ['Keep knees soft but extended to target the gastrocnemius head.'],
    commonMistakes: ['Bouncing rapidly on the balls of the feet.'],
    animationClipId: 'calf_raise',
    fallbackMediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80',
    substituteExerciseIds: ['seated-calf-raises', 'single-leg-dumbbell-calf-raises']
  }
];

export const SEED_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-oats-whey',
    name: 'Rolled Oats with Whey & Berries',
    servingSize: '1 bowl (80g oats + 1 scoop whey)',
    servingGrams: 350,
    calories: 460,
    proteinG: 34,
    carbsG: 62,
    fatG: 8,
    fiberG: 9,
    dietPreference: ['omnivore', 'vegetarian'],
    cuisine: 'Breakfast',
    icon: '🥣'
  },
  {
    id: 'food-egg-avocado-toast',
    name: 'Whole Grain Avocado & Poached Egg Toast',
    servingSize: '2 slices + 2 eggs + 1/2 avocado',
    servingGrams: 280,
    calories: 440,
    proteinG: 22,
    carbsG: 38,
    fatG: 22,
    fiberG: 8,
    dietPreference: ['omnivore', 'vegetarian', 'pescatarian'],
    cuisine: 'Breakfast',
    icon: '🥑'
  },
  {
    id: 'food-tofu-scramble',
    name: 'Spiced Turmeric Tofu Scramble with Sourdough',
    servingSize: '1 plate (200g firm tofu + veggies)',
    servingGrams: 320,
    calories: 390,
    proteinG: 28,
    carbsG: 36,
    fatG: 14,
    fiberG: 7,
    dietPreference: ['vegan', 'vegetarian'],
    cuisine: 'Breakfast',
    icon: '🌱'
  },
  {
    id: 'food-chicken-rice-bowl',
    name: 'Grilled Chicken Breast with Jasmine Rice & Broccoli',
    servingSize: '1 plate (200g chicken + 150g rice + 100g broccoli)',
    servingGrams: 450,
    calories: 560,
    proteinG: 52,
    carbsG: 64,
    fatG: 8,
    fiberG: 6,
    dietPreference: ['omnivore'],
    cuisine: 'Healthy Clean',
    icon: '🍗'
  },
  {
    id: 'food-salmon-quinoa-bowl',
    name: 'Atlantic Salmon Fillet with Quinoa & Asparagus',
    servingSize: '1 bowl (180g salmon + 150g quinoa + asparagus)',
    servingGrams: 420,
    calories: 590,
    proteinG: 44,
    carbsG: 46,
    fatG: 24,
    fiberG: 6,
    dietPreference: ['omnivore', 'pescatarian'],
    cuisine: 'Mediterranean',
    icon: '🐟'
  },
  {
    id: 'food-lentil-paneer-bowl',
    name: 'Paneer Tikka with Yellow Dal & Brown Rice',
    servingSize: '1 bowl (120g paneer + 1 cup dal + 1 cup rice)',
    servingGrams: 460,
    calories: 580,
    proteinG: 36,
    carbsG: 66,
    fatG: 18,
    fiberG: 10,
    dietPreference: ['vegetarian'],
    cuisine: 'Indian',
    icon: '🍛'
  },
  {
    id: 'food-chickpea-tempeh-curry',
    name: 'Coconut Chickpea & Tempeh Green Bowl',
    servingSize: '1 large bowl (150g tempeh + 150g chickpeas)',
    servingGrams: 440,
    calories: 530,
    proteinG: 38,
    carbsG: 58,
    fatG: 16,
    fiberG: 14,
    dietPreference: ['vegan', 'vegetarian'],
    cuisine: 'Fusion',
    icon: '🥗'
  },
  {
    id: 'food-greek-yogurt-snack',
    name: 'High-Protein Greek Yogurt Parfait with Honey & Almonds',
    servingSize: '200g Greek Yogurt + 20g almonds + honey',
    servingGrams: 240,
    calories: 280,
    proteinG: 24,
    carbsG: 22,
    fatG: 10,
    fiberG: 3,
    dietPreference: ['omnivore', 'vegetarian'],
    cuisine: 'Snack',
    icon: '🥛'
  },
  {
    id: 'food-protein-shake-banana',
    name: 'Isolate Whey Shake with Peanut Butter & Banana',
    servingSize: '1 shaker (1 scoop whey + 1 banana + 20g PB)',
    servingGrams: 400,
    calories: 360,
    proteinG: 32,
    carbsG: 35,
    fatG: 9,
    fiberG: 4,
    dietPreference: ['omnivore', 'vegetarian'],
    cuisine: 'Shake',
    icon: '🥤'
  },
  {
    id: 'food-lean-beef-sweet-potato',
    name: 'Lean Grass-Fed Sirloin with Roasted Sweet Potato',
    servingSize: '180g beef + 200g sweet potato + green beans',
    servingGrams: 450,
    calories: 580,
    proteinG: 48,
    carbsG: 52,
    fatG: 16,
    fiberG: 7,
    dietPreference: ['omnivore'],
    cuisine: 'Dinner',
    icon: '🥩'
  }
];
