import { useTasks } from "../../context/TaskContext";

export default function Progress() {
  const { stats } = useTasks();

  const percentage = stats.completionRate;

  const message = () => {
    if (percentage === 100 && stats.total > 0)
      return "🎉 Excellent! All tasks completed.";

    if (percentage >= 75)
      return "🔥 Great work! Keep the momentum.";

    if (percentage >= 50)
      return "💪 You're making good progress.";

    if (percentage >= 25)
      return "🚀 Keep going, you're getting there.";

    return "📋 Start completing tasks to increase your productivity.";
  };

  return (
    <section className="progress-card card">

      <div className="progress-header">

        <div>
          <h2>Today's Progress</h2>
          <p>{message()}</p>
        </div>

        <h1>{percentage}%</h1>

      </div>

      <div className="progress-track">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`
          }}
        />

      </div>

      <div className="progress-footer">

        <div>

          <strong>{stats.completed}</strong>

          <span>Completed</span>

        </div>

        <div>

          <strong>{stats.pending}</strong>

          <span>Pending</span>

        </div>

        <div>

          <strong>{stats.total}</strong>

          <span>Total</span>

        </div>

      </div>

    </section>
  );
}
