import React, { useState } from "react";

const TaskForm = ({ createTask }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setText("");
          createTask(text);
        }}
      >
        <label htmlFor="name">Enter task</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setText(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;
