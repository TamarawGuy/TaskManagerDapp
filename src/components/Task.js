import React from "react";

const Task = ({ status, name }) => {
  return (
    <div>
      {name} <span>{`->`}</span> {status}
    </div>
  );
};

export default Task;
