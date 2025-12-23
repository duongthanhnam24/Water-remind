import React, { useState, useEffect, useMemo } from 'react';
import { Onboarding } from './components/Onboarding';
import { LiquidProgress } from './components/LiquidProgress';
import { AICoach } from './components/AICoach';
import { HistoryModal } from './components/HistoryModal';
import { EditGoalModal } from './components/EditGoalModal';
import { UserProfile, DrinkLog, CupSize } from './types';
import { PRESET_CUPS, STORAGE_KEYS } from './constants';
import { getHydrationAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<DrinkLog[]>([]);
  const [aiMessage, setAiMessage] = useState<string>("Chào mừng bạn quay trở lại!");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Load initial data
  useEffect(() => {
    const storedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    const storedLogs = localStorage.getItem(STORAGE_KEYS.LOGS);
    
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    if (storedLogs) {
      const parsedLogs: DrinkLog[] = JSON.parse(storedLogs);
      // Filter logs for today ONLY
      const today = new Date().toDateString();
      const todayLogs = parsedLogs.filter(log => new Date(log.timestamp).toDateString() === today);
      setLogs(todayLogs);
    }
  }, []);

  // Persist data
  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  }, [logs]);

  // Derived state
  const totalDrank = useMemo(() => logs.reduce((sum, log) => sum + log.amount, 0), [logs]);
  const progressPercentage = useMemo(() => profile ? (totalDrank / profile.dailyGoal) * 100 : 0, [totalDrank, profile]);

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    fetchAdvice(0, newProfile.dailyGoal, newProfile.name);
  };

  const addWater = (amount: number) => {
    const newLog: DrinkLog = {
      id: Date.now().toString(),
      amount,
      timestamp: Date.now()
    };
    const newLogs = [...logs, newLog];
    setLogs(newLogs);
    
    // Trigger AI advice occasionally or when major milestones hit
    // Simple logic: Trigger if it's the first drink or random chance
    if (newLogs.length === 1 || Math.random() > 0.7) {
      fetchAdvice(totalDrank + amount, profile!.dailyGoal, profile!.name);
    }

    setShowCustomInput(false);
    setCustomAmount('');
  };

  const removeLog = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const fetchAdvice = async (current: number, goal: number, name: string) => {
    setIsAiLoading(true);
    const advice = await getHydrationAdvice(current, goal, name);
    setAiMessage(advice);
    setIsAiLoading(false);
  };

  const handleReset = () => {
    if(confirm("Bạn có chắc muốn xóa toàn bộ dữ liệu và thiết lập lại từ đầu không?")) {
      localStorage.clear();
      setProfile(null);
      setLogs([]);
    }
  };
  
  const handleEditGoalClick = () => {
    if (confirm("Bạn có muốn thay đổi mục tiêu uống nước hàng ngày không?")) {
        setShowEditGoal(true);
    }
  };

  const handleSaveGoal = (newGoal: number) => {
    if (profile) {
        setProfile({ ...profile, dailyGoal: newGoal });
        fetchAdvice(totalDrank, newGoal, profile.name);
    }
  };

  // Render
  if (!profile) {
    return <Onboarding onComplete={handleProfileComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10 max-w-md mx-auto relative shadow-2xl overflow-hidden min-h-screen">
      
      {/* Header */}
      <div className="px-6 pt-10 pb-4 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40">
        <div>
          <h1 className="text-2xl font-bold text-water-900">Xin chào, {profile.name} 👋</h1>
          <div className="flex items-center gap-2 mt-1">
             <p className="text-sm text-gray-500">Mục tiêu: <span className="font-bold text-water-600">{profile.dailyGoal}ml</span></p>
             <button 
                onClick={handleEditGoalClick}
                className="p-1 text-gray-400 hover:text-water-600 bg-gray-100 hover:bg-water-50 rounded-md transition-colors"
                title="Sửa mục tiêu"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
             </button>
          </div>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={handleReset} 
                className="p-2 bg-gray-100 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Cài đặt lại toàn bộ"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            <button 
                onClick={() => setShowHistory(true)} 
                className="p-2 bg-water-50 rounded-full text-water-600 hover:bg-water-100 transition-colors relative"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center pt-8 px-4">
        
        <LiquidProgress percentage={progressPercentage} />
        
        <div className="text-center mb-8">
            <span className="text-4xl font-bold text-gray-800">{totalDrank}</span>
            <span className="text-gray-400 text-lg font-medium ml-1">/ {profile.dailyGoal} ml</span>
            <div className="text-sm text-gray-400 mt-1">
                Còn lại: {Math.max(0, profile.dailyGoal - totalDrank)} ml
            </div>
        </div>

        {/* AI Advice Card */}
        <div className="w-full mb-8">
            <AICoach 
                message={aiMessage} 
                loading={isAiLoading} 
                onRefresh={() => fetchAdvice(totalDrank, profile.dailyGoal, profile.name)} 
            />
        </div>

        {/* Quick Add Buttons */}
        <div className="w-full grid grid-cols-2 gap-4 px-4 mb-6">
            {PRESET_CUPS.map((cup) => (
                <button
                    key={cup.amount}
                    onClick={() => addWater(cup.amount)}
                    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-water-300 hover:shadow-md hover:bg-water-50 transition-all active:scale-95 group"
                >
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cup.icon}</span>
                    <span className="font-bold text-gray-700">+{cup.amount}ml</span>
                    <span className="text-xs text-gray-400">{cup.label}</span>
                </button>
            ))}
        </div>

        {/* Custom Input Toggle */}
        <div className="w-full px-4">
            {!showCustomInput ? (
                <button 
                    onClick={() => setShowCustomInput(true)}
                    className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-medium hover:border-water-400 hover:text-water-600 transition-colors"
                >
                    + Nhập số lượng khác
                </button>
            ) : (
                <div className="flex gap-2 animate-fade-in">
                    <input 
                        type="number" 
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Nhập ml..."
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-water-500 outline-none"
                        autoFocus
                    />
                    <button 
                        onClick={() => {
                            const val = parseInt(customAmount);
                            if(val > 0) addWater(val);
                        }}
                        disabled={!customAmount}
                        className="bg-water-600 text-white px-6 rounded-xl font-bold disabled:opacity-50"
                    >
                        Thêm
                    </button>
                    <button 
                        onClick={() => setShowCustomInput(false)}
                        className="bg-gray-200 text-gray-600 px-4 rounded-xl font-bold"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>

      </div>

      <HistoryModal 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
        logs={logs}
        onDelete={removeLog}
      />
      
      <EditGoalModal
        isOpen={showEditGoal}
        onClose={() => setShowEditGoal(false)}
        currentGoal={profile.dailyGoal}
        onSave={handleSaveGoal}
      />
    </div>
  );
};

export default App;