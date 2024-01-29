import { useState } from "react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Typography } from "@mui/material";

// Transition component
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

// Context
import { useTodo } from "../../context/todoContext";

// Form add
import TodoAddForm from "./TodoAddForm";

// To-do type
import { Todo as TodoInterface } from "../../types/todo";

// Date formatting
import { format } from "date-fns";

import { getDayColor } from "../../container/todoList/calendarExpColor";

type Props = {};

const TodoList = (props: Props) => {
  //   To-do context
  const { todos, dispatch } = useTodo();

  const handleToggle = (value: number) => () => {
    dispatch({ type: "UPDATE", payload: value });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "DELETE", payload: id });
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: { xs: 660 },
        maxHeight: { xs: 250, lg: 450 },
        bgcolor: "background.paper",
        overflow: "scroll",
        boxShadow: 4,
        paddingX: 2,
      }}
    >
      <TodoAddForm />
      <TransitionGroup>
        {todos?.map((todo, i) => {
          const labelId = `checkbox-list-label-${todo.todo}`;

          return (
            <Collapse key={todo.id}>
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    onClick={() => handleDeleteTodo(todo.id)}
                    edge="end"
                    aria-label="delete todo"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(todo.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={todo.todo}
                    secondary={
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.7,
                            color: getDayColor(todo.date),
                          }}
                        >
                          <CalendarMonthIcon sx={{ width: { lg: 13 } }} />{" "}
                          {todo.date ? format(todo.date, "dd-MM-yyyy") : "∞"}
                        </Typography>
                      </Box>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </List>
  );
};

export default TodoList;
