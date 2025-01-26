import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, name, value, onChange, ...props }) => {
  return (
    <TextField
      margin="normal"
      size="small"
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomTextField;
