import { Todo, TodoAction } from "../../types/todo";

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    case "CHARGE":
      return [...action.payload];

    case "SORT":
      return state.sort((a, b) => {
        return Number(b.date) - Number(a.date);
      });

    default:
      return state;
  }
};
