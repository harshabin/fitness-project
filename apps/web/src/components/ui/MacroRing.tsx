'use client';

import React from 'react';

interface MacroRingProps {
  current: number;
  target: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const MacroRing: React.FC<MacroRingProps> = ({
  current,
  target,
  label,
  unit = 'g',
  color = '#00F0FF',
  size = 110,
  strokeWidth = 8
}) => {
  const percentage = Math.min(100, Math.round((current / Math.max(1, target)) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm sm:text-base font-extrabold text-white leading-none">
            {current}
            <span className="text-[10px] text-slate-400 font-normal ml-0.5">{unit}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5">/ {target}{unit}</span>
        </div>
      </div>

      <span className="text-xs font-bold text-slate-200 mt-2">{label}</span>
      <span className="text-[10px] text-slate-400 font-mono">{percentage}%</span>
    </div>
  );
};
