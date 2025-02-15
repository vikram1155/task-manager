import { TableCell } from "@mui/material";
import React from "react";
import { colorSchemes } from "../data/theme";

const tableCellStyles = {
  fontSize: 16,
  "&.MuiTableCell-root": {
    zIndex: 0,
  },
  backgroundColor: colorSchemes.darkBg,

  // borderRight: `1px solid ${colorSchemes.blackBg}`,
  borderBottom: `1px solid ${colorSchemes.blackBg}`,
};

const CustomTableCell = ({ value, sx, type }) => {
  return (
    <TableCell
      sx={{
        sx,
        ...tableCellStyles,
        fontWeight: type === "tableBody" ? 400 : 600,
        fontSize: type === "tableBody" ? "14px" : "16px",
        color:
          type === "tableBody" ? colorSchemes.whiteText : colorSchemes.primaryGreen,
      }}
    >
      {value}
    </TableCell>
  );
};

export default CustomTableCell;
