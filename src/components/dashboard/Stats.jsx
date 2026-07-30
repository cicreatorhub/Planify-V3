import {
  CheckCircle2,
  Clock3,
  ListTodo,
  AlertTriangle
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";

export default function Stats() {
  const { stats } = useTasks();

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: <ListTodo size={24} />,
      color: "#4f46e5"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: <CheckCircle2 size={24} />,
      color: "#10b981"
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <Clock3 size={24} />,
      color: "#f59e0b"
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: <AlertTriangle size={24} />,
      color: "#ef4444"
    }
  ];

  return (
    <section className="stats-grid">

      {cards.map((card) => (
        <div
          key={card.title}
          className="stats-card"
        >

          <div
            className="stats-icon"
            style={{
              backgroundColor: card.color
            }}
          >
            {card.icon}
          </div>

          <div className="stats-content">

            <h3>{card.value}</h3>

            <p>{card.title}</p>

          </div>

        </div>
      ))}

    </section>
  );
}
