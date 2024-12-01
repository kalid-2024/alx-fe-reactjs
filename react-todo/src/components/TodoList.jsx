import useTaskStore from '../store/useTaskStore';

const TodoList = () => {
  const { tasks, removeTask, toggleTask } = useTaskStore();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Task List</h2>
      <ul className="list-none p-0">
        {tasks.map(task => (
          <li key={task.id} className={`flex items-center mb-2 p-2 rounded-md bg-gray-100`}>
            <span className={`flex-grow mr-4 ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2 h-4 w-4 text-green-500 cursor-pointer"
            />
            <button
              onClick={() => removeTask(task.id)}
              className="bg-red-500 text-white rounded-md py-1 px-2 cursor-pointer"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;