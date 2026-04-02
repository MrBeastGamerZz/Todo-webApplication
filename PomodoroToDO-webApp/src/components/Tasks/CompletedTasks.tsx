import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Trash2, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CompletedTasks: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const todayCompleted = state.completedTasks.filter(task => {
    const completedDate = task.completedAt?.toDateString();
    const today = new Date().toDateString();
    return completedDate === today;
  });

  if (todayCompleted.length === 0) return null;

  const handleUncomplete = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const handleDelete = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-4"
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        <span>Completed Today ({todayCompleted.length})</span>
      </button>

      {isExpanded && (
        <div className="space-y-2">
          {todayCompleted.map((task) => (
            <div
              key={task.id}
              className="group flex items-center space-x-3 p-3 bg-green-50 rounded-lg animate-fadeIn"
            >
              {/* Completed Indicator */}
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>

              {/* Task Text */}
              <span className="flex-1 text-sm text-gray-600 line-through">
                {task.text}
              </span>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleUncomplete(task.id)}
                  className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                  title="Mark as incomplete"
                >
                  <RotateCcw size={14} />
                </button>
                
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                  title="Delete task"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;