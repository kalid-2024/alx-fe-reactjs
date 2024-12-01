import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList'; // Adjust the import based on your file structure
import '@testing-library/jest-dom/extend-expect';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);

    // Check if the initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);

    // Find the input and button elements
    const input = screen.getByPlaceholderText('Add a new todo');
    const button = screen.getByText('Add Todo');

    // Simulate typing and submitting a new todo
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    // Check if the new todo appears in the list
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);

    const todo = screen.getByText('Learn React');

    // Click on the todo to toggle its completion status
    fireEvent.click(todo);

    // Check if the todo has the line-through style when completed
    expect(todo).toHaveStyle('text-decoration: line-through');

    // Click again to unmark as completed
    fireEvent.click(todo);

    // Check if the todo no longer has the line-through style
    expect(todo).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);

    // Find and click the delete button for the first todo
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    // Check if the todo is removed from the document
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});
