import { TableCell } from "@mui/material";
import React from "react";

const tableCellStyles = {
  fontWeight: "bold",
  fontSize: 16,
  "&.MuiTableCell-root": {
    zIndex: 0,
  },
};

const CustomTableCell = ({ value, sx }) => {
  return <TableCell sx={{ sx, ...tableCellStyles }}>{value}</TableCell>;
};

export default CustomTableCell;
