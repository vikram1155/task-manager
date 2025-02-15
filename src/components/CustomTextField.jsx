import React from "react";
import { TextField } from "@mui/material";
import { colorSchemes } from "../data/theme";

const CustomTextField = ({ label, name, value, onChange, sx, ...props }) => {
  return (
    <TextField
      margin="normal"
      size="small"
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      sx={{
        ...sx,
        backgroundColor: colorSchemes.darkBg,
        borderRadius: "4px",
        "& .MuiOutlinedInput-input": {
          color: `${colorSchemes.whiteText} !important`,
        },
        "& .MuiInputLabel-root": {
          color: `${colorSchemes.whiteText} !important`,
        },
        "& .MuiInputLabel-outlined": {
          color: `${colorSchemes.whiteText} !important`,
        },
        "& .Mui-disabled": {
          color: `${colorSchemes.whiteText} !important`,
          WebkitTextFillColor: `${colorSchemes.whiteText} !important`,
          opacity: "0.5",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: `${colorSchemes.darkBg} !important`,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: `${colorSchemes.darkBg} !important`,
        },
        // MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlined Input-notchedOutline
      }}
      {...props}
      s
    />
  );
};

export default CustomTextField;
