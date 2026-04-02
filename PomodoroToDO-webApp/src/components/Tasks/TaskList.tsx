import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TaskItem from './TaskItem';
import CompletedTasks from './CompletedTasks';

const TaskList: React.FC = () => {
  const { state, dispatch } = useApp();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch({ type: 'ADD_TASK', payload: newTask.trim() });
      setNewTask('');
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(state.tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({ type: 'REORDER_TASKS', payload: items });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
        <span className="text-sm text-gray-500">
          {state.tasks.length} active
        </span>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-2">
        {state.tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks yet. Add one above to get started!</p>
          </div>
        ) : (
          state.tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
            />
          ))
        )}
      </div>

      {/* Completed Tasks */}
      <CompletedTasks />
    </div>
  );
};

export default TaskList;