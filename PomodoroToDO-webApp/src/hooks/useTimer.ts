import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const useTimer = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.timer.isRunning && state.timer.timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'TIMER_TICK' });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.timer.isRunning, state.timer.timeLeft, dispatch]);

  const startTimer = () => dispatch({ type: 'START_TIMER' });
  const pauseTimer = () => dispatch({ type: 'PAUSE_TIMER' });
  const resetTimer = () => dispatch({ type: 'RESET_TIMER' });
  const switchMode = () => dispatch({ type: 'SWITCH_MODE' });

  return {
    timer: state.timer,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  };
};