'use client';
import { useState } from 'react';

export default function TaskFormComponent({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({ 
      title: title.trim(),
      description: description.trim(),
      priority 
    });
    
    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="md:col-span-1">
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-1">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}