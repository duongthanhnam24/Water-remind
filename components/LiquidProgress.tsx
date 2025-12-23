import React from 'react';

interface LiquidProgressProps {
  percentage: number;
}

export const LiquidProgress: React.FC<LiquidProgressProps> = ({ percentage }) => {
  // Clamp percentage between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Calculate transform Y based on percentage (100% -> 0%, 0% -> 100%)
  // We offset it slightly so even at 0 there is a little water at bottom, and at 100 it fills up
  const translateY = 100 - clampedPercentage;

  return (
    <div className="relative w-64 h-64 mx-auto mb-8 rounded-full border-4 border-water-200 shadow-[0_0_20px_rgba(14,165,233,0.3)] bg-white overflow-hidden transform transition-all duration-500 hover:scale-105">
      
      {/* Percentage Text */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <span className={`text-5xl font-bold transition-colors duration-300 ${clampedPercentage > 50 ? 'text-white' : 'text-water-600'}`}>
          {Math.round(clampedPercentage)}%
        </span>
        <span className={`text-sm font-medium uppercase tracking-widest mt-1 ${clampedPercentage > 50 ? 'text-water-50' : 'text-gray-400'}`}>
          Hoàn thành
        </span>
      </div>

      {/* The Liquid Wave */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[200%] bg-water-500 opacity-90 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(${translateY > 95 ? 95 : (translateY < -10 ? -10 : translateY)}%)` }}
      >
        {/* Wave Shape 1 */}
        <div 
          className="absolute top-0 left-0 w-[200%] h-[50%] bg-water-400 rounded-[40%] animate-wave"
          style={{ transformOrigin: '50% 50%', marginTop: '-25%' }}
        />
        {/* Wave Shape 2 (Offset) */}
         <div 
          className="absolute top-0 left-0 w-[200%] h-[50%] bg-water-500 rounded-[35%] animate-wave opacity-60"
          style={{ transformOrigin: '50% 50%', marginTop: '-28%', animationDuration: '4s', animationDirection: 'reverse' }}
        />
      </div>
    </div>
  );
};
