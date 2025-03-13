
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Task } from "../types/task";
import { toast } from "sonner";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  addSubtask: (taskId: string, subtaskTitle: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  addTag: (taskId: string, tag: string) => void;
  removeTag: (taskId: string, tag: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        // Parse the saved tasks and convert date strings back to Date objects
        const parsedTasks = JSON.parse(savedTasks);
        return parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        }));
      } catch (e) {
        console.error("Error parsing saved tasks:", e);
        return [];
      }
    }
    return [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
    toast.success("Task added successfully");
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task status updated");
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted");
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    toast.success("Task updated successfully");
  }, []);

  const addSubtask = useCallback((taskId: string, subtaskTitle: string) => {
    if (!subtaskTitle.trim()) return;
    
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const subtasks = task.subtasks || [];
          return {
            ...task,
            subtasks: [
              ...subtasks,
              {
                id: crypto.randomUUID(),
                title: subtaskTitle,
                completed: false
              }
            ]
          };
        }
        return task;
      })
    );
    toast.success("Subtask added");
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.map((subtask) =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          };
        }
        return task;
      })
    );
  }, []);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.subtasks) {
          return {
            ...task,
            subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId)
          };
        }
        return task;
      })
    );
    toast.success("Subtask removed");
  }, []);

  const addTag = useCallback((taskId: string, tag: string) => {
    if (!tag.trim()) return;
    
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const tags = task.tags || [];
          // Don't add duplicate tags
          if (tags.includes(tag)) return task;
          return {
            ...task,
            tags: [...tags, tag]
          };
        }
        return task;
      })
    );
  }, []);

  const removeTag = useCallback((taskId: string, tag: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId && task.tags) {
          return {
            ...task,
            tags: task.tags.filter((t) => t !== tag)
          };
        }
        return task;
      })
    );
  }, []);

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      addTask, 
      toggleTask, 
      deleteTask, 
      updateTask,
      addSubtask,
      toggleSubtask,
      deleteSubtask,
      addTag,
      removeTag
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
