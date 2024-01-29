// Baseline
import CssBaseline from "@mui/material/CssBaseline";

// App wrapper
import AppWrapper from "./components/AppWrapper";

// Custom theme priver
import { CustomThemeProvider } from "./context/themeCtx";

// Theme
import { useTheme } from "@mui/material";

// Components
import Header from "./components/header/Header";
import TodoMain from "./components/todo";

// T-odo context
import { TodoProvider } from "./context/todoContext";

function App() {
  const theme = useTheme();

  return (
    <CustomThemeProvider>
      <CssBaseline />
      <Header />
      <TodoProvider>
        <TodoMain />
      </TodoProvider>
    </CustomThemeProvider>
  );
}

export default App;
