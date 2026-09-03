'use client';

import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { MuscleGroupId } from '@/shared/types';
import { MUSCLE_GROUPS_REGISTRY } from '@/shared/three-scenes/muscleGroups';
import { CAMERA_PRESETS } from '@/shared/three-scenes/cameraPresets';
import { 
  RotateCw, 
  Eye, 
  Activity, 
  Flame, 
  Dumbbell, 
  ShieldCheck, 
  ChevronRight, 
  Layers
} from 'lucide-react';
import Link from 'next/link';

interface HumanModel3DViewerProps {
  onMuscleSelect?: (muscleId: MuscleGroupId) => void;
  className?: string;
}

// Camera controller component inside Canvas
function CameraRig({ targetCamera }: { targetCamera: { position: [number, number, number]; target: [number, number, number]; fov: number } }) {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(...targetCamera.position), 0.06);
    state.camera.lookAt(new THREE.Vector3(...targetCamera.target));
  });
  return null;
}

// Muscle Segment Box/Cylinder Component with hover & glow
interface MusclePartProps {
  id: MuscleGroupId;
  label: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  geometryType?: 'box' | 'cylinder' | 'sphere' | 'capsule';
  args?: any;
  isSelected: boolean;
  isHovered: boolean;
  recoveryPct: number;
  onSelect: (id: MuscleGroupId) => void;
  onHover: (id: MuscleGroupId | null) => void;
}

