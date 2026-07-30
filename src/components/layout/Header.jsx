import { Moon, Sun, Bell, Search } from "lucide-react";
import { useTasks } from "../../context/TaskContext";

export default function Header() {
  const { darkMode, setDarkMode, stats } = useTasks();

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";

    return "Good Evening 🌙";
  };

  return (
    <header className="header">

      <div className="header-left">

        <h1>{greeting()}</h1>

        <p>
          {stats.pending} task{stats.pending !== 1 ? "s" : ""} remaining
        </p>

      </div>

      <div className="header-center">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search tasks..."
          />

        </div>

      </div>

      <div className="header-right">

        <button
          className="icon-btn"
          title="Notifications"
        >
          <Bell size={20} />
        </button>

        <button
          className="icon-btn"
          title="Toggle Theme"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <div className="avatar">
          PP
        </div>

      </div>

    </header>
  );
}
