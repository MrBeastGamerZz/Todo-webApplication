import React from 'react';
import { CheckCircle, Clock, Target, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ProgressDashboard: React.FC = () => {
  const { state } = useApp();

  const todayTasks = state.tasks.length;
  const completedToday = state.completedTasks.filter(task => {
    const completedDate = task.completedAt?.toDateString();
    const today = new Date().toDateString();
    return completedDate === today;
  }).length;

  const completionRate = todayTasks + completedToday > 0 
    ? Math.round((completedToday / (todayTasks + completedToday)) * 100)
    : 0;

  const stats = [
    {
      icon: Target,
      label: 'Tasks Today',
      value: todayTasks,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: completedToday,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Clock,
      label: 'Pomodoros',
      value: state.timer.totalSessions,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Flame,
      label: 'Completion',
      value: `${completionRate}%`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-lg p-4 transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Daily Progress</span>
          <span>{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;