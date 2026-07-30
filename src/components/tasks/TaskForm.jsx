import { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "../../context/TaskContext";

const initialState = {
  title: "",
  priority: "Medium",
  dueDate: "",
  category: "General"
};

export default function TaskForm() {
  const { addTask } = useTasks();

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    addTask({
      title: form.title.trim(),
      priority: form.priority,
      dueDate: form.dueDate,
      category: form.category
    });

    setForm(initialState);
  };

  return (
    <section className="task-form card">

      <h2>Create New Task</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="form-group">

            <label>Task</label>

            <input
              type="text"
              name="title"
              placeholder="Enter task title..."
              value={form.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Priority</label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
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

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>General</option>
              <option>Work</option>
              <option>Business</option>
              <option>Personal</option>
              <option>Study</option>
              <option>Shopping</option>
              <option>Health</option>
            </select>

          </div>

        </div>

        <button
          type="submit"
          className="btn btn-primary add-task-btn"
        >
          <Plus size={18} />

          <span>Add Task</span>

        </button>

      </form>

    </section>
  );
}
