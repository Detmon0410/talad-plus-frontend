import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BasicSelect = (props) => {
  const { items, role, setRole, n } = props;

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{n}</InputLabel>
        <Select
          labelId="roleselect"
          id="roleselect"
          value={role}
          label={n}
          onChange={handleChange}
        >
          {items.map((item) => {
            return <MenuItem value={item.value}>{item.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
