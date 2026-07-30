import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  CheckSquare,
  Settings,
  PlusCircle
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/"
    },
    {
      name: "Calendar",
      icon: <CalendarDays size={20} />,
      path: "/calendar"
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={20} />,
      path: "/analytics"
    }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">

        <CheckSquare size={34} />

        <div>
          <h2>Planify</h2>
          <small>Productivity Pro</small>
        </div>

      </div>

      <button className="new-task-btn">

        <PlusCircle size={20} />

        <span>New Task</span>

      </button>

      <nav className="sidebar-nav">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.icon}

            <span>{item.name}</span>

          </NavLink>
        ))}

      </nav>

      <div className="sidebar-footer">

        <button className="settings-btn">

          <Settings size={18} />

          <span>Settings</span>

        </button>

        <p className="version">

          Planify Pro

          <br />

          Version 1.0.0

        </p>

      </div>

    </aside>
  );
}
