import React from "react";

const Task = ({ status, ready, name }) => {
  return (
    <div>
      <span>{name}</span>
    </div>
  );
};

export default Task;
