import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // ------------------------
  // Load Data
  // ------------------------

  useEffect(() => {
    const storedTasks = localStorage.getItem("planify_tasks");
    const storedTheme = localStorage.getItem("planify_theme");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    if (storedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // ------------------------
  // Save Tasks
  // ------------------------

  useEffect(() => {
    localStorage.setItem(
      "planify_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // ------------------------
  // Save Theme
  // ------------------------

  useEffect(() => {
    localStorage.setItem(
      "planify_theme",
      darkMode ? "dark" : "light"
    );

    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ------------------------
  // CRUD
  // ------------------------

  const addTask = ({
    title,
    priority,
    dueDate,
    category = "General"
  }) => {
    const task = {
      id: uuid(),
      title,
      priority,
      dueDate,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [task, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };

  const updateTask = (id, values) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              ...values
            }
          : task
      )
    );
  };

  // ------------------------
  // Statistics
  // ------------------------

  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      task => task.completed
    ).length;

    const pending = total - completed;

    const completionRate =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    const overdue = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;

      return (
        new Date(task.dueDate) <
        new Date()
      );
    }).length;

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate
    };
  }, [tasks]);

  // ------------------------
  // Context Value
  // ------------------------

  const value = {
    tasks,
    stats,
    darkMode,
    setDarkMode,
    addTask,
    deleteTask,
    toggleTask,
    updateTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
