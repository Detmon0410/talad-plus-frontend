import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Textfiled from "./componenet/Textfiled";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <img src="logo01.png" alt="logo" className="Picture" />
        <p>
          <Textfiled></Textfiled>
        </p>
        <p>
          <Button
            onClick={() => {
              navigate("/profile");
            }}
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
