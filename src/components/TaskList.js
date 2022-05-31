import React from "react";
import Task from "./Task";

const TaskList = ({ tasks }) => {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <Task status={task.status} name={task.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
