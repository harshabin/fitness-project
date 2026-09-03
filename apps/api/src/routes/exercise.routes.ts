import { Router } from 'express';
import { db } from '../database/dbStore';
import { MUSCLE_GROUPS_REGISTRY } from '@fithealth/three-scenes';

export const exerciseRouter = Router();

// GET /exercises - List all exercises (with optional filter by muscle, category, or equipment)
exerciseRouter.get('/', (req, res) => {
  const { category, muscle, equipment, difficulty, search } = req.query;

  let results = [...db.exercises];

  if (category) {
    results = results.filter(e => e.category.toLowerCase() === (category as string).toLowerCase());
  }

  if (muscle) {
    results = results.filter(e => 
      e.targetMusclePrimary.includes(muscle as any) || e.targetMuscleSecondary.includes(muscle as any)
    );
  }

  if (equipment) {
    results = results.filter(e => e.equipment === equipment);
  }

  if (difficulty) {
    results = results.filter(e => e.difficulty === difficulty);
  }

  if (search) {
    const q = (search as string).toLowerCase();
    results = results.filter(e => 
      e.name.toLowerCase().includes(q) || 
      e.category.toLowerCase().includes(q) ||
      e.instructions.some(i => i.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

// GET /exercises/:id - Get single exercise details with 3D model configuration
exerciseRouter.get('/:id', (req, res) => {
  const exercise = db.exercises.find(e => e.id === req.params.id);
  if (!exercise) {
    return res.status(404).json({ error: 'Exercise not found' });
  }
  res.json(exercise);
});

// GET /muscle-groups - List all anatomical muscle groups
exerciseRouter.get('/meta/muscle-groups', (req, res) => {
  res.json(Object.values(MUSCLE_GROUPS_REGISTRY));
});

// GET /muscle-groups/:id/exercises - Get exercises targeting specific muscle
exerciseRouter.get('/meta/muscle-groups/:id/exercises', (req, res) => {
  const muscleId = req.params.id;
  const exercises = db.exercises.filter(e => 
    e.targetMusclePrimary.includes(muscleId as any) || e.targetMuscleSecondary.includes(muscleId as any)
  );
  res.json(exercises);
});
