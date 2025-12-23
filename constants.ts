import { CupSize } from './types';

// 35ml per kg is a general rule of thumb
export const ML_PER_KG = 35; 

export const PRESET_CUPS: CupSize[] = [
  { amount: 150, label: 'Nhỏ', icon: '☕' },
  { amount: 250, label: 'Cốc', icon: '🥛' },
  { amount: 500, label: 'Chai', icon: '🍶' },
  { amount: 750, label: 'Lớn', icon: '💧' },
];

export const STORAGE_KEYS = {
  PROFILE: 'aqualife_profile',
  LOGS: 'aqualife_logs',
  LAST_ADVICE: 'aqualife_advice'
};
