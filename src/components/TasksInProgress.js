import Task from "./Task";

const TaskInProgress = ({ tasks, updateTaskStatus }) => {
  return (
    <div>
      <h3>Tasks in progress</h3>
      <ul>
        {tasks
          .map((t, i) => ({ id: i, item: t }))
          .filter((t) => t.item.status === 1)
          .map((task, index) => (
            <li key={index}>
              <Task status={task.item.status} name={task.item.name} />
              <button onClick={() => updateTaskStatus(task.id, 0)}>
                Not Done
              </button>
              <button onClick={() => updateTaskStatus(task.id, 2)}>Done</button>
              <button>Update</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskInProgress;
