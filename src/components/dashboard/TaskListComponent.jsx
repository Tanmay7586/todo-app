'use client';
import { useState } from 'react';
import TaskFormComponent from './TaskFormComponent';
import TaskItemComponent from './TaskItemComponent';

export default function TaskListComponent({ 
  tasks, 
  onCreate, 
  onUpdate, 
  onDelete 
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'All' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <TaskFormComponent onSubmit={onCreate} />
      
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">Priority:</label>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItemComponent
              key={task.id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}