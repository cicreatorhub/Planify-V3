import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import { format, subDays } from "date-fns";
import { useTasks } from "../../context/TaskContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function ProductivityChart() {
  const { tasks } = useTasks();

  const chartData = useMemo(() => {
    const labels = [];
    const completed = [];

    for (let i = 6; i >= 0; i--) {
      const day = subDays(new Date(), i);

      labels.push(format(day, "EEE"));

      const count = tasks.filter((task) => {
        if (!task.completed) return false;

        const completedDate = task.completedAt
          ? new Date(task.completedAt)
          : new Date(task.createdAt);

        return (
          completedDate.toDateString() ===
          day.toDateString()
        );
      }).length;

      completed.push(count);
    }

    return {
      labels,
      datasets: [
        {
          label: "Completed Tasks",
          data: completed,
          borderColor: "#4f46e5",
          backgroundColor: "rgba(79,70,229,.15)",
          fill: true,
          tension: 0.35,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    };
  }, [tasks]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false
      }
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <div className="card productivity-chart">

      <div className="chart-header">

        <div>

          <h2>Weekly Productivity</h2>

          <p>
            Completed tasks over the last 7 days
          </p>

        </div>

      </div>

      <div
        style={{
          height: "320px",
          marginTop: "20px"
        }}
      >
        <Line
          data={chartData}
          options={options}
        />
      </div>

    </div>
  );
}
