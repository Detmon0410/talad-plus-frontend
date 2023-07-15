import React, { useEffect } from "react";
import Appbar from "../componenet/AppbarUser";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tabbar from "../componenet/Tabbar_User";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { postMyProfile } from "./u_profile-service";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";

function Registor() {
  const userSelector = useSelector(selectUserReducer);
  const [userDetail, setUserDetail] = React.useState({});
  useEffect(() => {}, [userDetail]);
  useEffect(() => {
    postMyProfile(userSelector).then((res) => {
      setUserDetail(res);
      console.log(userDetail);
    });
  }, []);

  return (
    <div className="App">
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
          <img
            style={{
              width: 90,
              height: 90,
            }}
            src={`data:image/jpeg;base64,${userDetail.img}`}
          />
        </Avatar>
      </Box>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <p></p>
          <Typography
            variant="h1"
            component="h2"
            label={userDetail.name}
            style={{ fontSize: "2rem" }}
          >
            {userDetail.name}
          </Typography>
          <p>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend"></Typography>
              <Rating name="no-value" value={userDetail.totalStars} readOnly />
            </Box>
          </p>

          <Tabbar
            marketdetail={userDetail}
            setUserDetail={setUserDetail}
          ></Tabbar>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Registor;
