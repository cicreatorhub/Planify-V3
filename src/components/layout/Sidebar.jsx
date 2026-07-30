import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  CheckSquare,
  Settings,
  PlusCircle,
  X
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/"
    },
    {
      name: "Calendar",
      icon: <CalendarDays size={18} />,
      path: "/calendar"
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/analytics"
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Mobile Close Button */}
        <button
          className="sidebar-close"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={22} />
        </button>

        <div className="logo">
          <CheckSquare size={25} />

          <div>
            <h2>Planify</h2>
            <small>Productivity Pro</small>
          </div>
        </div>

        <button className="new-task-btn">
          <PlusCircle size={16} />
          <span>New Task</span>
        </button>

        <nav className="sidebar-nav">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setSidebarOpen(false)}
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
            <Settings size={16} />
            <span>Settings</span>
          </button>

          <p className="version">
            Planify Pro
            <br />
            Version 1.0.0
          </p>
        </div>
      </aside>
    </>
  );
}
