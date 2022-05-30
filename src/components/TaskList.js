import React from "react";
import Task from "./Task";

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task status={task.status} name={task.name} />
      ))}
    </div>
  );
};

export default TaskList;
