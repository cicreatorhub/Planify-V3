import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useTasks } from "../../context/TaskContext";
import TaskCard from "./TaskCard";

export default function TaskList() {
  const { tasks } = useTasks();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((task) =>
        task.title.toLowerCase().includes(keyword) ||
        task.category.toLowerCase().includes(keyword)
      );
    }

    switch (filter) {
      case "completed":
        result = result.filter((task) => task.completed);
        break;

      case "pending":
        result = result.filter((task) => !task.completed);
        break;

      case "high":
        result = result.filter(
          (task) => task.priority === "High"
        );
        break;

      case "medium":
        result = result.filter(
          (task) => task.priority === "Medium"
        );
        break;

      case "low":
        result = result.filter(
          (task) => task.priority === "Low"
        );
        break;

      default:
        break;
    }

    result.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    return result;
  }, [tasks, search, filter]);

  return (
    <section className="task-list card">

      <div className="task-list-header">

        <h2>Tasks</h2>

        <span>
          {filteredTasks.length} of {tasks.length}
        </span>

      </div>

      <div className="task-toolbar">

        <div className="search-input">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="all">
            All Tasks
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="high">
            High Priority
          </option>

          <option value="medium">
            Medium Priority
          </option>

          <option value="low">
            Low Priority
          </option>

        </select>

      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">

          <h3>No tasks found</h3>

          <p>
            Create a new task or change your
            filters.
          </p>

        </div>
      ) : (
        <div className="task-grid">

          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}

        </div>
      )}

    </section>
  );
}
