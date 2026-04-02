import React from 'react';
import { X, Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { formatTime, getProgress } from '../../utils/time';

const TimerModal: React.FC = () => {
  const { state, dispatch } = useApp();
  const { timer, startTimer, pauseTimer, resetTimer, switchMode } = useTimer();

  if (!state.showTimer) return null;

  const totalTime = timer.mode === 'work' 
    ? state.settings.workDuration * 60 
    : state.settings.breakDuration * 60;
  
  const progress = getProgress(timer.timeLeft, totalTime);
  const circumference = 2 * Math.PI * 120; // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleClose = () => {
    dispatch({ type: 'SHOW_TIMER', payload: false });
  };

  const isWorkMode = timer.mode === 'work';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        {/* Mode Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {isWorkMode ? (
              <>
                <span className="text-2xl">🍅</span>
                <h2 className="text-xl font-bold text-red-600">Work Time</h2>
              </>
            ) : (
              <>
                <Coffee className="text-2xl text-green-600" />
                <h2 className="text-xl font-bold text-green-600">Break Time</h2>
              </>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Session {timer.currentSession + 1} • {timer.totalSessions} total completed
          </p>
        </div>

        {/* Tomato Timer */}
        <div className="relative flex items-center justify-center mb-8">
          <div className={`w-64 h-64 rounded-full relative ${
            isWorkMode 
              ? 'bg-gradient-to-br from-red-400 via-red-500 to-red-600' 
              : 'bg-gradient-to-br from-green-400 via-green-500 to-green-600'
          } shadow-2xl`}>
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl font-bold tracking-wider">
                  {formatTime(timer.timeLeft)}
                </div>
                <div className="text-sm opacity-80 mt-1">
                  {isWorkMode ? 'Focus Time' : 'Break Time'}
                </div>
              </div>
            </div>

            {/* Tomato Stem (for work mode) */}
            {isWorkMode && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-6 bg-green-500 rounded-t-full"></div>
                <div className="w-8 h-3 bg-green-400 rounded-full -mt-1"></div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            onClick={timer.isRunning ? pauseTimer : startTimer}
            className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center space-x-2 ${
              isWorkMode
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
            }`}
          >
            {timer.isRunning ? <Pause size={20} /> : <Play size={20} />}
            <span>{timer.isRunning ? 'Pause' : 'Start'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>

        {/* Mode Switch */}
        <div className="text-center">
          <button
            onClick={switchMode}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Switch to {isWorkMode ? 'Break' : 'Work'} Mode
          </button>
        </div>

        {/* Keyboard Hint */}
        <div className="text-center mt-4 text-xs text-gray-400">
          Press <kbd className="px-2 py-1 bg-gray-100 rounded">Space</kbd> to play/pause
        </div>
      </div>
    </div>
  );
};

export default TimerModal;