import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButtons(...rest) {
  return (
    <Stack>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#ffc422",
          fontSize: "18px",
        }}
        {...rest}
      >
        Login
      </Button>
    </Stack>
  );
}
