import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

// Reducer
import { todoReducer } from "./reducers/todoReducer";

// Types and interfaces
import { Todo as TodoInterface, TodoAction } from "../../types/todo";

export const TodoContext = createContext<{
  todos: TodoInterface[];
  dispatch: Dispatch<TodoAction>;
} | null>(null);

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx)
    throw new Error(
      "You must be inside a Todo provider in order to use this context"
    );
  return ctx;
};
