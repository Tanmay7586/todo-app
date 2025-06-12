'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/services/authService';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '@/services/taskService';
import TaskListComponent from '@/components/dashboard/TaskListComponent';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    const fetchTasks = async () => {
      try {
        const token = await currentUser.getIdToken();
        const tasks = await getTasks(token);
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [currentUser, router]);

  const handleCreate = async (newTask) => {
    try {
      const token = await currentUser.getIdToken();
      const createdTask = await createTask(newTask, token);
      setTasks([...tasks, createdTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const token = await currentUser.getIdToken();
      await updateTask(id, updates, token);
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await currentUser.getIdToken();
      await deleteTask(id, token);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <TaskListComponent
      tasks={tasks}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}