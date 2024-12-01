import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import Snackbar from './components/Snackbar';
import * as test from '../src/__tests__/TodoList.test'
const App = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 rounded-lg shadow-md bg-white text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Task Tracker</h1>
        </div>
        <div className="mb-4">
          <AddTodoForm />
          <TodoList />
          <test/>
        </div>
         <Snackbar />
      </div>
    </div>
  );
}

export default App;
