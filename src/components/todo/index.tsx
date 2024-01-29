import { useMemo, useEffect } from "react";
import { Box } from "@mui/material";

// T-odo context hoox
import { useTodo } from "../../context/todoContext";

// T-odo list
import TodoList from "./todoList";

type Props = {};

const TodoMain = (props: Props) => {
  const { todos, dispatch } = useTodo();

  const fetchTodo = useMemo(
    () => async () => {
      try {
        const response = await fetch("https://dummyjson.com/todos").then(
          (res) => res.json()
        );

        console.log(response.todos);
        dispatch({ type: "CHARGE", payload: response.todos });
      } catch (e: any) {
        throw new Error(e);
      }
    },
    []
  );

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <TodoList />
    </Box>
  );
};

export default TodoMain;
