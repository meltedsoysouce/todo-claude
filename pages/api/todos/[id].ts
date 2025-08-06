import type { NextApiRequest, NextApiResponse } from 'next';

import type { Todo } from './index';
import { todos } from './index';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { message: string } | null>
) {
  const { id } = req.query;
  const todoId = parseInt(id as string, 10);

  if (isNaN(todoId)) {
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  switch (req.method) {
    case 'PUT':
      todos[todoIndex].completed = !todos[todoIndex].completed;
      res.status(200).json(todos[todoIndex]);
      break;

    case 'DELETE':
      todos.splice(todoIndex, 1);
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}