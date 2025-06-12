'use client';
import { useState } from 'react';

export default function TaskItemComponent({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleUpdate = () => {
    onUpdate(task.id, editedTask);
    setIsEditing(false);
  };

  const handleStatusChange = () => {
    onUpdate(task.id, {
      status: task.status === 'Active' ? 'Completed' : 'Active'
    });
  };

  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${task.status === 'Completed' ? 'opacity-70' : ''}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <div className="flex gap-2">
            <button 
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.status === 'Completed'}
              onChange={handleStatusChange}
              className="mt-1 h-5 w-5"
            />
            <div className="flex-1">
              <h3 className={`font-medium ${task.status === 'Completed' ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 text-sm mt-1">{task.description}</p>
              )}
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}