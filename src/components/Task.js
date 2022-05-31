import React from "react";

const Task = ({ status, ready, name }) => {
  return (
    <div>
      <span>
        Status: {status} Ready: {ready} Name: {name}
      </span>
    </div>
  );
};

export default Task;
