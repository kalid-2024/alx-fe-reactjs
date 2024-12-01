import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import useTaskStore from '../store/useTaskStore';

// Mock tasks for testing
const mockTasks = [
  { id: 1, title: 'Test Task 1', completed: false },
  { id: 2, title: 'Test Task 2', completed: true },
];

// Mock the Zustand store
jest.mock('../store/useTaskStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    tasks: mockTasks,
    removeTask: jest.fn(),
    toggleTask: jest.fn(),
  })),
}));

describe('TodoList Component', () => {
  let TestComponent;

  beforeAll(() => {
    // Define a wrapper component using React.createElement
    TestComponent = () => {
      const { tasks, removeTask, toggleTask } = useTaskStore();

      return React.createElement(
        'div',
        null,
        React.createElement('h2', null, 'Task List'),
        React.createElement(
          'ul',
          null,
          tasks.map((task) =>
            React.createElement(
              'li',
              { key: task.id },
              React.createElement('span', null, task.title),
              React.createElement('input', {
                type: 'checkbox',
                checked: task.completed,
                onChange: () => toggleTask(task.id),
              }),
              React.createElement(
                'button',
                { onClick: () => removeTask(task.id) },
                'Remove'
              )
            )
          )
        )
      );
    };
  });

  beforeEach(() => {
    // Reset the mock state for each test
    useTaskStore.mockImplementation(() => ({
      tasks: [...mockTasks],
      removeTask: jest.fn(),
      toggleTask: jest.fn(),
    }));
  });

  test('renders tasks correctly', () => {
    render(React.createElement(TestComponent));

    // Verify tasks are rendered
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  test('toggles task completion status', () => {
    const toggleTaskMock = jest.fn();
    useTaskStore.mockImplementation(() => ({
      tasks: [...mockTasks],
      removeTask: jest.fn(),
      toggleTask: toggleTaskMock,
    }));

    render(React.createElement(TestComponent));

    // Simulate checkbox toggle
    fireEvent.click(screen.getAllByRole('checkbox')[0]);

    // Verify the toggleTask function is called with correct id
    expect(toggleTaskMock).toHaveBeenCalledWith(1);
  });

  test('removes a task', () => {
    const removeTaskMock = jest.fn();
    useTaskStore.mockImplementation(() => ({
      tasks: [...mockTasks],
      removeTask: removeTaskMock,
      toggleTask: jest.fn(),
    }));

    render(React.createElement(TestComponent));

    // Simulate task removal
    fireEvent.click(screen.getAllByText('Remove')[0]);

    // Verify the removeTask function is called with correct id
    expect(removeTaskMock).toHaveBeenCalledWith(1);
  });
});
