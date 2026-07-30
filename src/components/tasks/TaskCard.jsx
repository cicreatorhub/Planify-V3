import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  Save,
  X
} from "lucide-react";

import { format } from "date-fns";
import { useTasks } from "../../context/TaskContext";

export default function TaskCard({ task }) {
  const {
    deleteTask,
    toggleTask,
    updateTask
  } = useTasks();

  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(task.title);

  const [priority, setPriority] = useState(task.priority);

  const [category, setCategory] = useState(task.category);

  const [dueDate, setDueDate] = useState(task.dueDate);

  const saveChanges = () => {
    if (!title.trim()) return;

    updateTask(task.id, {
      title: title.trim(),
      priority,
      category,
      dueDate
    });

    setEditing(false);
  };

  const cancelEdit = () => {
    setTitle(task.title);
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setEditing(false);
  };

  const badgeClass = task.priority.toLowerCase();

  return (
    <div
      className={`task-card ${
        task.completed ? "completed" : ""
      }`}
    >
      <div className="task-card-header">

        <button
          className="complete-btn"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? (
            <CheckCircle2
              size={22}
              color="#10b981"
            />
          ) : (
            <Circle size={22} />
          )}
        </button>

        <span className={`badge ${badgeClass}`}>
          {task.priority}
        </span>

      </div>

      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option>General</option>
            <option>Work</option>
            <option>Business</option>
            <option>Study</option>
            <option>Shopping</option>
            <option>Health</option>
            <option>Personal</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <div className="task-actions">

            <button
              className="btn btn-primary"
              onClick={saveChanges}
            >
              <Save size={16} />
              Save
            </button>

            <button
              className="btn"
              onClick={cancelEdit}
            >
              <X size={16} />
              Cancel
            </button>

          </div>
        </>
      ) : (
        <>
          <h3 className="task-title">
            {task.title}
          </h3>

          <p className="task-category">
            {task.category}
          </p>

          <div className="task-date">

            <Calendar size={16} />

            <span>
              {task.dueDate
                ? format(
                    new Date(task.dueDate),
                    "MMM dd, yyyy"
                  )
                : "No Due Date"}
            </span>

          </div>

          <div className="task-actions">

            <button
              className="btn btn-primary"
              onClick={() =>
                setEditing(true)
              }
            >
              <Pencil size={16} />
              Edit
            </button>

            <button
              className="btn"
              onClick={() =>
                deleteTask(task.id)
              }
            >
              <Trash2 size={16} />
              Delete
            </button>

          </div>
        </>
      )}
    </div>
  );
}
