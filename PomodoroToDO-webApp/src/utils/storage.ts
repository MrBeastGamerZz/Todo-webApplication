import { AppState } from '../types';

const STORAGE_KEY = 'pomodoro-todo-app';

export const saveToStorage = (state: AppState): void => {
  try {
    const dataToSave = {
      tasks: state.tasks,
      completedTasks: state.completedTasks,
      settings: state.settings,
      timer: {
        ...state.timer,
        // Don't persist running state
        isRunning: false,
        isPaused: false,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromStorage = (): Partial<AppState> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      // Convert date strings back to Date objects
      if (data.tasks) {
        data.tasks = data.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
      }
      if (data.completedTasks) {
        data.completedTasks = data.completedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
      }
      return data;
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return {};
};