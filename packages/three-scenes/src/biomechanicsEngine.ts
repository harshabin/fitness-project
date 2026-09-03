export interface JointRotations {
  torsoRotation: [number, number, number];
  torsoPosition: [number, number, number];
  leftShoulder: [number, number, number];
  rightShoulder: [number, number, number];
  leftElbow: [number, number, number];
  rightElbow: [number, number, number];
  leftHip: [number, number, number];
  rightHip: [number, number, number];
  leftKnee: [number, number, number];
  rightKnee: [number, number, number];
  barbellPosition?: [number, number, number];
}

export function computeJointAngles(kinematicType: string, phase: number): JointRotations {
  // Phase goes 0 -> 1 -> 0 continuously (sine wave smoothing)
  const cycle = (Math.sin(phase * Math.PI * 2 - Math.PI / 2) + 1) / 2; // 0 to 1

  switch (kinematicType) {
    case 'bench_press': {
      // Horizontal torso lying flat on bench
      // Pressing barbell from chest (cycle=0) to full lockout (cycle=1)
      const pressHeight = 0.75 + cycle * 0.45;
      const armAngle = 0.2 + cycle * 1.35;
      return {
        torsoRotation: [-Math.PI / 2, 0, 0],
        torsoPosition: [0, 0.75, 0],
        leftShoulder: [-0.2, 0.4, armAngle],
        rightShoulder: [-0.2, -0.4, -armAngle],
        leftElbow: [0, 0, (1 - cycle) * 1.5],
        rightElbow: [0, 0, -(1 - cycle) * 1.5],
        leftHip: [0.3, 0.2, 0],
        rightHip: [0.3, -0.2, 0],
        leftKnee: [-0.8, 0, 0],
        rightKnee: [-0.8, 0, 0],
        barbellPosition: [0, pressHeight, 0.25]
      };
    }

    case 'squat': {
      // Standing upright (cycle=1) to deep squat (cycle=0)
      const depth = (1 - cycle); // 1 = lowest, 0 = standing
      const hipFlex = depth * 1.6;
      const kneeFlex = depth * 1.9;
      const torsoTilt = depth * 0.45;
      const yDrop = -depth * 0.55;

      return {
        torsoRotation: [torsoTilt, 0, 0],
        torsoPosition: [0, yDrop, 0],
        leftShoulder: [0, 0, 0.4],
        rightShoulder: [0, 0, -0.4],
        leftElbow: [0, 0, 1.2],
        rightElbow: [0, 0, -1.2],
        leftHip: [hipFlex, 0.15, 0],
        rightHip: [hipFlex, -0.15, 0],
        leftKnee: [-kneeFlex, 0, 0],
        rightKnee: [-kneeFlex, 0, 0],
        barbellPosition: [0, 1.35 + yDrop, -0.05]
      };
    }

    case 'overhead_press': {
      // Pressing overhead from collarbone to ceiling
      const pressProgress = cycle; // 0 = at collarbone, 1 = overhead
      const armUp = 0.2 + pressProgress * 2.8;
      const elbowExt = (1 - pressProgress) * 1.6;

      return {
        torsoRotation: [0, 0, 0],
        torsoPosition: [0, 0, 0],
        leftShoulder: [0, 0, armUp],
        rightShoulder: [0, 0, -armUp],
        leftElbow: [0, 0, elbowExt],
        rightElbow: [0, 0, -elbowExt],
        leftHip: [0, 0.1, 0],
        rightHip: [0, 0.1, 0],
        leftKnee: [0, 0, 0],
        rightKnee: [0, 0, 0],
        barbellPosition: [0, 1.35 + pressProgress * 0.75, 0.1]
      };
    }

    case 'bicep_curl': {
      // Flexing elbows from 0 to 140 degrees
      const curlAngle = cycle * 2.3;
      return {
        torsoRotation: [0, 0, 0],
        torsoPosition: [0, 0, 0],
        leftShoulder: [0.1, 0, 0.15],
        rightShoulder: [0.1, 0, -0.15],
        leftElbow: [0, 0, curlAngle],
        rightElbow: [0, 0, -curlAngle],
        leftHip: [0, 0.05, 0],
        rightHip: [0, -0.05, 0],
        leftKnee: [0, 0, 0],
        rightKnee: [0, 0, 0],
        barbellPosition: [0, 0.5 + cycle * 0.65, 0.35]
      };
    }

    case 'lateral_raise': {
      // Abducting arms laterally to parallel with floor
      const abduct = cycle * 1.5;
      return {
        torsoRotation: [0.05, 0, 0],
        torsoPosition: [0, 0, 0],
        leftShoulder: [0, 0, abduct],
        rightShoulder: [0, 0, -abduct],
        leftElbow: [0, 0, 0.15],
        rightElbow: [0, 0, -0.15],
        leftHip: [0, 0.05, 0],
        rightHip: [0, -0.05, 0],
        leftKnee: [0, 0, 0],
        rightKnee: [0, 0, 0]
      };
    }

    case 'deadlift': {
      // Hinging at hips from bottom to standing lockout
      const hinge = (1 - cycle); // 1 = at floor, 0 = standing lockout
      return {
        torsoRotation: [hinge * 0.95, 0, 0],
        torsoPosition: [0, -hinge * 0.35, 0],
        leftShoulder: [hinge * 0.8, 0, 0.2],
        rightShoulder: [hinge * 0.8, 0, -0.2],
        leftElbow: [0, 0, 0],
        rightElbow: [0, 0, 0],
        leftHip: [hinge * 1.4, 0.1, 0],
        rightHip: [hinge * 1.4, -0.1, 0],
        leftKnee: [-hinge * 1.1, 0, 0],
        rightKnee: [-hinge * 1.1, 0, 0],
        barbellPosition: [0, 0.15 + cycle * 0.65, 0.3]
      };
    }

    case 'lat_pulldown':
    case 'pullup': {
      // Pulling arms down to clavicle
      const pull = cycle; // 1 = peak contraction (elbows tucked), 0 = arms extended
      const armElev = (1 - pull) * 2.7 + 0.3;
      const elbowTuck = pull * 2.1;
      return {
        torsoRotation: [-0.2, 0, 0],
        torsoPosition: [0, 0, 0],
        leftShoulder: [0, 0, armElev],
        rightShoulder: [0, 0, -armElev],
        leftElbow: [0, 0, elbowTuck],
        rightElbow: [0, 0, -elbowTuck],
        leftHip: [0.8, 0, 0],
        rightHip: [0.8, 0, 0],
        leftKnee: [-1.4, 0, 0],
        rightKnee: [-1.4, 0, 0]
      };
    }

    case 'tricep_pushdown': {
      // Extending elbows downward from 90 degrees to full lockout
      const extend = cycle; // 1 = locked out, 0 = 90 deg bent
      const elbowAngle = (1 - extend) * 1.8;
      return {
        torsoRotation: [0.15, 0, 0],
        torsoPosition: [0, 0, 0],
        leftShoulder: [0.3, 0, 0.1],
        rightShoulder: [0.3, 0, -0.1],
        leftElbow: [0, 0, elbowAngle],
        rightElbow: [0, 0, -elbowAngle],
        leftHip: [0.1, 0.05, 0],
        rightHip: [0.1, -0.05, 0],
        leftKnee: [-0.1, 0, 0],
        rightKnee: [-0.1, 0, 0]
      };
    }

    default: {
      // Default breathing / resting idle stance
      const breath = Math.sin(phase * Math.PI * 2) * 0.02;
      return {
        torsoRotation: [0, 0, 0],
        torsoPosition: [0, breath, 0],
        leftShoulder: [0, 0, 0.25],
        rightShoulder: [0, 0, -0.25],
        leftElbow: [0, 0, 0.1],
        rightElbow: [0, 0, -0.1],
        leftHip: [0, 0.05, 0],
        rightHip: [0, -0.05, 0],
        leftKnee: [0, 0, 0],
        rightKnee: [0, 0, 0]
      };
    }
  }
}
