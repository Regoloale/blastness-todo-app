import { useState, MouseEvent, FormEvent } from "react";

import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { Button } from "@mui/material";
import Popover from "@mui/material/Popover";

// Localization adapter and calendar
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { it } from "date-fns/locale";

// To-do reducer hook
import { useTodo } from "../../container/context/todoContext";

// Date formatter
import { format } from "date-fns";

// Info tooltip
import Tooltip from "@mui/material/Tooltip";

// To-do types
import { SubmitTodoInterf } from "../../types/functionsTypes";

type Props = {
  handleSubmitTodo: (val: SubmitTodoInterf) => void;
};

const TodoAddForm = ({ handleSubmitTodo }: Props) => {
  const [text, setText] = useState("");
  const [popAnchor, setPopAnchor] = useState<HTMLButtonElement | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [showTooltip, setShowTooltip] = useState({
    open: false,
    alreadyShow: false,
  });

  // To-do reducer hook
  const { dispatch } = useTodo();

  const handleChange = (e: any) => {
    setText(e.target.value);

    // I should add a Debounce function
    if (!showTooltip.alreadyShow) {
      setShowTooltip({ open: true, alreadyShow: false });
      setTimeout(() => {
        setShowTooltip({ open: false, alreadyShow: true });
      }, 4000);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitTodo({
      id: Math.random(),
      completed: false,
      todo: text,
      date: pickedDate,
    });
  };

  const handlePopPick = (e: MouseEvent<HTMLButtonElement>) => {
    setPopAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setPopAnchor(null);
  };

  const handleDatePick = (val: Date) => {
    handleClose();
    setPickedDate(val);
  };

  // It was just a foolish idea ;)
  // const handleSortList = () => {
  //   dispatch({ type: "SORT", payload: "" });
  // };

  return (
    <LocalizationProvider adapterLocale={it} dateAdapter={AdapterDateFns}>
      <ListItem>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Tooltip
            open={showTooltip.open}
            title="Premi INVIO per salvare"
            arrow
            placement="top"
          >
            <TextField
              sx={{ width: "100%" }}
              name="todo"
              label="Aggiungi azione"
              variant="outlined"
              onChange={handleChange}
              value={text}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      sx={{ color: "primary.light" }}
                      aria-label="Crea todo"
                      onClick={handlePopPick}
                      variant="outlined"
                    >
                      {!pickedDate
                        ? "Scadenza"
                        : format(pickedDate, "dd-MM-yy")}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            id={"date_add_popover"}
            open={Boolean(popAnchor)}
            onClose={handleClose}
            anchorEl={popAnchor}
          >
            <DateCalendar onChange={handleDatePick} />
          </Popover>
        </form>
        {/* <Button onClick={handleSortList}>Sort</Button> */}
      </ListItem>
    </LocalizationProvider>
  );
};

export default TodoAddForm;
