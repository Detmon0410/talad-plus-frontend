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
import "../registor_owner/registor_owner.css";

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
    { value: "Merchant", name: "พ่อค้าแม่ค้า" },
    { value: "Market", name: "เจ้าของตลาด" },
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
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
        role: role,
      };
      const res = await postRegister(payload);
      if (res.status >= 403) {
        // Request failed, retry the request
        setMessage("username or email is duplicate");
        setShowMessage(true);
      } else {
        // Request succeeded, navigate to the appropriate page
        if (role == "Market") {
          navigate("/marketregistor");
        } else {
          navigate("/merchantregistor");
        }
        console.log(res);
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
        <img
          src="data:image/png;base64,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"
          alt="logo"
          className="Picture"
        />
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
              label="ชื่อบัญชีผู้ใช้งาน"
              variant="filled"
            />
          </p>
          <p>
            <TextField
              id="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              label="รหัสผ่าน"
              variant="filled"
              type="password"
              autoComplete="current-password"
            />
          </p>
          <p>
            <TextField
              value={confirmPasswordInput}
              onChange={handlePasswordChange}
              id="confirmpassword"
              label="ยืนยันรหัสผ่าน"
              variant="filled"
              error={!isValidPassword}
              helperText={!isValidPassword && "Password doesn't match"}
              type="password"
              autoComplete="current-password"
            />
          </p>
          <p>
            <TextField
              id="email"
              label="อีเมล"
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
        <div className="btn-container">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
            }}
            onClick={sentAPI}
          >
            ถัดไป
          </Button>
        </div>
      </header>
    </div>
  );
}

export default Login;
