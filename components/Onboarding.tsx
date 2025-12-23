import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ML_PER_KG } from '../constants';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn.');
      return;
    }
    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum < 20 || weightNum > 300) {
      setError('Vui lòng nhập cân nặng hợp lệ (20kg - 300kg).');
      return;
    }

    const calculatedGoal = Math.round(weightNum * ML_PER_KG);
    
    const newProfile: UserProfile = {
      name: name.trim(),
      weight: weightNum,
      dailyGoal: calculatedGoal,
      setupComplete: true
    };

    onComplete(newProfile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-water-50 to-white text-slate-800">
      <div className="w-full max-w-md animate-float">
        <div className="text-center mb-10">
          <div className="inline-block p-4 mb-4 rounded-full bg-water-100 text-6xl">
            💧
          </div>
          <h1 className="text-3xl font-bold text-water-900 mb-2">Chào mừng đến AquaLife</h1>
          <p className="text-gray-500">Hãy thiết lập mục tiêu uống nước của bạn.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl space-y-6 border border-water-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên của bạn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-water-500 focus:ring-2 focus:ring-water-200 outline-none transition-all bg-gray-50"
              placeholder="Ví dụ: Minh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cân nặng (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-water-500 focus:ring-2 focus:ring-water-200 outline-none transition-all bg-gray-50"
              placeholder="Ví dụ: 65"
            />
            <p className="text-xs text-gray-400 mt-2">
              Chúng tôi sẽ dùng cân nặng để tính lượng nước cần thiết.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-water-600 hover:bg-water-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-water-200 transition-all active:scale-95"
          >
            Bắt đầu ngay
          </button>
        </form>
      </div>
    </div>
  );
};
