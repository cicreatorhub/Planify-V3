import { format, isToday, isTomorrow, isPast } from "date-fns";

/**
 * Format a date into a readable string.
 */
export const formatDate = (date) => {
  if (!date) return "No Due Date";

  try {
    return format(new Date(date), "MMM dd, yyyy");
  } catch {
    return "Invalid Date";
  }
};

/**
 * Returns Today, Tomorrow or formatted date.
 */
export const formatFriendlyDate = (date) => {
  if (!date) return "No Due Date";

  const d = new Date(date);

  if (isToday(d)) return "Today";

  if (isTomorrow(d)) return "Tomorrow";

  return format(d, "EEE, MMM dd");
};

/**
 * Check if task is overdue.
 */
export const isOverdue = (task) => {
  if (!task.dueDate) return false;

  if (task.completed) return false;

  return isPast(new Date(task.dueDate));
};

/**
 * Priority sorting.
 */
export const priorityWeight = (priority) => {
  switch (priority) {
    case "High":
      return 3;

    case "Medium":
      return 2;

    case "Low":
      return 1;

    default:
      return 0;
  }
};

/**
 * Sort tasks by priority.
 */
export const sortByPriority = (tasks) => {
  return [...tasks].sort(
    (a, b) =>
      priorityWeight(b.priority) -
      priorityWeight(a.priority)
  );
};

/**
 * Sort tasks by due date.
 */
export const sortByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    return (
      new Date(a.dueDate) -
      new Date(b.dueDate)
    );
  });
};

/**
 * Search tasks.
 */
export const searchTasks = (
  tasks,
  keyword
) => {
  if (!keyword.trim()) return tasks;

  const q = keyword.toLowerCase();

  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(q) ||
      task.category.toLowerCase().includes(q)
  );
};

/**
 * Group tasks by category.
 */
export const groupByCategory = (tasks) => {
  return tasks.reduce((groups, task) => {
    if (!groups[task.category]) {
      groups[task.category] = [];
    }

    groups[task.category].push(task);

    return groups;
  }, {});
};

/**
 * Productivity score (0–100)
 */
export const calculateScore = (tasks) => {
  if (tasks.length === 0) return 0;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  return Math.round(
    (completed / tasks.length) * 100
  );
};

/**
 * Generate dashboard statistics.
 */
export const dashboardStats = (tasks) => {
  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = tasks.length - completed;

  const overdue = tasks.filter(
    (task) => isOverdue(task)
  ).length;

  return {
    total: tasks.length,
    completed,
    pending,
    overdue,
    score: calculateScore(tasks)
  };
};
