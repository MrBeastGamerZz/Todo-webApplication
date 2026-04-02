import React from 'react';
import { AppProvider } from './context/AppContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import Header from './components/Layout/Header';
import ProgressDashboard from './components/Dashboard/ProgressDashboard';
import TaskList from './components/Tasks/TaskList';
import TimerModal from './components/Timer/TimerModal';
import SettingsModal from './components/Settings/SettingsModal';

const AppContent: React.FC = () => {
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Dashboard */}
          <div className="lg:col-span-1">
            <ProgressDashboard />
          </div>
          
          {/* Right Column - Task List */}
          <div className="lg:col-span-2">
            <TaskList />
          </div>
        </div>
      </main>

      {/* Modals */}
      <TimerModal />
      <SettingsModal />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;