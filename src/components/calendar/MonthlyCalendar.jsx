import { useMemo, useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay
} from "date-fns";

import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

export default function MonthlyCalendar({ tasks }) {

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(() => {

    const start = startOfWeek(
      startOfMonth(currentMonth)
    );

    const end = endOfWeek(
      endOfMonth(currentMonth)
    );

    return eachDayOfInterval({
      start,
      end
    });

  }, [currentMonth]);

  const tasksForDate = (date) =>
    tasks.filter(
      (task) =>
        task.dueDate &&
        isSameDay(
          new Date(task.dueDate),
          date
        )
    );

  return (

    <section className="card">

      <div className="calendar-header">

        <button
          className="calendar-nav-btn"
          onClick={() =>
            setCurrentMonth(
              subMonths(currentMonth, 1)
            )
          }
        >
          <ChevronLeft size={18} />
        </button>

        <h2>
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          className="calendar-nav-btn"
          onClick={() =>
            setCurrentMonth(
              addMonths(currentMonth, 1)
            )
          }
        >
          <ChevronRight size={18} />
        </button>

      </div>

      <div className="calendar-grid">

        {weekDays.map((day) => (
          <div
            key={day}
            className="weekday"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day) => {

          const dayTasks =
            tasksForDate(day);

          return (

            <div
              key={day.toISOString()}
              className={`calendar-cell
                ${
                  !isSameMonth(
                    day,
                    currentMonth
                  )
                    ? "other-month"
                    : ""
                }
                ${
                  isToday(day)
                    ? "today"
                    : ""
                }
              `}
            >

              <div className="date-number">
                {format(day, "d")}
              </div>

              {dayTasks.length > 0 && (

                <div className="task-dots">

                  {dayTasks
                    .slice(0, 3)
                    .map((task) => (

                      <span
                        key={task.id}
                        className={`dot ${task.priority.toLowerCase()}`}
                      />

                    ))}

                  {dayTasks.length > 3 && (

                    <small>
                      +{dayTasks.length - 3}
                    </small>

                  )}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </section>

  );

}
