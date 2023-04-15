import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const ExpirationDateInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const inputVal = event.target.value;
    // Remove any non-digit characters from the input value
    const newValue = inputVal.replace(/\D/g, "");
    // Format the value as MM/YY
    const formattedValue = newValue
      .slice(0, 4)
      .replace(/^(\d{2})(\d{1,2})/, "$1/$2");
    // Update the state with the formatted value
    setValue(formattedValue);
  };

  return (
    <TextField
      label="Expiration Date"
      value={value}
      onChange={handleChange}
      inputProps={{ maxLength: 5 }}
    />
  );
};

export default ExpirationDateInput;
