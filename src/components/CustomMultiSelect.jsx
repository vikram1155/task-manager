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
      <InputLabel sx={{ "&.MuiInputLabel-root.Mui-focused": { mt: 1 } }}>
        {label}
      </InputLabel>
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
            <Checkbox checked={value.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomMultiSelect;
