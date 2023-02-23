import * as React from "react";
import "./main.css";
import { CSSTransition } from "react-transition-group";
import ErrorIcon from "@mui/icons-material/Error";
const Alert = (props) => {
  const { message, showMessage, setShowMessage } = props;
  const nodeRef = React.useRef(null);
  return (
    <>
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => {
          setTimeout(function () {
            setShowMessage(false);
          }, 3000);
        }}
        // onExited={() => setShowButton(true)}
      >
        <div className="alert-container" ref={nodeRef}>
          <ErrorIcon />
          {message}
        </div>
      </CSSTransition>
    </>
  );
};

export default Alert;
