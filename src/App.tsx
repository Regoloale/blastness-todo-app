// Baseline
import CssBaseline from "@mui/material/CssBaseline";

// Container
import TodoContainer from "./container/TodoContainer";

// Custom theme priver
import { CustomThemeProvider } from "./container/context/themeCtx";

// Components
import Header from "./components/header/Header";

// T-odo context
import { TodoProvider } from "./container/context/todoContext";

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Header />
      <TodoProvider>
        <TodoContainer />
      </TodoProvider>
    </CustomThemeProvider>
  );
}

export default App;
