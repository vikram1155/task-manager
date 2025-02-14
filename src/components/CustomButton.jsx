import { Button } from "@mui/material";
import React from "react";

function CustomButton({ onClickFunction, variant, color, sx, title }) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClickFunction}
      sx={{ ...sx, textTransform: "none", fontWeight: "bold" }}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
