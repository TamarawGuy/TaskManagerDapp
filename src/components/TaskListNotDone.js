import React from "react";
import Task from "./Task";

const TaskListNotDone = ({ tasks, updateTaskStatus }) => {
  const notDoneTasks = tasks.filter((task) => task.status === 0);
  return (
    <div>
      <h3>Tasks not done</h3>
      <ul>
        {notDoneTasks.map((task, index) => (
          <li key={index}>
            <Task status={task.status} name={task.name} />
            <button onClick={() => updateTaskStatus(index, 1)}>
              In Progress
            </button>
            <button>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListNotDone;
