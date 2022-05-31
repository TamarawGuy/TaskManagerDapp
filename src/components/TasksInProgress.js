import React from "react";
import Task from "./Task";

const TaskInProgress = ({ tasks, updateTaskStatus }) => {
  const inProgressTasks = tasks.filter((task) => task.status === 1);
  return (
    <div>
      <h3>Tasks in progress</h3>
      <ul>
        {inProgressTasks.map((task, index) => (
          <li key={index}>
            <Task status={task.status} name={task.name} />
            <button onClick={() => updateTaskStatus(index, 0)}>Not Done</button>
            <button>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskInProgress;
