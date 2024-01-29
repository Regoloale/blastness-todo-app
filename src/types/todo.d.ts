export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
  date?: Date | null;
}

export type TodoContext = {
  todos: Todo[];
  save: (todo: Todo) => void;
  update: (todo: Todo) => void;
  delete: (todo: Todo) => void;
};

export type TodoAction =
  | { type: "ADD"; payload: Todo }
  | { type: "UPDATE"; payload: number }
  | { type: "CHARGE"; payload: Todo[] }
  | { type: "DELETE"; payload: number }
  | { type: "SORT"; payload: string };
