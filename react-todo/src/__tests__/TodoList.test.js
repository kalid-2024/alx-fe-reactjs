import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useTaskStore from '../store/useTaskStore';
import TodoList from './TodoList';

// Mock Zustand store for testing
jest.mock('../store/useTaskStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TodoList Component', () => {
  let tasks;
  let addTask;
  let removeTask;
  let toggleTask;

  beforeEach(() => {
    // Mock Zustand store methods
    tasks = [
      { id: 1, title: 'Test Task 1', completed: false },
      { id: 2, title: 'Test Task 2', completed: true },
    ];

    addTask = jest.fn();
    removeTask = jest.fn();
    toggleTask = jest.fn();

    useTaskStore.mockReturnValue({
      tasks,
      addTask,
      removeTask,
      toggleTask,
    });
  });

  test('renders tasks correctly', () => {
    const { getByText } = render(<TodoList />);

    // Check if tasks are rendered
    expect(getByText('Test Task 1')).toBeInTheDocument();
    expect(getByText('Test Task 2')).toBeInTheDocument();
  });

  test('toggles a task between completed and not completed', () => {
    const { getByLabelText } = render(<TodoList />);

    // Simulate toggling the checkbox of the first task
    const checkbox = getByLabelText('checkbox for Test Task 1');
    fireEvent.click(checkbox);

    expect(toggleTask).toHaveBeenCalledWith(1);
  });

  test('removes a task', () => {
    const { getByText } = render(<TodoList />);

    // Simulate clicking the remove button for the first task
    const removeButton = getByText('Remove').closest('button');
    fireEvent.click(removeButton);

    expect(removeTask).toHaveBeenCalledWith(1);
  });

  test('adds a new task', () => {
    const { getByPlaceholderText, getByText } = render(<TodoList />);

    // Simulate adding a new task
    const input = getByPlaceholderText('Enter new task');
    fireEvent.change(input, { target: { value: 'New Task' } });
    const addButton = getByText('Add Task');
    fireEvent.click(addButton);

    expect(addTask).toHaveBeenCalledWith({ id: expect.any(Number), title: 'New Task', completed: false });
  });
});
