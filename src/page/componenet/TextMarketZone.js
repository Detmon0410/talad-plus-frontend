import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function BasicTextFields() {
  const [zoneInput, setZoneInput] = React.useState("");
  const [startInput, setStartInput] = React.useState("");
  const [endInput, setEndInput] = React.useState("");
  const [priceInput, setPricewordInput] = React.useState("");
  ueh;
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "10ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {" "}
      <TextField
        required
        id="zone"
        label="Zone"
        variant="outlined"
        size="small"
        value={zoneInput}
        onChange={(e) => setZoneInput(e.target.value)}
      />
      <TextField
        type="number"
        required
        id="start"
        label="Start"
        variant="outlined"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        value={startInput}
        onChange={(e) => setStartInput(e.target.value)}
      />
      <TextField
        type="number"
        required
        id="end"
        label="End"
        variant="outlined"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        value={endInput}
        onChange={(e) => setEndInput(e.target.value)}
      />
      <TextField
        required
        type="number"
        id="price"
        label="Price"
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: <InputAdornment position="start">฿</InputAdornment>,
        }}
        value={priceInput}
        onChange={(e) => setPricewordInput(e.target.value)}
      />
      <p></p>
    </Box>
  );
}
