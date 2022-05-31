import Task from "./Task";

const TaskDone = ({ tasks, updateTaskStatus }) => {
  return (
    <div>
      <h3>Done Tasks</h3>
      <ul>
        {tasks
          .map((t, i) => ({ id: i, item: t }))
          .filter((t) => t.item.status === 2)
          .map((task, index) => (
            <li key={index}>
              <Task status={task.item.status} name={task.item.name} />
              <button onClick={() => updateTaskStatus(task.id, 0)}>
                Not Done
              </button>
              <button onClick={() => updateTaskStatus(task.id, 1)}>
                In Progress
              </button>
              <button>Update</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskDone;
