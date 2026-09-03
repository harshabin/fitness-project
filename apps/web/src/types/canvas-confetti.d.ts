declare module 'canvas-confetti' {
  export interface Shape {
    type: string;
  }
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    flat?: boolean;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: (string | Shape)[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }
  export default function confetti(options?: Options): Promise<null> | null;
}
