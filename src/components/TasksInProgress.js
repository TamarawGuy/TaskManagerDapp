import { useState } from "react";
import Task from "./Task";

const TaskInProgress = ({
  tasks,
  updateTaskStatus,
  updateTaskName,
  updateTaskReady,
}) => {
  const [text, setText] = useState("");

  const updateNameAndReady = (index, ready, name) => {
    updateTaskReady(index, ready);
    updateTaskName(index, name);
  };

  return (
    <div>
      <h3>Tasks in progress</h3>
      <ul>
        {tasks
          .map((t, i) => ({ id: i, item: t }))
          .filter((t) => t.item.status === 1)
          .map((task) => (
            <li key={task.id}>
              <Task
                status={task.item.status}
                ready={task.item.readyForUpdate}
                name={task.item.name}
              />
              <button onClick={() => updateTaskStatus(task.id, 0)}>
                Not Done
              </button>
              <button onClick={() => updateTaskStatus(task.id, 2)}>Done</button>
              <button
                style={{
                  display: task.item.readyForUpdate === 0 ? "" : "none",
                }}
                onClick={() => updateTaskReady(task.id, 1)}
              >
                Rename
              </button>
              <button
                style={{
                  display: task.item.readyForUpdate === 0 ? "none" : "",
                }}
                onClick={() => updateNameAndReady(task.id, 0, text)}
              >
                Update
              </button>
              <input
                style={{
                  display: task.item.readyForUpdate === 0 ? "none" : "",
                }}
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskInProgress;
