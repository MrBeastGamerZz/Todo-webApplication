import React, { useState } from 'react';
import { X, Clock, Palette, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Theme } from '../../types';

const SettingsModal: React.FC = () => {
  const { state, dispatch } = useApp();
  const [workDuration, setWorkDuration] = useState(state.settings.workDuration);
  const [breakDuration, setBreakDuration] = useState(state.settings.breakDuration);

  if (!state.showSettings) return null;

  const handleClose = () => {
    dispatch({ type: 'SHOW_SETTINGS', payload: false });
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        workDuration,
        breakDuration,
      },
    });
    handleClose();
  };

  const handleThemeChange = (theme: Theme) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { theme },
    });
  };

  const handleAutoStartToggle = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { autoStartBreak: !state.settings.autoStartBreak },
    });
  };

  const handleSoundToggle = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { soundEnabled: !state.settings.soundEnabled },
    });
  };

  const themes = [
    { id: 'tomato' as Theme, name: 'Tomato Red', color: 'bg-red-500' },
    { id: 'mint' as Theme, name: 'Mint Green', color: 'bg-green-500' },
    { id: 'midnight' as Theme, name: 'Midnight Blue', color: 'bg-blue-800' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Timer Duration Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <Clock size={16} className="mr-2" />
              Timer Duration
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={workDuration}
                  onChange={(e) => setWorkDuration(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <Palette size={16} className="mr-2" />
              Theme
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    state.settings.theme === theme.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 ${theme.color} rounded-full mx-auto mb-1`} />
                  <span className="text-xs text-gray-600">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Auto-start breaks
              </span>
              <button
                onClick={handleAutoStartToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.settings.autoStartBreak ? 'bg-red-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.settings.autoStartBreak ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 flex items-center">
                {state.settings.soundEnabled ? (
                  <Volume2 size={16} className="mr-2" />
                ) : (
                  <VolumeX size={16} className="mr-2" />
                )}
                Sound notifications
              </span>
              <button
                onClick={handleSoundToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  state.settings.soundEnabled ? 'bg-red-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    state.settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Save Changes
          </button>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Keyboard Shortcuts</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div><kbd className="px-1 bg-gray-100 rounded">Space</kbd> - Start/Pause timer</div>
            <div><kbd className="px-1 bg-gray-100 rounded">S</kbd> - Open/Close settings</div>
            <div><kbd className="px-1 bg-gray-100 rounded">Esc</kbd> - Close modals</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;