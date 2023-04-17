import React from "react";
import "../App.css";
import Alert from "../componenet/Alert/Alert1997";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { postLogin } from "./login-service";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const sentAPI = async () => {
    if (!usernameInput || !passwordInput) {
      setMessage("Filled is empty");
      setShowMessage(true);
    } else {
      const payload = {
        username: usernameInput,
        password: passwordInput,
      };
      try {
        const res = await postLogin(payload);
        console.log(res);
        dispatch(updateUser(res));
        navigate("/home");
      } catch (error) {
        setMessage(error.response.data.message);
        setShowMessage(true);
      }
    }
  };
  return (
    <div className="App">
      <Alert
        message={message}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <header className="App-header">
        <img src="logo01.png" alt="logo" className="Picture" />
        <p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <p>
              <TextField
                id="username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                label="Username"
                variant="filled"
              />
            </p>
            <p>
              <TextField
                id="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                label="Password"
                variant="filled"
              />
            </p>
          </Box>
        </p>
        <p>
          <Button
            onClick={sentAPI}
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
            }}
          >
            {" "}
            login{" "}
          </Button>
        </p>
        <Button
          onClick={() => {
            navigate("/registor");
          }}
        >
          Create Account
        </Button>
        <a
          className="App-link"
          href="https://tenor.com/uQST.gif"
          target="_blank"
          rel="noopener noreferrer"
        >
          Forget Username or Password
        </a>
        ;
      </header>
    </div>
  );
}

export default Login;
