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
import { postMyProfile } from "./u_profileMservice";
import { selectUserReducer } from "../../redux/user/selector";
import { getReported, getViewFavorite } from "./u_profileMservice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
function Registor() {
  const userSelector = useSelector(selectUserReducer);
  const { state, stateReport } = useLocation();
  const [userDetail, setUserDetail] = React.useState(state);
  const [reportlist, setReportList] = React.useState({});
  const [favlist, setFavList] = React.useState({});
  useEffect(() => {
    const uid = userDetail._id;
    getReported(uid).then((res) => {
      setReportList(res);
      console.log(reportlist);
    });
  }, [userDetail]);

  useEffect(() => {
    const uid = userDetail._id;
    getViewFavorite(uid).then((res) => {
      setFavList(res);
      console.log(favlist);
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
            width: 120, // Adjust the width to your desired size
            height: 120, // Adjust the height to your desired size
            fontSize: "40px", // Adjust the font size if needed
          }}
        >
          <img
            style={{
              width: 120, // Adjust the width to match the Avatar size
              height: 120, // Adjust the height to match the Avatar size
            }}
            src={`data:image/jpeg;base64,${userDetail.img}`}
          />
        </Avatar>
      </Box>
      <p></p>
      <Typography
        variant="h1"
        component="h2"
        label={userDetail.name}
        style={{ fontSize: "2rem" }}
      >
        {userDetail.name}
      </Typography>
      <Typography
        variant="h3"
        component="h3"
        label={userDetail.province}
        style={{ fontSize: "1.2rem" }}
      >
        {userDetail.province} ,{userDetail.district}
      </Typography>
      <p>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend"></Typography>
          <Rating
            size="large"
            name="no-value"
            value={userDetail.totalStars}
            readOnly
          />
        </Box>
      </p>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <p></p>

          <Tabbar
            marketdetail={userDetail}
            reportlist={reportlist}
            setReportList={setReportList}
          ></Tabbar>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Registor;
