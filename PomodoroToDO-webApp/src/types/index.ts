export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimerState {
  mode: 'work' | 'break';
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  currentSession: number;
  totalSessions: number;
}

export interface Settings {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  autoStartBreak: boolean;
  theme: 'tomato' | 'mint' | 'midnight';
  soundEnabled: boolean;
}

export interface AppState {
  tasks: Task[];
  completedTasks: Task[];
  timer: TimerState;
  settings: Settings;
  showTimer: boolean;
  showSettings: boolean;
}

export type Theme = 'tomato' | 'mint' | 'midnight';