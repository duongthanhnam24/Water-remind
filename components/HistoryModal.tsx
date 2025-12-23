import React from 'react';
import { DrinkLog } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: DrinkLog[];
  onDelete: (id: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, logs, onDelete }) => {
  if (!isOpen) return null;

  const sortedLogs = [...logs].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md h-[80vh] sm:h-auto sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col animate-slide-up">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-3xl">
          <h2 className="text-xl font-bold text-gray-800">Lịch sử hôm nay</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {sortedLogs.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              <p className="text-4xl mb-2">🥤</p>
              <p>Chưa có dữ liệu uống nước hôm nay.</p>
            </div>
          ) : (
            sortedLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-water-100 flex items-center justify-center text-water-600 font-bold">
                    {log.amount >= 500 ? '💧' : '🥤'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{log.amount} ml</p>
                    <p className="text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onDelete(log.id)}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
