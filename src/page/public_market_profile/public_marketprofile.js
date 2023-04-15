import React, { useEffect } from "react";
import "../App.css";

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
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { getStallAll } from "../m_booking/m_booking-service";

function MProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userSelector = useSelector(selectUserReducer);
  const [marketDetail, setMarketDetail] = React.useState(state);
  const [date, setDate] = React.useState(new Date());

  const handleClick = async () => {
    const marketId = marketDetail._id;

    const res = await getStallAll(marketId);
    navigate("/bookingstall", {
      state: res,
    });
    console.log("this is " + res);
  };

  useEffect(() => {
    console.log("this is" + marketDetail._id);
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
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              height: "80%",
              maxHeight: 360,
              maxWidth: 820,
              bgcolor: blue,
            }}
          >
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                height: "80%",
                maxHeight: 360,
                maxWidth: 820,
              }}
              src={`data:image/jpeg;base64,${marketDetail.img}`}
            />
          </Box>
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
          <p></p>
          <Box>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#33cc33",
                fontSize: "18px",
              }}
              onClick={handleClick}
            >
              จองพื้นที่ขายของ
            </Button>
          </Box>
          <p></p>
          <Tabbar></Tabbar>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default MProfile;
