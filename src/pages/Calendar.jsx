import { useMemo } from "react";
import { format, isSameDay } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import MonthlyCalendar from "../components/calendar/MonthlyCalendar";

export default function Calendar() {
  const { tasks } = useTasks();

  const today = new Date();

  const todayTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      return isSameDay(
        new Date(task.dueDate),
        today
      );
    });
  }, [tasks]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (!task.dueDate) return false;

        return (
          new Date(task.dueDate) > today
        );
      })
      .sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      );
  }, [tasks]);

  return (
    <div className="calendar-page">

      <div className="page-title">

        <CalendarDays size={30} />

        <div>

          <h1>Calendar</h1>

          <p>
            View today's schedule and upcoming
            deadlines.
          </p>

        </div>
      </div>
      
      <MonthlyCalendar tasks={tasks} />

      <section className="card">

        <h2>Today's Tasks</h2>

        {todayTasks.length === 0 ? (

          <p>No tasks scheduled for today.</p>

        ) : (

          <div className="calendar-list">

            {todayTasks.map((task) => (

              <div
                key={task.id}
                className="calendar-item"
              >

                <div>

                  <h3>{task.title}</h3>

                  <small>{task.category}</small>

                </div>

                <span
                  className={`badge ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

              </div>

            ))}

          </div>

        )}

      </section>

      <section
        className="card"
        style={{ marginTop: 25 }}
      >

        <h2>Upcoming Tasks</h2>

        {upcomingTasks.length === 0 ? (

          <p>No upcoming tasks.</p>

        ) : (

          <div className="calendar-list">

            {upcomingTasks.map((task) => (

              <div
                key={task.id}
                className="calendar-item"
              >

                <div>

                  <h3>{task.title}</h3>

                  <small>
                    {format(
                      new Date(task.dueDate),
                      "EEEE, MMM dd yyyy"
                    )}
                  </small>

                </div>

                <span
                  className={`badge ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}