function MusclePart({
  id,
  label,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  geometryType = 'box',
  args = [0.2, 0.2, 0.2],
  isSelected,
  isHovered,
  recoveryPct,
  onSelect,
  onHover
}: MusclePartProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Determine glow color based on recovery status
  const getBaseColor = () => {
    if (isSelected) return '#00F0FF'; // Cyber cyan when active
    if (isHovered) return '#FF2A4B'; // Crimson on hover
    if (recoveryPct >= 90) return '#00E676'; // Emerald
    if (recoveryPct >= 70) return '#00F0FF'; // Cyan
    if (recoveryPct >= 50) return '#FFB800'; // Gold/Amber
    return '#FF2A4B'; // Crimson (needs rest)
  };

  const emissiveColor = getBaseColor();
  const emissiveIntensity = isSelected ? 0.9 : isHovered ? 0.7 : 0.25;

  useFrame((state) => {
    if (meshRef.current && (isSelected || isHovered)) {
      const pulse = (Math.sin(state.clock.elapsedTime * 6) + 1) / 2;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = emissiveIntensity + pulse * 0.35;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id);
      }}
      onPointerOut={() => onHover(null)}
      castShadow
      receiveShadow
    >
      {geometryType === 'box' && <boxGeometry args={args} />}
      {geometryType === 'cylinder' && <cylinderGeometry args={args} />}
      {geometryType === 'sphere' && <sphereGeometry args={args} />}
      {geometryType === 'capsule' && <capsuleGeometry args={args} />}
      
      <meshStandardMaterial
        color={isSelected ? '#0B1522' : isHovered ? '#1F0D15' : '#141A24'}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={0.25}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

// Full 3D Articulated Mannequin Assembly
function AnatomicalBodyMannequin({
  selectedMuscle,
  hoveredMuscle,
  onSelectMuscle,
  onHoverMuscle,
  recoveryData
}: {
  selectedMuscle: MuscleGroupId;
  hoveredMuscle: MuscleGroupId | null;
  onSelectMuscle: (id: MuscleGroupId) => void;
  onHoverMuscle: (id: MuscleGroupId | null) => void;
  recoveryData: Record<string, number>;
}) {
  return (
    <group position={[0, 0, 0]}>
      {/* Head & Neck (Neutral Metallic Skeleton) */}
      <mesh position={[0, 1.88, 0]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#243042" metalness={0.9} roughness={0.2} emissive="#00F0FF" emissiveIntensity={0.08} />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 1.89, 0.11]}>
        <boxGeometry args={[0.16, 0.05, 0.05]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.8} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.70, 0]}>
        <cylinderGeometry args={[0.06, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#18202C" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* --- CHEST (Anterior Torso) --- */}
      {/* Upper Chest (Left & Right) */}
      <MusclePart
        id="chest_upper"
        label="Upper Chest"
        position={[-0.13, 1.54, 0.11]}
        rotation={[0.15, 0.1, -0.05]}
        geometryType="box"
        args={[0.20, 0.11, 0.12]}
        isSelected={selectedMuscle === 'chest_upper'}
        isHovered={hoveredMuscle === 'chest_upper'}
        recoveryPct={recoveryData.chest_upper ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="chest_upper"
        label="Upper Chest"
        position={[0.13, 1.54, 0.11]}
        rotation={[0.15, -0.1, 0.05]}
        geometryType="box"
        args={[0.20, 0.11, 0.12]}
        isSelected={selectedMuscle === 'chest_upper'}
        isHovered={hoveredMuscle === 'chest_upper'}
        recoveryPct={recoveryData.chest_upper ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Mid Chest (Left & Right) */}
      <MusclePart
        id="chest_mid"
        label="Mid Chest"
        position={[-0.13, 1.42, 0.12]}
        rotation={[0, 0.08, 0]}
        geometryType="box"
        args={[0.21, 0.12, 0.12]}
        isSelected={selectedMuscle === 'chest_mid'}
        isHovered={hoveredMuscle === 'chest_mid'}
        recoveryPct={recoveryData.chest_mid ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="chest_mid"
        label="Mid Chest"
        position={[0.13, 1.42, 0.12]}
        rotation={[0, -0.08, 0]}
        geometryType="box"
        args={[0.21, 0.12, 0.12]}
        isSelected={selectedMuscle === 'chest_mid'}
        isHovered={hoveredMuscle === 'chest_mid'}
        recoveryPct={recoveryData.chest_mid ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Lower Chest (Left & Right) */}
      <MusclePart
        id="chest_lower"
        label="Lower Chest"
        position={[-0.12, 1.32, 0.10]}
        rotation={[-0.1, 0.05, 0]}
        geometryType="box"
        args={[0.19, 0.08, 0.11]}
        isSelected={selectedMuscle === 'chest_lower'}
        isHovered={hoveredMuscle === 'chest_lower'}
        recoveryPct={recoveryData.chest_lower ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="chest_lower"
        label="Lower Chest"
        position={[0.12, 1.32, 0.10]}
        rotation={[-0.1, -0.05, 0]}
        geometryType="box"
        args={[0.19, 0.08, 0.11]}
        isSelected={selectedMuscle === 'chest_lower'}
        isHovered={hoveredMuscle === 'chest_lower'}
        recoveryPct={recoveryData.chest_lower ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* --- CORE (Abs & Obliques) --- */}
      <MusclePart
        id="abs"
        label="Rectus Abdominis (Abs)"
        position={[0, 1.14, 0.08]}
        geometryType="box"
        args={[0.20, 0.26, 0.12]}
        isSelected={selectedMuscle === 'abs'}
        isHovered={hoveredMuscle === 'abs'}
        recoveryPct={recoveryData.abs ?? 95}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Obliques (Left & Right) */}
      <MusclePart
        id="obliques"
        label="Obliques"
        position={[-0.17, 1.14, 0.05]}
        rotation={[0, 0.2, 0.1]}
        geometryType="box"
        args={[0.12, 0.25, 0.12]}
        isSelected={selectedMuscle === 'obliques'}
        isHovered={hoveredMuscle === 'obliques'}
        recoveryPct={recoveryData.obliques ?? 90}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="obliques"
        label="Obliques"
        position={[0.17, 1.14, 0.05]}
        rotation={[0, -0.2, -0.1]}
        geometryType="box"
        args={[0.12, 0.25, 0.12]}
        isSelected={selectedMuscle === 'obliques'}
        isHovered={hoveredMuscle === 'obliques'}
        recoveryPct={recoveryData.obliques ?? 90}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* --- BACK (Posterior Torso) --- */}
      {/* Trapezius (Traps) */}
      <MusclePart
        id="traps"
        label="Trapezius (Traps)"
        position={[0, 1.62, -0.06]}
        rotation={[-0.1, 0, 0]}
        geometryType="box"
        args={[0.34, 0.18, 0.14]}
        isSelected={selectedMuscle === 'traps'}
        isHovered={hoveredMuscle === 'traps'}
        recoveryPct={recoveryData.traps ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Rhomboids (Mid Back) */}
      <MusclePart
        id="rhomboids"
        label="Rhomboids"
        position={[0, 1.44, -0.08]}
        geometryType="box"
        args={[0.26, 0.16, 0.13]}
        isSelected={selectedMuscle === 'rhomboids'}
        isHovered={hoveredMuscle === 'rhomboids'}
        recoveryPct={recoveryData.rhomboids ?? 80}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Latissimus Dorsi (Lats - Left & Right Wings) */}
      <MusclePart
        id="lats"
        label="Latissimus Dorsi (Lats)"
        position={[-0.20, 1.34, -0.06]}
        rotation={[0, 0.25, 0.15]}
        geometryType="box"
        args={[0.18, 0.26, 0.14]}
        isSelected={selectedMuscle === 'lats'}
        isHovered={hoveredMuscle === 'lats'}
        recoveryPct={recoveryData.lats ?? 82}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="lats"
        label="Latissimus Dorsi (Lats)"
        position={[0.20, 1.34, -0.06]}
        rotation={[0, -0.25, -0.15]}
        geometryType="box"
        args={[0.18, 0.26, 0.14]}
        isSelected={selectedMuscle === 'lats'}
        isHovered={hoveredMuscle === 'lats'}
        recoveryPct={recoveryData.lats ?? 82}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Lower Back */}
      <MusclePart
        id="lower_back"
        label="Lower Back (Erectors)"
        position={[0, 1.12, -0.07]}
        geometryType="box"
        args={[0.22, 0.20, 0.13]}
        isSelected={selectedMuscle === 'lower_back'}
        isHovered={hoveredMuscle === 'lower_back'}
        recoveryPct={recoveryData.lower_back ?? 75}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* --- SHOULDERS (Deltoids) --- */}
      {/* Front Deltoids */}
      <MusclePart
        id="deltoids_front"
        label="Front Delts"
        position={[-0.30, 1.55, 0.05]}
        geometryType="sphere"
        args={[0.08, 16, 16]}
        isSelected={selectedMuscle === 'deltoids_front'}
        isHovered={hoveredMuscle === 'deltoids_front'}
        recoveryPct={recoveryData.deltoids_front ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="deltoids_front"
        label="Front Delts"
        position={[0.30, 1.55, 0.05]}
        geometryType="sphere"
        args={[0.08, 16, 16]}
        isSelected={selectedMuscle === 'deltoids_front'}
        isHovered={hoveredMuscle === 'deltoids_front'}
        recoveryPct={recoveryData.deltoids_front ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Side Deltoids */}
      <MusclePart
        id="deltoids_side"
        label="Side Lateral Delts"
        position={[-0.34, 1.53, 0]}
        geometryType="sphere"
        args={[0.085, 16, 16]}
        isSelected={selectedMuscle === 'deltoids_side'}
        isHovered={hoveredMuscle === 'deltoids_side'}
        recoveryPct={recoveryData.deltoids_side ?? 70}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="deltoids_side"
        label="Side Lateral Delts"
        position={[0.34, 1.53, 0]}
        geometryType="sphere"
        args={[0.085, 16, 16]}
        isSelected={selectedMuscle === 'deltoids_side'}
        isHovered={hoveredMuscle === 'deltoids_side'}
        recoveryPct={recoveryData.deltoids_side ?? 70}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Rear Deltoids */}
      <MusclePart
        id="deltoids_rear"
        label="Rear Delts"
        position={[-0.29, 1.54, -0.07]}
        geometryType="sphere"
        args={[0.08, 16, 16]}
        isSelected={selectedMuscle === 'deltoids_rear'}
        isHovered={hoveredMuscle === 'deltoids_rear'}
        recoveryPct={recoveryData.deltoids_rear ?? 80}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="deltoids_rear"
        label="Rear Delts"
        position={[0.29, 1.54, -0.07]}
        geometryType="sphere"
        args={[0.08, 16, 16]}
        isSelected={selectedMuscle === 'deltoids_rear'}
        isHovered={hoveredMuscle === 'deltoids_rear'}
        recoveryPct={recoveryData.deltoids_rear ?? 80}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* --- ARMS (Biceps, Triceps, Forearms) --- */}
      {/* Biceps */}
      <MusclePart
        id="biceps"
        label="Biceps"
        position={[-0.34, 1.34, 0.04]}
        rotation={[0.1, 0, 0]}
        geometryType="cylinder"
        args={[0.055, 0.05, 0.20, 16]}
        isSelected={selectedMuscle === 'biceps'}
        isHovered={hoveredMuscle === 'biceps'}
        recoveryPct={recoveryData.biceps ?? 95}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="biceps"
        label="Biceps"
        position={[0.34, 1.34, 0.04]}
        rotation={[0.1, 0, 0]}
        geometryType="cylinder"
        args={[0.055, 0.05, 0.20, 16]}
        isSelected={selectedMuscle === 'biceps'}
        isHovered={hoveredMuscle === 'biceps'}
        recoveryPct={recoveryData.biceps ?? 95}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Triceps */}
      <MusclePart
        id="triceps"
        label="Triceps"
        position={[-0.34, 1.34, -0.04]}
        rotation={[-0.1, 0, 0]}
        geometryType="cylinder"
        args={[0.06, 0.052, 0.22, 16]}
        isSelected={selectedMuscle === 'triceps'}
        isHovered={hoveredMuscle === 'triceps'}
        recoveryPct={recoveryData.triceps ?? 65}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="triceps"
        label="Triceps"
        position={[0.34, 1.34, -0.04]}
        rotation={[-0.1, 0, 0]}
        geometryType="cylinder"
        args={[0.06, 0.052, 0.22, 16]}
        isSelected={selectedMuscle === 'triceps'}
        isHovered={hoveredMuscle === 'triceps'}
        recoveryPct={recoveryData.triceps ?? 65}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Forearms */}
      <MusclePart
        id="forearms"
        label="Forearms"
        position={[-0.35, 1.05, 0]}
        geometryType="cylinder"
        args={[0.048, 0.038, 0.24, 16]}
        isSelected={selectedMuscle === 'forearms'}
        isHovered={hoveredMuscle === 'forearms'}
        recoveryPct={recoveryData.forearms ?? 90}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="forearms"
        label="Forearms"
        position={[0.35, 1.05, 0]}
        geometryType="cylinder"
        args={[0.048, 0.038, 0.24, 16]}
        isSelected={selectedMuscle === 'forearms'}
        isHovered={hoveredMuscle === 'forearms'}
        recoveryPct={recoveryData.forearms ?? 90}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* --- PELVIS & GLUTES --- */}
      <MusclePart
        id="glutes"
        label="Gluteus (Glutes)"
        position={[-0.13, 0.88, -0.06]}
        geometryType="sphere"
        args={[0.13, 16, 16]}
        isSelected={selectedMuscle === 'glutes'}
        isHovered={hoveredMuscle === 'glutes'}
        recoveryPct={recoveryData.glutes ?? 88}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="glutes"
        label="Gluteus (Glutes)"
        position={[0.13, 0.88, -0.06]}
        geometryType="sphere"
        args={[0.13, 16, 16]}
        isSelected={selectedMuscle === 'glutes'}
        isHovered={hoveredMuscle === 'glutes'}
        recoveryPct={recoveryData.glutes ?? 88}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* --- LEGS (Quads, Hamstrings, Calves) --- */}
      {/* Quadriceps */}
      <MusclePart
        id="quadriceps"
        label="Quadriceps (Quads)"
        position={[-0.14, 0.60, 0.05]}
        rotation={[0.08, 0, 0]}
        geometryType="cylinder"
        args={[0.09, 0.07, 0.38, 16]}
        isSelected={selectedMuscle === 'quadriceps'}
        isHovered={hoveredMuscle === 'quadriceps'}
        recoveryPct={recoveryData.quadriceps ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="quadriceps"
        label="Quadriceps (Quads)"
        position={[0.14, 0.60, 0.05]}
        rotation={[0.08, 0, 0]}
        geometryType="cylinder"
        args={[0.09, 0.07, 0.38, 16]}
        isSelected={selectedMuscle === 'quadriceps'}
        isHovered={hoveredMuscle === 'quadriceps'}
        recoveryPct={recoveryData.quadriceps ?? 85}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Hamstrings */}
      <MusclePart
        id="hamstrings"
        label="Hamstrings"
        position={[-0.14, 0.60, -0.05]}
        rotation={[-0.08, 0, 0]}
        geometryType="cylinder"
        args={[0.085, 0.068, 0.36, 16]}
        isSelected={selectedMuscle === 'hamstrings'}
        isHovered={hoveredMuscle === 'hamstrings'}
        recoveryPct={recoveryData.hamstrings ?? 82}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="hamstrings"
        label="Hamstrings"
        position={[0.14, 0.60, -0.05]}
        rotation={[-0.08, 0, 0]}
        geometryType="cylinder"
        args={[0.085, 0.068, 0.36, 16]}
        isSelected={selectedMuscle === 'hamstrings'}
        isHovered={hoveredMuscle === 'hamstrings'}
        recoveryPct={recoveryData.hamstrings ?? 82}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Calves */}
      <MusclePart
        id="calves"
        label="Calves"
        position={[-0.14, 0.24, -0.03]}
        geometryType="cylinder"
        args={[0.065, 0.045, 0.30, 16]}
        isSelected={selectedMuscle === 'calves'}
        isHovered={hoveredMuscle === 'calves'}
        recoveryPct={recoveryData.calves ?? 95}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />
      <MusclePart
        id="calves"
        label="Calves"
        position={[0.14, 0.24, -0.03]}
        geometryType="cylinder"
        args={[0.065, 0.045, 0.30, 16]}
        isSelected={selectedMuscle === 'calves'}
        isHovered={hoveredMuscle === 'calves'}
        recoveryPct={recoveryData.calves ?? 95}
        onSelect={onSelectMuscle}
        onHover={onHoverMuscle}
      />

      {/* Feet Base */}
      <mesh position={[-0.14, 0.04, 0.04]}>
        <boxGeometry args={[0.08, 0.06, 0.16]} />
        <meshStandardMaterial color="#18202C" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.14, 0.04, 0.04]}>
        <boxGeometry args={[0.08, 0.06, 0.16]} />
        <meshStandardMaterial color="#18202C" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

