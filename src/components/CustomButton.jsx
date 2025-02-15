import { Button } from "@mui/material";
import React from "react";
import { colorSchemes } from "../data/theme";

function CustomButton({ onClickFunction, variant, color, sx, title }) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClickFunction}
      sx={{
        ...sx,
        textTransform: "none",
        fontWeight: "bold",
        color: colorSchemes.blackText,
      }}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
