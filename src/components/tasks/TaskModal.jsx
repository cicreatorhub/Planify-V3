import { useState } from "react";
import { X } from "lucide-react";
import { useTasks } from "../../context/TaskContext";

export default function TaskModal({
  open,
  onClose
}) {
  const { addTask } = useTasks();

  const [form, setForm] = useState({
    title: "",
    priority: "Medium",
    category: "General",
    dueDate: ""
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    addTask(form);

    setForm({
      title: "",
      priority: "Medium",
      category: "General",
      dueDate: ""
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="task-modal">

        <div className="modal-header">

          <h2>New Task</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Task Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div className="form-group">

            <label>Category</label>

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Priority</label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

          <div className="form-group">

            <label>Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Create Task
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
