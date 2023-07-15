import React from "react";
import { Alert, AlertTitle } from "@mui/material";

const CustomAlert = ({ showAlert, message, handleCloseAlert, serv }) => {
  if (!showAlert) {
    return null;
  }

  return (
    <Alert
      severity={serv}
      sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      onClose={handleCloseAlert}
    >
      <AlertTitle>Status</AlertTitle>
      {message}
    </Alert>
  );
};

export default CustomAlert;
