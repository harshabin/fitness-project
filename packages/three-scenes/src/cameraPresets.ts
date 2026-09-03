import { CameraPreset, CameraViewConfig } from '@fithealth/types';

export const CAMERA_PRESETS: Record<CameraPreset, CameraViewConfig> = {
  front: {
    position: [0, 1.2, 3.2],
    target: [0, 1.0, 0],
    fov: 45
  },
  side_right: {
    position: [3.2, 1.2, 0],
    target: [0, 1.0, 0],
    fov: 45
  },
  side_left: {
    position: [-3.2, 1.2, 0],
    target: [0, 1.0, 0],
    fov: 45
  },
  back: {
    position: [0, 1.2, -3.2],
    target: [0, 1.0, 0],
    fov: 45
  },
  top: {
    position: [0, 3.8, 0.5],
    target: [0, 0.8, 0],
    fov: 50
  },
  isometric: {
    position: [2.3, 2.0, 2.3],
    target: [0, 1.0, 0],
    fov: 45
  },
  focus_chest: {
    position: [0, 1.4, 1.8],
    target: [0, 1.3, 0],
    fov: 38
  },
  focus_back: {
    position: [0, 1.4, -1.8],
    target: [0, 1.3, 0],
    fov: 38
  },
  focus_legs: {
    position: [0, 0.6, 2.0],
    target: [0, 0.5, 0],
    fov: 40
  },
  focus_arms: {
    position: [1.5, 1.3, 1.2],
    target: [0.5, 1.2, 0],
    fov: 38
  }
};
