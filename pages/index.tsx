import { useState, useEffect } from 'react';
import type { Todo } from './api/todos';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodoTitle }),
      });

      if (response.ok) {
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => 
          todo.id === id ? updatedTodo : todo
        ));
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (loading) {
    return <div className="container">読み込み中...</div>;
  }

  return (
    <div className="container">
      <h1>Todoアプリ</h1>
      
      <form onSubmit={addTodo} className="add-form">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="新しいタスクを入力"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          追加
        </button>
      </form>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}