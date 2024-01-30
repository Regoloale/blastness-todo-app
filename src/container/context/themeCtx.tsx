import { createContext, useState, useMemo, useContext } from "react";

// Mui theme
import { createTheme, ThemeProvider } from "@mui/material";

export const ColorModeContext = createContext({ toggle: () => {} });

export const CustomThemeProvider = ({ children }: any) => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggle: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    console.log("Sta cambiando mode", mode);
    return createTheme({
      palette: {
        mode,
        ...(mode === "dark" && {
          background: {
            paper: "#181818",
          },
        }),
      },
    });
  }, [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const ctx = useContext(ColorModeContext);

  if (!ctx)
    throw new Error("useCustomTheme must be used within a CustomThemeProvide");
  return ctx;
};
