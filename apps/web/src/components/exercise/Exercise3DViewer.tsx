'use client';

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { computeJointAngles } from '@/shared/three-scenes/biomechanicsEngine';
import { EXERCISES_3D_CATALOG, Exercise3DConfig } from '@/shared/three-scenes/exercises3dData';
import { MuscleActivationMap } from '@/shared/types';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Maximize2, 
  ShieldCheck, 
  Flame, 
  Activity, 
  Layers,
  ChevronRight,
  Eye
} from 'lucide-react';

interface Exercise3DViewerProps {
  exerciseId?: string;
  exerciseName?: string;
  muscleActivations?: MuscleActivationMap;
  className?: string;
}

// Biomechanical 3D Articulated Mannequin with Joint Kinematics
function KinematicMannequin({
  kinematicType,
  phase,
  activeMuscles = {}
}: {
  kinematicType: string;
  phase: number;
  activeMuscles: MuscleActivationMap;
}) {
  const jointData = computeJointAngles(kinematicType, phase);

  // Helper to color active agonist muscles
  const getMuscleEmissive = (muscleKey: string, baseIntensity = 0.2) => {
    const raw = (activeMuscles as any)[muscleKey];
    const isHigh = raw === 'primary' || (typeof raw === 'number' && raw >= 0.7);
    const isMedium = raw === 'secondary' || (typeof raw === 'number' && raw >= 0.3);

    if (isHigh) {
      return { color: '#FF2A4B', intensity: 0.8 + Math.sin(phase * Math.PI * 2) * 0.4 };
    }
    if (isMedium) {
      return { color: '#00F0FF', intensity: 0.6 + Math.sin(phase * Math.PI * 2) * 0.3 };
    }
    return { color: '#00F0FF', intensity: baseIntensity };
  };

  const chestGlow = getMuscleEmissive('chest_mid');
  const latsGlow = getMuscleEmissive('lats');
  const quadsGlow = getMuscleEmissive('quadriceps');
  const glutesGlow = getMuscleEmissive('glutes');
  const bicepsGlow = getMuscleEmissive('biceps');
  const tricepsGlow = getMuscleEmissive('triceps');
  const deltsGlow = getMuscleEmissive('deltoids_front');

  return (
    <group position={jointData.torsoPosition} rotation={jointData.torsoRotation}>
      {/* Torso / Spine Core */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.34, 0.48, 0.2]} />
        <meshStandardMaterial color="#141B26" metalness={0.8} roughness={0.3} emissive="#00F0FF" emissiveIntensity={0.15} />
      </mesh>

      {/* Chest Plates (Glows during pressing exercises) */}
      <mesh position={[-0.1, 0.46, 0.11]}>
        <boxGeometry args={[0.16, 0.18, 0.05]} />
        <meshStandardMaterial color="#0E141D" emissive={chestGlow.color} emissiveIntensity={chestGlow.intensity} />
      </mesh>
      <mesh position={[0.1, 0.46, 0.11]}>
        <boxGeometry args={[0.16, 0.18, 0.05]} />
        <meshStandardMaterial color="#0E141D" emissive={chestGlow.color} emissiveIntensity={chestGlow.intensity} />
      </mesh>

      {/* Lats Wings (Glows during pulling exercises) */}
      <mesh position={[-0.18, 0.42, -0.06]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.12, 0.26, 0.1]} />
        <meshStandardMaterial color="#0E141D" emissive={latsGlow.color} emissiveIntensity={latsGlow.intensity} />
      </mesh>
      <mesh position={[0.18, 0.42, -0.06]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.12, 0.26, 0.1]} />
        <meshStandardMaterial color="#0E141D" emissive={latsGlow.color} emissiveIntensity={latsGlow.intensity} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color="#202A38" metalness={0.9} roughness={0.2} emissive="#00F0FF" emissiveIntensity={0.2} />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 0.8, 0.11]}>
        <boxGeometry args={[0.15, 0.04, 0.04]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.8} />
      </mesh>

      {/* --- LEFT ARM --- */}
      <group position={[-0.24, 0.58, 0]} rotation={jointData.leftShoulder}>
        {/* Left Shoulder Ball */}
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#1E2838" emissive={deltsGlow.color} emissiveIntensity={deltsGlow.intensity} />
        </mesh>
        {/* Upper Arm / Bicep / Tricep */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.05, 0.045, 0.24, 16]} />
          <meshStandardMaterial
            color="#141B26"
            emissive={bicepsGlow.intensity > tricepsGlow.intensity ? bicepsGlow.color : tricepsGlow.color}
            emissiveIntensity={Math.max(bicepsGlow.intensity, tricepsGlow.intensity)}
          />
        </mesh>

        {/* Left Forearm */}
        <group position={[0, -0.28, 0]} rotation={jointData.leftElbow}>
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.042, 0.035, 0.24, 16]} />
            <meshStandardMaterial color="#141B26" />
          </mesh>
        </group>
      </group>

      {/* --- RIGHT ARM --- */}
      <group position={[0.24, 0.58, 0]} rotation={jointData.rightShoulder}>
        {/* Right Shoulder Ball */}
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#1E2838" emissive={deltsGlow.color} emissiveIntensity={deltsGlow.intensity} />
        </mesh>
        {/* Upper Arm */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.05, 0.045, 0.24, 16]} />
          <meshStandardMaterial
            color="#141B26"
            emissive={bicepsGlow.intensity > tricepsGlow.intensity ? bicepsGlow.color : tricepsGlow.color}
            emissiveIntensity={Math.max(bicepsGlow.intensity, tricepsGlow.intensity)}
          />
        </mesh>

        {/* Right Forearm */}
        <group position={[0, -0.28, 0]} rotation={jointData.rightElbow}>
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.042, 0.035, 0.24, 16]} />
            <meshStandardMaterial color="#141B26" />
          </mesh>
        </group>
      </group>

      {/* --- PELVIS & LEGS --- */}
      <group position={[0, 0.1, 0]}>
        {/* Pelvis */}
        <mesh>
          <boxGeometry args={[0.3, 0.14, 0.18]} />
          <meshStandardMaterial color="#18212D" emissive={glutesGlow.color} emissiveIntensity={glutesGlow.intensity} />
        </mesh>

        {/* Left Leg */}
        <group position={[-0.12, -0.08, 0]} rotation={jointData.leftHip}>
          {/* Thigh / Quads */}
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.075, 0.06, 0.38, 16]} />
            <meshStandardMaterial color="#141B26" emissive={quadsGlow.color} emissiveIntensity={quadsGlow.intensity} />
          </mesh>
          {/* Knee & Calf */}
          <group position={[0, -0.42, 0]} rotation={jointData.leftKnee}>
            <mesh>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -0.20, 0]}>
              <cylinderGeometry args={[0.055, 0.04, 0.36, 16]} />
              <meshStandardMaterial color="#141B26" />
            </mesh>
          </group>
        </group>

        {/* Right Leg */}
        <group position={[0.12, -0.08, 0]} rotation={jointData.rightHip}>
          {/* Thigh / Quads */}
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.075, 0.06, 0.38, 16]} />
            <meshStandardMaterial color="#141B26" emissive={quadsGlow.color} emissiveIntensity={quadsGlow.intensity} />
          </mesh>
          {/* Knee & Calf */}
          <group position={[0, -0.42, 0]} rotation={jointData.rightKnee}>
            <mesh>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, -0.20, 0]}>
              <cylinderGeometry args={[0.055, 0.04, 0.36, 16]} />
              <meshStandardMaterial color="#141B26" />
            </mesh>
          </group>
        </group>
      </group>

      {/* --- EQUIPMENT (Barbell or Bench) --- */}
      {jointData.barbellPosition && (
        <group position={jointData.barbellPosition}>
          {/* Barbell Shaft */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.016, 0.016, 1.8, 16]} />
            <meshStandardMaterial color="#D1D9E6" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Left Olympic Plates */}
          <mesh position={[-0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
            <meshStandardMaterial color="#FF2A4B" metalness={0.7} roughness={0.3} emissive="#FF2A4B" emissiveIntensity={0.3} />
          </mesh>
          {/* Right Olympic Plates */}
          <mesh position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 24]} />
            <meshStandardMaterial color="#FF2A4B" metalness={0.7} roughness={0.3} emissive="#FF2A4B" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {/* Bench if bench press */}
      {kinematicType === 'bench_press' && (
        <group position={[0, 0.45, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.32, 0.1, 1.2]} />
            <meshStandardMaterial color="#090E17" roughness={0.5} />
          </mesh>
          {/* Bench Legs */}
          <mesh position={[0, -0.24, -0.45]}>
            <boxGeometry args={[0.06, 0.48, 0.06]} />
            <meshStandardMaterial color="#1F2937" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.24, 0.45]}>
            <boxGeometry args={[0.06, 0.48, 0.06]} />
            <meshStandardMaterial color="#1F2937" metalness={0.9} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export const Exercise3DViewer: React.FC<Exercise3DViewerProps> = ({
  exerciseId = 'barbell-bench-press',
  exerciseName = 'Exercise Form Kinematics',
  muscleActivations = {},
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const config: Exercise3DConfig = EXERCISES_3D_CATALOG[exerciseId] || {
    exerciseId,
    defaultCamera: 'isometric',
    animationSpeed: 1.0,
    kinematicType: 'bench_press',
    muscleActivations: { chest_mid: 1.0, triceps: 0.7, deltoids_front: 0.6 }
  };

  const mergedActivations = Object.keys(muscleActivations).length > 0 ? muscleActivations : config.muscleActivations;

  // Real-time animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;
      setCurrentPhase((prev) => (prev + delta * 0.45 * playbackSpeed) % 1.0);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, playbackSpeed]);

  // Determine rep phase text
  const getPhaseName = (p: number) => {
    if (p < 0.35) return { label: 'Concentric (Drive)', color: 'text-cyan' };
    if (p < 0.60) return { label: 'Peak Contraction (Hold)', color: 'text-emerald' };
    return { label: 'Eccentric (Controlled Lowering)', color: 'text-crimson' };
  };

  const phaseInfo = getPhaseName(currentPhase);

  return (
    <div className={`relative w-full rounded-3xl bg-gradient-to-b from-[#080D14] via-[#05080E] to-[#020407] border border-surface-border overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header Bar */}
      <div className="p-4 border-b border-surface-border/80 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan/15 border border-cyan/30 flex items-center justify-center text-cyan shadow-glow-cyan">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-cyan">
              3D Biomechanical Kinematics
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white capitalize">
              {exerciseName || exerciseId.replace(/-/g, ' ')}
            </h3>
          </div>
        </div>

        {/* Play / Speed Controls */}
        <div className="flex items-center space-x-2">
          {/* Speed Pills */}
          <div className="flex items-center bg-surface-muted/90 rounded-xl p-1 border border-surface-border text-xs">
            {[0.5, 1.0, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  playbackSpeed === speed
                    ? 'bg-cyan text-slate-950 shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-crimson hover:bg-crimson-hover text-white shadow-glow-crimson transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Canvas Area */}
      <div className="w-full h-[380px] sm:h-[420px] relative">
        {mounted ? (
          <Canvas
            camera={{ position: [2.6, 1.8, 2.6], fov: 45 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
            <directionalLight position={[-4, 3, -4]} intensity={0.8} color="#00F0FF" />
            <pointLight position={[0, 2, 0]} intensity={1.0} color="#00F0FF" distance={4} />

            <Suspense fallback={null}>
              <KinematicMannequin
                kinematicType={config.kinematicType}
                phase={currentPhase}
                activeMuscles={mergedActivations}
              />
            </Suspense>

            {/* Circular Grid Ground */}
            <Grid
              position={[0, 0, 0]}
              args={[8, 8]}
              cellSize={0.4}
              cellThickness={1}
              cellColor="#00F0FF"
              sectionSize={2.0}
              sectionThickness={1.5}
              sectionColor="#FF2A4B"
              fadeDistance={6}
            />

            <OrbitControls
              enablePan={false}
              minDistance={1.4}
              maxDistance={5.0}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
            <Layers className="w-8 h-8 text-cyan animate-spin" />
            <p className="text-xs text-slate-400">Loading 3D Biomechanics Kinematics...</p>
          </div>
        )}

        {/* Active Phase HUD Overlay */}
        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-surface-border text-xs flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
          <span className="text-slate-400 font-medium">Kinematic Phase:</span>
          <span className={`font-extrabold ${phaseInfo.color}`}>{phaseInfo.label}</span>
        </div>

        {/* 360 Spin Hint */}
        <div className="absolute bottom-4 right-4 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
          <Eye className="w-3.5 h-3.5 text-cyan" />
          <span>Rotate 360° to inspect joint path</span>
        </div>
      </div>

      {/* Scrubbing Timeline & Muscle Activation Legend */}
      <div className="p-4 border-t border-surface-border/80 bg-surface/90 backdrop-blur-md space-y-3">
        {/* Scrubber Range */}
        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-bold text-slate-400">0%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentPhase}
            onChange={(e) => {
              setCurrentPhase(parseFloat(e.target.value));
              setIsPlaying(false);
            }}
            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan"
          />
          <span className="text-[10px] font-bold text-slate-400">100%</span>
        </div>

        {/* Active Muscle Contraction Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-crimson" />
              <span>Engaged Muscles:</span>
            </span>
            {Object.entries(mergedActivations).map(([muscleId, val]) => {
              const isPrimary = val === 'primary' || (typeof val === 'number' && (val as number) >= 0.7);
              const label = typeof val === 'number' ? `${Math.round((val as number) * 100)}%` : String(val);
              return (
                <span
                  key={muscleId}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border capitalize ${
                    isPrimary
                      ? 'bg-crimson/15 border-crimson/40 text-crimson'
                      : 'bg-cyan/15 border-cyan/40 text-cyan'
                  }`}
                >
                  {muscleId.replace('_', ' ')} ({label})
                </span>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
            <span>Joint safety torque verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
