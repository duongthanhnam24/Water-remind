import React, { useState, useEffect } from 'react';

interface EditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoal: number;
  onSave: (newGoal: number) => void;
}

export const EditGoalModal: React.FC<EditGoalModalProps> = ({ isOpen, onClose, currentGoal, onSave }) => {
  const [goal, setGoal] = useState(currentGoal.toString());

  useEffect(() => {
    if (isOpen) {
        setGoal(currentGoal.toString());
    }
  }, [isOpen, currentGoal]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(goal);
    if (val && val > 0) {
        onSave(val);
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 animate-scale-up">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Đặt lại mục tiêu</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mục tiêu mới (ml)</label>
                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-water-500 focus:ring-2 focus:ring-water-200 outline-none bg-gray-50 text-lg font-bold text-center"
                    autoFocus
                />
                <p className="text-xs text-gray-400 mt-2 text-center">
                   Thay đổi mục tiêu sẽ không ảnh hưởng đến lịch sử uống nước của bạn.
                </p>
            </div>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-water-600 hover:bg-water-700 shadow-lg shadow-water-200 transition-transform active:scale-95"
                >
                    Lưu
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};