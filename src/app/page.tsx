"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const TodoList = () => {
  const router = useRouter();
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<{ id: number; contents: string }[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await axios.get('/api/backend');
        setTasks(response.data);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      try {
        const response = await axios.post('/api/backend', { contents: task });
        setTasks((prevTasks) => [...prevTasks, ...response.data]);
        setTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleRemoveTask = async (id: number) => {
    try {
      await axios.delete('/api/backend', { data: { id } });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Simple To-Do List</h1>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task..."
        />
        <button
          onClick={handleAddTask}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>

        <button
          onClick={() => router.push('/about')}
          className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-300 transition-colors"
        >
          Go to about page
        </button>
      </div>
      <ul className="mt-6 w-full max-w-md">
        {tasks.map(({ id, contents }) => (
          <li
            key={id}
            className="flex justify-between items-center bg-white px-4 py-2 border-b border-gray-200 rounded-lg mb-2 shadow-sm"
          >
            <span>{contents}</span>
            <button
              onClick={() => handleRemoveTask(id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
