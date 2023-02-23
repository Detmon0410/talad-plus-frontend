import React from "react";
import "./App.css";
import Appbar from "./componenet/AppbarUser";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tabbar from "./componenet/Tabbar_User";

import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

function Registor() {
  return (
    <div className="App">
      <Appbar></Appbar>
      <p></p>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <p></p>
        <Avatar
          sx={{
            bgcolor: deepPurple[500],
            width: 90,
            height: 90,
            fontSize: "32px",
          }}
        >
          JB
        </Avatar>
      </Box>

      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <h1 className="App-header-page">Josh Bush</h1>
          <p>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend"></Typography>
              <Rating name="no-value" value={null} />
            </Box>
          </p>
          <TextField
            id="outlined-multiline-static"
            label="About"
            multiline
            rows={4}
            defaultValue="Infomation About Me"
            sx={{ width: "100%" }}
            disabled
          />
          <Tabbar></Tabbar>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Registor;
