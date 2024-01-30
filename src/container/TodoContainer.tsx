import { useMemo, useEffect } from "react";

// Mui components
import { Box } from "@mui/material";

// To-do context hook
import { useTodo } from "./context/todoContext";

// To-do list main component
import TodoList from "../components/todo/todoList";

// Types
import { SubmitTodoInterf } from "../types/functionsTypes";

const TodoContainer = () => {
  const { dispatch } = useTodo();

  // Initial todos data hydratation
  const fetchTodo = useMemo(
    () => async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos").then(
          (res) => res.json()
        );

        // Setting a timeout to let my Skeletons SHINE
        setTimeout(() => {
          dispatch({ type: "CHARGE", payload: response.todos });
        }, 1800);
      } catch (e: any) {
        throw new Error(e);
      }
    },
    []
  );
  useEffect(() => {
    fetchTodo();
  }, []);

  // Handling todos toggle (indicating a "completed" status of todo)
  const handleToggle = (value: number) => () => {
    dispatch({ type: "UPDATE", payload: value });
  };

  // Handling todo delete action
  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  // Handle submitting add todo form function
  const handleSubmitTodo = async ({
    id,
    completed,
    todo,
    date,
  }: SubmitTodoInterf) => {
    try {
      const addResult = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo,
          completed,
          userId: 1,
        }),
      }).then((res) => res.json());

      // If the backend return successfully response i'll reflect the new todo on frontend
      if (addResult.id) {
        // Dispatching the action to the reducer
        dispatch({
          type: "ADD",
          payload: {
            id,
            completed,
            todo,
            date,
          },
        });
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <TodoList
        handleDeleteTodo={handleDeleteTodo}
        handleToggle={handleToggle}
        handleSubmitTodo={handleSubmitTodo}
      />
    </Box>
  );
};

export default TodoContainer;
