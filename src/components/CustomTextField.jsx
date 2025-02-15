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
        "& input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 1000px ${colorSchemes.darkBg} inset`,
          WebkitTextFillColor: `${colorSchemes.whiteText}`,
          transition: "background-color 5000s ease-in-out 0s",
        },
        "& input:-internal-autofill-selected": {
          appearance: "none",
          backgroundColor: "transparent !important",
          color: "#000 !important",
        },
      }}
      {...props}
      s
    />
  );
};

export default CustomTextField;
