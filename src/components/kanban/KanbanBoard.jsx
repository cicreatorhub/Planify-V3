import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

import { useTasks } from "../../context/TaskContext";

const columns = [
  {
    id: "todo",
    title: "To Do"
  },
  {
    id: "progress",
    title: "In Progress"
  },
  {
    id: "done",
    title: "Completed"
  }
];

export default function KanbanBoard() {
  const {
    tasks,
    updateTask
  } = useTasks();

  const getTasks = (status) =>
    tasks.filter(
      (task) =>
        (task.status || "todo") === status
    );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    updateTask(result.draggableId, {
      status: result.destination.droppableId
    });
  };

  return (
    <div className="card">

      <h3 style={{ marginBottom: 20 }}>
        Kanban Board
      </h3>

      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className="kanban-board">

          {columns.map((column) => (

            <Droppable
              key={column.id}
              droppableId={column.id}
            >
              {(provided) => (

                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >

                  <h3>{column.title}</h3>

                  {getTasks(column.id).map(
                    (task, index) => (

                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (

                          <div
                            className="kanban-card"
                            ref={
                              provided.innerRef
                            }
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >

                            <h4>{task.title}</h4>

                            <p>
                              {task.category}
                            </p>

                            <span
                              className={`badge ${task.priority.toLowerCase()}`}
                            >
                              {task.priority}
                            </span>

                          </div>

                        )}
                      </Draggable>

                    )
                  )}

                  {provided.placeholder}

                </div>

              )}
            </Droppable>

          ))}

        </div>
      </DragDropContext>

    </div>
  );
}
