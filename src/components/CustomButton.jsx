import { Button } from "@mui/material";
import React from "react";
import { colorSchemes } from "../data/theme";

function CustomButton({
  onClickFunction,
  variant,
  color,
  sx,
  title,
  disabled,
}) {
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
        "&.Mui-disabled": {
          backgroundColor: colorSchemes.primaryGreen,
          color: colorSchemes.blackText,
          opacity: 0.5,
        },
      }}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
