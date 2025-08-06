import type { NextApiRequest, NextApiResponse } from 'next';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export let todos: Todo[] = [
  { id: 1, title: 'サンプルタスク1', completed: false },
  { id: 2, title: 'サンプルタスク2', completed: true },
];

export let nextId = 3;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | Todo | { message: string }>
) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(todos);
      break;

    case 'POST':
      const { title } = req.body;
      if (!title || typeof title !== 'string') {
        res.status(400).json({ message: 'Title is required' });
        return;
      }

      const newTodo: Todo = {
        id: nextId++,
        title,
        completed: false,
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}