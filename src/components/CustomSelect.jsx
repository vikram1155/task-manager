import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomSelect = ({ label, name, value, onChange, options, ...props }) => {
  return (
    <FormControl fullWidth>
      <InputLabel sx={{ "&.MuiInputLabel-root.Mui-focused": { mt: 1 } }}>
        {label}
      </InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e, name)}
        label={label}
        {...props}
        sx={{
          width: "100%",
          padding: 0,
          "&.MuiInputBase-root": {
            marginTop: "8px",
          },
          "& .MuiSelect-select": {
            p: "8.5px",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
