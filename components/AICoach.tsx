import React from 'react';

interface AICoachProps {
  message: string;
  loading: boolean;
  onRefresh: () => void;
}

export const AICoach: React.FC<AICoachProps> = ({ message, loading, onRefresh }) => {
  return (
    <div className="relative mt-6 mx-4 p-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg text-white overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-indigo-100 text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Aqua Coach AI
          </h3>
          <button 
            onClick={onRefresh}
            disabled={loading}
            className={`text-indigo-200 hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        <p className="text-lg font-medium leading-relaxed min-h-[3.5rem]">
          {loading ? "Đang suy nghĩ..." : message}
        </p>
      </div>
    </div>
  );
};
