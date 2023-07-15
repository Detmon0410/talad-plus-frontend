import * as React from "react";
import Alert from "@mui/material/Alert";

const Alert = () => {
  <>
    <CSSTransition
      in={showMessage}
      nodeRef={nodeRef}
      timeout={300}
      classNames="alert"
      unmountOnExit
      onEnter={() => setShowButton(false)}
      onExited={() => setShowButton(true)}
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Alert
        ref={nodeRef}
        variant="primary"
        dismissible
        onClose={() => setShowMessage(false)}
      >
        <Alert.Heading>Animated alert message</Alert.Heading>
        <p>This alert message is being transitioned in and out of the DOM.</p>
        <Button variant="primary" onClick={() => setShowMessage(false)}>
          Close
        </Button>
      </Alert>
    </CSSTransition>
  </>;
};

export default Alert;
