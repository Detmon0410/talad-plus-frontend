import React, { useEffect } from "react";
import "../App.css";
import Appbar from "../componenet/AppbarMarket";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tabbar from "../componenet/Tabbar_Market";
import Button from "@mui/material/Button";
import { getSelectedMarket } from "./public_marketprofile-service";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function MProfile({ route }) {
  const { state } = useLocation();
  const userSelector = useSelector(selectUserReducer);
  const [marketDetail, setMarketDetail] = React.useState(state);

  useEffect(() => {
    console.log(marketDetail);
  }, [marketDetail]);
  useEffect(() => {
    console.log(state);
    // getSelectedMarket(userSelector).then((res) => {
    //   setMarketDetail([...res]);
    //   console.log(res);
    // });
  }, []);

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <p></p>
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "20vh",
              width: "100%",
            }}
          />
          <p></p>
          <Typography
            variant="h1"
            component="h2"
            label={marketDetail.name}
            style={{ fontSize: "2rem" }}
          >
            {marketDetail.name}
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            label={marketDetail.province}
            style={{ fontSize: "1.2rem" }}
          >
            {marketDetail.province} ,{marketDetail.district}
          </Typography>

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
            defaultValue="Infomation About Market"
            sx={{ width: "100%" }}
            disabled
          />
          <Tabbar></Tabbar>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default MProfile;
