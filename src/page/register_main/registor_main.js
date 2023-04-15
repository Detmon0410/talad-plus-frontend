import React from "react";
import Alert from "../componenet/Alert/Alert1997";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RoleSelect from "../componenet/Selector_role";
import { postRegister } from "./register-service";
import { isEmail } from "validator";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "../App.css";
function Login() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = React.useState("");
  const [nameInput, setNameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [role, setRole] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const items = [
    { value: "Merchant", name: "Merchant" },
    { value: "Market", name: "Market" },
  ];

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmailInput(newEmail);
    setIsValidEmail(isEmail(newEmail));
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setConfirmPasswordInput(password);
    console.log(passwordInput, password);
    setIsValidPassword(passwordInput === password);
  };
  const sentAPI = async () => {
    if (
      !nameInput ||
      !usernameInput ||
      !passwordInput ||
      !emailInput ||
      !role ||
      isValidEmail == false ||
      isValidPassword == false
    ) {
      setMessage("Fill is empty or Fill is Incorrect.");
      setShowMessage(true);
    } else {
      const payload = {
        name: nameInput,
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        role: role,
      };
      const res = await postRegister(payload);
      if (role == "Market") {
        navigate("/marketregistor");
      } else {
        navigate("/merchantregistor");
      }

      console.log(res);
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
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "40ch" },
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
              id="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              label="Name"
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
          <p>
            <TextField
              value={confirmPasswordInput}
              onChange={handlePasswordChange}
              id="confirmpassword"
              label="Confirm Password"
              variant="filled"
              error={!isValidPassword}
              helperText={!isValidPassword && "Password doesn't match"}
            />
          </p>
          <p>
            <TextField
              id="email"
              label="Email"
              variant="filled"
              value={emailInput}
              onChange={handleEmailChange}
              error={!isValidEmail}
              helperText={!isValidEmail && "Please enter a valid email address"}
            />
          </p>
        </Box>
        <p>
          <RoleSelect items={items} role={role} setRole={setRole} n={"Role"} />
        </p>
        <p>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
            }}
            onClick={sentAPI}
          >
            Next
          </Button>
        </p>
      </header>
    </div>
  );
}

export default Login;
