import { Typography } from "@mui/material";
import React from "react";
import { colorSchemes } from "../data/theme";

function CustomHeader({ sx, value }) {
  return (
    <Typography
      sx={{
        ...sx,
        fontWeight: "bold",
        fontSize: 20,
        color: colorSchemes.whiteText,
      }}
    >
      {value}
    </Typography>
  );
}

export default CustomHeader;
