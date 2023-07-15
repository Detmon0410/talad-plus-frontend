import React, { useState, useEffect } from "react";
import { Button, Alert, AlertTitle } from "@mui/material";
import CustomAlert from "./Alert2077";
const Testaleart = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = React.useState("");
  const [serv, setServ] = React.useState("");
  const handleShowAlert = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <button onClick={handleShowAlert}>Show Alert</button>
      <CustomAlert
        showAlert={showAlert}
        message={message}
        handleCloseAlert={handleCloseAlert}
        serv={serv}
      />
      <div style={{ height: "2000px" }}>Long Content</div>
    </div>
  );
};

export default Testaleart;
