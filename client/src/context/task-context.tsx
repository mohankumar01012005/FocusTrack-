
import React, { createContext, useState, useContext } from "react";
import { uniqueId } from "@/lib/utils";

export type TaskCategory = "Work" | "Personal" | "Urgent";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: TaskCategory;
  createdAt: Date;
};

type TaskFilter = "all" | "completed" | "pending";

type TaskContextType = {
  tasks: Task[];
  filter: TaskFilter;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, task: Partial<Omit<Task, "id" | "createdAt">>) => void;
  setFilter: (filter: TaskFilter) => void;
  filteredTasks: Task[];
  reorderTasks: (startIndex: number, endIndex: number) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

const defaultTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete project proposal",
    description: "Finish the draft and send it for review",
    completed: false,
    category: "Work",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: "task-2",
    title: "Buy groceries",
    description: "Get milk, eggs, bread, and vegetables",
    completed: true,
    category: "Personal",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: "task-3",
    title: "Prepare presentation",
    description: "Create slides for the team meeting",
    completed: false,
    category: "Urgent",
    createdAt: new Date()
  },
  {
    id: "task-4",
    title: "Schedule dentist appointment",
    description: "Call the clinic and book a time slot",
    completed: false,
    category: "Personal",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: "task-5",
    title: "Review pull requests",
    description: "Check the pending PRs and provide feedback",
    completed: false,
    category: "Work",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: uniqueId(),
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  
  const reorderTasks = (startIndex: number, endIndex: number) => {
    const result = Array.from(filteredTasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    // Map back to the original task array
    const newTasks = tasks.slice();
    filteredTasks.forEach((task, index) => {
      const originalIndex = newTasks.findIndex(t => t.id === task.id);
      if (originalIndex !== -1) {
        newTasks[originalIndex] = result[index];
      }
    });
    
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        updateTask,
        setFilter,
        filteredTasks,
        reorderTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
