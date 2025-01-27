import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const CustomMultiSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => onChange(e, name)}
        renderValue={(selected) => selected.join(", ")}
        label={label}
        {...props}
        sx={{
          width: "100%",
          padding: 0,
          height: "40px",
          marginTop: "10px",
        }}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            <Checkbox checked={value.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomMultiSelect;
