import React from "react";
import { Box } from "@mui/material";
// Buttons
import ButtonMode from "../ButtonMode";

type Props = {};

const Header = (props: Props) => {
  return (
    <Box
      sx={{
        height: 50,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginLeft: "auto",
          paddingRight: 1,
        }}
      >
        <ButtonMode />
      </Box>
    </Box>
  );
};

export default Header;
