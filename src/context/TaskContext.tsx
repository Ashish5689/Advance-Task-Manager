import React, { createContext, useContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task, TaskFilter } from '../types';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  filter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  filteredTasks: Task[];
  reorderTasks: (startIndex: number, endIndex: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useLocalStorage<TaskFilter>('taskFilter', 'all');

  const addTask = useCallback((title: string) => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev: Task[]) => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev: Task[]) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
  }, [setTasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'pending':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Enhanced reorderTasks function that works correctly with filtered tasks
  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    // If we're in the "all" filter, we can reorder directly
    if (filter === 'all') {
      setTasks((prev: Task[]) => {
        const result = Array.from(prev);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      });
    } else {
      // For filtered tasks, we need to map the filtered indices to the actual task indices
      setTasks((prev: Task[]) => {
        // Get the actual tasks that are being displayed in the filtered view
        const filtered = filteredTasks;
        
        // Get the task that is being moved
        const movedTask = filtered[startIndex];
        
        // Find the indices of all filtered tasks in the original array
        const actualIndices = filtered.map(task => 
          prev.findIndex(t => t.id === task.id)
        );
        
        // Get the actual source and destination indices
        const actualSourceIndex = prev.findIndex(t => t.id === movedTask.id);
        const actualDestIndex = actualIndices[endIndex];
        
        // Create a new array and perform the reordering
        const result = Array.from(prev);
        const [removed] = result.splice(actualSourceIndex, 1);
        
        // Calculate the correct insertion index
        let insertionIndex = actualDestIndex;
        if (actualSourceIndex < actualDestIndex) {
          insertionIndex -= 1; // Adjust for the removed item
        }
        
        result.splice(insertionIndex + 1, 0, removed);
        return result;
      });
    }
  }, [setTasks, filter, filteredTasks]);

  const value = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    filter,
    setFilter,
    filteredTasks,
    reorderTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}; 