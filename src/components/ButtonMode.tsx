import React from "react";

// Theme
import { useTheme } from "@mui/material";

import { Button } from "@mui/material";

// Custom theme
import { useCustomTheme } from "../context/themeCtx";

// Icon
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ButtonMode = () => {
  const customTheme = useCustomTheme();
  const theme = useTheme();

  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={() => customTheme.toggle()}
    >
      {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </div>
  );
};

export default ButtonMode;
