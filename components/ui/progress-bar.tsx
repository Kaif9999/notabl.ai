'use client';
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

export function ProgressBar({ value, max, className = '' }: ProgressBarProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  return (
    <div className={`h-1.5 w-full bg-gray-100 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-black" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
} 