import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";
import { useTasks } from "../context/TaskContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { tasks, stats } = useTasks();

  const doughnutData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [
          stats.completed,
          stats.pending
        ],
        backgroundColor: [
          "#10b981",
          "#f59e0b"
        ],
        borderWidth: 0
      }
    ]
  };

  const priorityCount = {
    High: 0,
    Medium: 0,
    Low: 0
  };

  tasks.forEach(task => {
    if (priorityCount[task.priority] !== undefined) {
      priorityCount[task.priority]++;
    }
  });

  const priorityChart = {
    labels: [
      "High",
      "Medium",
      "Low"
    ],
    datasets: [
      {
        label: "Tasks",
        data: [
          priorityCount.High,
          priorityCount.Medium,
          priorityCount.Low
        ],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,.15)",
        fill: true,
        tension: 0.35
      }
    ]
  };

  return (
    <div className="analytics-page">

      <div className="page-title">

        <h1>Analytics</h1>

        <p>
          Productivity insights and task
          statistics.
        </p>

      </div>

      <div className="analytics-grid">

        <div className="card">

          <h2>Completion Rate</h2>

          <div
            style={{
              maxWidth: 350,
              margin: "20px auto"
            }}
          >

            <Doughnut data={doughnutData} />

          </div>

        </div>

        <div className="card">

          <h2>Tasks by Priority</h2>

          <Line data={priorityChart} />

        </div>

      </div>

      <div
        className="card"
        style={{ marginTop: 30 }}
      >

        <h2>Summary</h2>

        <div className="stats-grid">

          <div className="stats-card">

            <h3>{stats.total}</h3>

            <p>Total Tasks</p>

          </div>

          <div className="stats-card">

            <h3>{stats.completed}</h3>

            <p>Completed</p>

          </div>

          <div className="stats-card">

            <h3>{stats.pending}</h3>

            <p>Pending</p>

          </div>

          <div className="stats-card">

            <h3>{stats.overdue}</h3>

            <p>Overdue</p>

          </div>

        </div>

      </div>

    </div>
  );
}
