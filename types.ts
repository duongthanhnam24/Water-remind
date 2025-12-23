export interface DrinkLog {
  id: string;
  amount: number; // in ml
  timestamp: number;
}

export interface UserProfile {
  name: string;
  weight: number; // in kg
  dailyGoal: number; // in ml
  setupComplete: boolean;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD
  total: number;
  logs: DrinkLog[];
}

export type CupSize = {
  amount: number;
  label: string;
  icon: string;
};