export const HumanModel3DViewer: React.FC<HumanModel3DViewerProps> = ({
  onMuscleSelect,
  className = ''
}) => {
  const [selectedMuscleId, setSelectedMuscleId] = useState<MuscleGroupId>('chest_mid');
  const [hoveredMuscleId, setHoveredMuscleId] = useState<MuscleGroupId | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeCameraPreset, setActiveCameraPreset] = useState<string>('front');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mockRecoveryData: Record<string, number> = {
    chest_mid: 92,
    chest_upper: 90,
    chest_lower: 88,
    lats: 78,
    traps: 85,
    rhomboids: 80,
    lower_back: 75,
    deltoids_front: 85,
    deltoids_side: 70,
    deltoids_rear: 82,
    biceps: 95,
    triceps: 65,
    forearms: 90,
    quadriceps: 88,
    hamstrings: 82,
    glutes: 88,
    abs: 98,
    obliques: 92,
    calves: 95
  };

  const selectedMuscleInfo = MUSCLE_GROUPS_REGISTRY[selectedMuscleId] || MUSCLE_GROUPS_REGISTRY.chest_mid;
  const currentRecovery = mockRecoveryData[selectedMuscleId] ?? 85;

  const handleSelect = (id: MuscleGroupId) => {
    setSelectedMuscleId(id);
    if (onMuscleSelect) onMuscleSelect(id);
  };

  const cameraConfig = (CAMERA_PRESETS as any)[activeCameraPreset] || CAMERA_PRESETS.front;

  const getRecoveryBadge = (pct: number) => {
    if (pct >= 90) return { bg: 'bg-emerald/15', border: 'border-emerald/40', text: 'text-emerald', label: 'Optimal Readiness' };
    if (pct >= 70) return { bg: 'bg-cyan/15', border: 'border-cyan/40', text: 'text-cyan', label: 'Ready to Train' };
    if (pct >= 50) return { bg: 'bg-amber/15', border: 'border-amber/40', text: 'text-amber', label: 'Moderate Fatigue' };
    return { bg: 'bg-crimson/15', border: 'border-crimson/40', text: 'text-crimson', label: 'Recovery Needed' };
  };

  const badge = getRecoveryBadge(currentRecovery);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 ${className}`}>
      {/* 3D WebGL Viewport (8 Cols) */}
      <div className="lg:col-span-8 relative bg-gradient-to-b from-[#080D14] via-[#05080E] to-[#020407] rounded-3xl border border-surface-border p-4 shadow-2xl flex flex-col justify-between overflow-hidden min-h-[580px]">
        {/* Top Controls Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 z-10 p-2">
          {/* Camera Preset Quick Buttons */}
          <div className="flex flex-wrap gap-1.5 bg-surface/80 backdrop-blur-md p-1.5 rounded-2xl border border-surface-border">
            {[
              { id: 'front', label: 'Front' },
              { id: 'back', label: 'Back' },
              { id: 'side_right', label: 'Side' },
              { id: 'focus_chest', label: 'Chest' },
              { id: 'focus_back', label: 'Back' },
              { id: 'focus_arms', label: 'Arms' },
              { id: 'focus_legs', label: 'Legs' },
              { id: 'isometric', label: '3D Iso' }
            ].map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setActiveCameraPreset(preset.id);
                  setAutoRotate(false);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeCameraPreset === preset.id
                    ? 'bg-cyan text-slate-950 font-bold shadow-glow-cyan'
                    : 'text-slate-300 hover:text-white hover:bg-surface-border/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Auto-Rotate & Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                autoRotate
                  ? 'bg-cyan/20 border-cyan/40 text-cyan shadow-glow-cyan'
                  : 'bg-surface-muted/80 border-surface-border text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? 'Rotating' : 'Rotate Off'}</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Canvas Area */}
        <div className="w-full h-[480px] sm:h-[500px] relative">
          {mounted ? (
            <Canvas
              shadows
              camera={{ position: cameraConfig.position, fov: cameraConfig.fov }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              {/* Scene Lighting */}
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
              <directionalLight position={[-5, 4, -5]} intensity={0.8} color="#00F0FF" />
              <directionalLight position={[0, -5, 2]} intensity={0.4} color="#FF2A4B" />
              <pointLight position={[0, 2, 2]} intensity={1.2} color="#00F0FF" distance={5} />

              <CameraRig targetCamera={cameraConfig} />

              {/* Anatomical 3D Mannequin */}
              <Suspense fallback={null}>
                <AnatomicalBodyMannequin
                  selectedMuscle={selectedMuscleId}
                  hoveredMuscle={hoveredMuscleId}
                  onSelectMuscle={handleSelect}
                  onHoverMuscle={setHoveredMuscleId}
                  recoveryData={mockRecoveryData}
                />
              </Suspense>

              {/* 3D Circular Reflective Floor Grid */}
              <Grid
                position={[0, -0.01, 0]}
                args={[10, 10]}
                cellSize={0.5}
                cellThickness={1}
                cellColor="#00F0FF"
                sectionSize={2.5}
                sectionThickness={1.5}
                sectionColor="#FF2A4B"
                fadeDistance={8}
                fadeStrength={1.5}
              />

              <OrbitControls
                enablePan={false}
                autoRotate={autoRotate}
                autoRotateSpeed={1.5}
                minDistance={1.2}
                maxDistance={5.0}
                maxPolarAngle={Math.PI / 2 + 0.1}
                minPolarAngle={0.2}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan/15 border border-cyan/30 flex items-center justify-center animate-pulse">
                <Layers className="w-6 h-6 text-cyan animate-spin" />
              </div>
              <p className="text-xs text-slate-400 font-medium">Initializing WebGL 3D Mannequin Engine...</p>
            </div>
          )}

          {/* Hover Floating Tooltip HUD */}
          {hoveredMuscleId && (
            <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan/40 shadow-glow-cyan text-xs flex items-center space-x-2 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan animate-ping" />
              <span className="font-bold text-white uppercase tracking-wider">
                {hoveredMuscleId.replace('_', ' ')}
              </span>
              <span className="text-slate-400">· Tap to inspect telemetry</span>
            </div>
          )}

          {/* Bottom Hint */}
          <div className="absolute bottom-4 right-4 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5 pointer-events-none">
            <Eye className="w-3.5 h-3.5 text-cyan" />
            <span>Click any muscle • Drag 360° to rotate</span>
          </div>
        </div>
      </div>

      {/* Muscle Telemetry & Biomechanics Sidebar (4 Cols) */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        {/* Selected Muscle Header Card */}
        <div className="bg-gradient-to-b from-surface to-surface-muted rounded-3xl border border-surface-border p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface-muted border border-surface-border text-slate-300">
              {selectedMuscleInfo.category} Group
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.border} ${badge.text}`}>
              {badge.label}
            </span>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {selectedMuscleInfo.name}
          </h2>

          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            {selectedMuscleInfo.description}
          </p>

          {/* Recovery Readiness Gauge */}
          <div className="mt-5 p-4 rounded-2xl bg-surface-muted/80 border border-surface-border">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">Recovery Readiness</span>
              <span className={`font-extrabold text-sm ${badge.text}`}>
                {currentRecovery}%
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  currentRecovery >= 90 ? 'bg-gradient-to-r from-cyan to-emerald' :
                  currentRecovery >= 70 ? 'bg-gradient-to-r from-cyan to-blue-500' :
                  currentRecovery >= 50 ? 'bg-gradient-to-r from-amber to-orange-500' :
                  'bg-gradient-to-r from-crimson to-red-600'
                }`}
                style={{ width: `${currentRecovery}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
              <span>Hypertrophy Stimulated</span>
              <span>Protein Synthesis Peak</span>
            </div>
          </div>

          {/* Antagonist Muscle Balance Telemetry */}
          {selectedMuscleInfo.antagonistId && (
            <div className="mt-4 p-3.5 rounded-2xl bg-[#090E17] border border-cyan/20 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                <div>
                  <div className="text-[11px] text-slate-400">Antagonist Counterpart</div>
                  <div className="text-xs font-bold text-white capitalize">
                    {selectedMuscleInfo.antagonistId.replace('_', ' ')}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSelect(selectedMuscleInfo.antagonistId as MuscleGroupId)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan/15 hover:bg-cyan/25 text-cyan border border-cyan/30 transition-all"
              >
                Inspect
              </button>
            </div>
          )}
        </div>

        {/* Recommended Biomechanical Exercises */}
        <div className="bg-surface rounded-3xl border border-surface-border p-6 shadow-xl flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3 text-white font-bold text-sm">
              <Dumbbell className="w-4 h-4 text-crimson" />
              <span>Recommended Stimulus Exercises</span>
            </div>

            <div className="space-y-2">
              {selectedMuscleInfo.relatedExerciseIds?.slice(0, 3).map((exId) => (
                <div
                  key={exId}
                  className="p-3 rounded-2xl bg-surface-muted/70 hover:bg-surface-muted border border-surface-border flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson font-bold text-xs">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white capitalize group-hover:text-cyan transition-colors">
                        {exId.replace(/-/g, ' ')}
                      </div>
                      <div className="text-[10px] text-slate-400">3-4 sets · 8-12 reps</div>
                    </div>
                  </div>

                  <Link
                    href="/workouts"
                    className="p-1.5 rounded-lg bg-surface border border-surface-border text-slate-400 group-hover:text-white group-hover:border-cyan/40 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/workouts"
            className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-crimson to-crimson-hover text-white font-bold text-xs text-center shadow-glow-crimson transition-all flex items-center justify-center space-x-2"
          >
            <span>Generate Targeted Workout</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
