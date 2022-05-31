import Task from "./Task";

const TaskNotDone = ({ tasks, updateTaskStatus }) => {
  return (
    <div>
      <h3>Tasks not done</h3>
      <ul>
        {tasks
          .map((t, i) => ({ id: i, item: t }))
          .filter((t) => t.item.status === 0)
          .map((task, index) => (
            <li key={index}>
              <Task status={task.item.status} name={task.item.name} />
              <button onClick={() => updateTaskStatus(task.id, 1)}>
                In Progress
              </button>
              <button onClick={() => updateTaskStatus(task.id, 2)}>Done</button>
              <button>Update</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskNotDone;
