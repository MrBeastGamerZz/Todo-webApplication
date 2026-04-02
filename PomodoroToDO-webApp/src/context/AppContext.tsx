import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Task, Settings, TimerState } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { playNotificationSound } from '../utils/sound';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export type AppAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'EDIT_TASK'; payload: { id: string; text: string } }
  | { type: 'REORDER_TASKS'; payload: Task[] }
  | { type: 'START_TIMER' }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'TIMER_TICK' }
  | { type: 'SWITCH_MODE' }
  | { type: 'SHOW_TIMER'; payload: boolean }
  | { type: 'SHOW_SETTINGS'; payload: boolean }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'COMPLETE_SESSION' };

const defaultSettings: Settings = {
  workDuration: 25,
  breakDuration: 5,
  autoStartBreak: true,
  theme: 'tomato',
  soundEnabled: true,
};

const defaultTimer: TimerState = {
  mode: 'work',
  isRunning: false,
  isPaused: false,
  timeLeft: 25 * 60, // 25 minutes in seconds
  currentSession: 0,
  totalSessions: 0,
};

const initialState: AppState = {
  tasks: [],
  completedTasks: [],
  timer: defaultTimer,
  settings: defaultSettings,
  showTimer: false,
  showSettings: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case 'TOGGLE_TASK':
      const taskToToggle = state.tasks.find(task => task.id === action.payload);
      if (!taskToToggle) return state;

      if (!taskToToggle.completed) {
        // Moving to completed
        const completedTask = { ...taskToToggle, completed: true, completedAt: new Date() };
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
          completedTasks: [...state.completedTasks, completedTask],
        };
      } else {
        // Moving back to tasks
        const incompleteTask = { ...taskToToggle, completed: false, completedAt: undefined };
        return {
          ...state,
          completedTasks: state.completedTasks.filter(task => task.id !== action.payload),
          tasks: [...state.tasks, incompleteTask],
        };
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        completedTasks: state.completedTasks.filter(task => task.id !== action.payload),
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        ),
        completedTasks: state.completedTasks.map(task =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        ),
      };

    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };

    case 'START_TIMER':
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: true,
          isPaused: false,
        },
      };

    case 'PAUSE_TIMER':
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          isPaused: true,
        },
      };

    case 'RESET_TIMER':
      const duration = state.timer.mode === 'work' 
        ? state.settings.workDuration 
        : state.settings.breakDuration;
      return {
        ...state,
        timer: {
          ...state.timer,
          isRunning: false,
          isPaused: false,
          timeLeft: duration * 60,
        },
      };

    case 'TIMER_TICK':
      if (state.timer.timeLeft <= 1) {
        // Timer finished
        if (state.settings.soundEnabled) {
          playNotificationSound();
        }
        
        if (state.timer.mode === 'work') {
          // Work session completed
          const newSessionCount = state.timer.currentSession + 1;
          const newTotalSessions = state.timer.totalSessions + 1;
          
          if (state.settings.autoStartBreak) {
            return {
              ...state,
              timer: {
                mode: 'break',
                isRunning: true,
                isPaused: false,
                timeLeft: state.settings.breakDuration * 60,
                currentSession: newSessionCount,
                totalSessions: newTotalSessions,
              },
            };
          } else {
            return {
              ...state,
              timer: {
                mode: 'break',
                isRunning: false,
                isPaused: false,
                timeLeft: state.settings.breakDuration * 60,
                currentSession: newSessionCount,
                totalSessions: newTotalSessions,
              },
            };
          }
        } else {
          // Break finished, return to work
          return {
            ...state,
            timer: {
              mode: 'work',
              isRunning: false,
              isPaused: false,
              timeLeft: state.settings.workDuration * 60,
              currentSession: state.timer.currentSession,
              totalSessions: state.timer.totalSessions,
            },
            showTimer: false,
          };
        }
      }

      return {
        ...state,
        timer: {
          ...state.timer,
          timeLeft: state.timer.timeLeft - 1,
        },
      };

    case 'SWITCH_MODE':
      const newMode = state.timer.mode === 'work' ? 'break' : 'work';
      const newDuration = newMode === 'work' 
        ? state.settings.workDuration 
        : state.settings.breakDuration;
      return {
        ...state,
        timer: {
          ...state.timer,
          mode: newMode,
          timeLeft: newDuration * 60,
          isRunning: false,
          isPaused: false,
        },
      };

    case 'SHOW_TIMER':
      return {
        ...state,
        showTimer: action.payload,
      };

    case 'SHOW_SETTINGS':
      return {
        ...state,
        showSettings: action.payload,
      };

    case 'UPDATE_SETTINGS':
      const newSettings = { ...state.settings, ...action.payload };
      return {
        ...state,
        settings: newSettings,
      };

    case 'COMPLETE_SESSION':
      return {
        ...state,
        timer: {
          ...state.timer,
          totalSessions: state.timer.totalSessions + 1,
        },
      };

    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    const stored = loadFromStorage();
    return {
      ...initial,
      ...stored,
      timer: {
        ...initial.timer,
        isRunning: false,
        isPaused: false,
      },
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};