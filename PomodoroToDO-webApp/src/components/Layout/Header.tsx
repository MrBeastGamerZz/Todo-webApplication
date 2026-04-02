import React from 'react';
import { Settings, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { dispatch } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🍅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PomodoroTodo</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch({ type: 'SHOW_SETTINGS', payload: true })}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Settings (S)"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;