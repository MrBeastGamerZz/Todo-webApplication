import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useKeyboardShortcuts = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          if (state.showTimer) {
            if (state.timer.isRunning) {
              dispatch({ type: 'PAUSE_TIMER' });
            } else {
              dispatch({ type: 'START_TIMER' });
            }
          }
          break;
        case 's':
          event.preventDefault();
          dispatch({ type: 'SHOW_SETTINGS', payload: !state.showSettings });
          break;
        case 'escape':
          event.preventDefault();
          if (state.showTimer) {
            dispatch({ type: 'SHOW_TIMER', payload: false });
          }
          if (state.showSettings) {
            dispatch({ type: 'SHOW_SETTINGS', payload: false });
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state, dispatch]);
};