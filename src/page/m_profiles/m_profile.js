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
import { postMyMarket } from "./m_profile-service";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";

function MProfile() {
  const userSelector = useSelector(selectUserReducer);
  const [marketDetail, setMarketDetail] = React.useState([]);

  useEffect(() => {
    console.log(marketDetail);
  }, [marketDetail]);
  useEffect(() => {
    postMyMarket(userSelector).then((res) => {
      setMarketDetail([...res]);
      console.log(res);
    });
  }, []);

  return (
    <div className="App">
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <p></p>
          {marketDetail.map((pic) => (
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
              src={`data:image/jpeg;base64,${pic.img}`}
            />
          ))}
          <p></p>
          {marketDetail.map((mname) => (
            <Typography
              variant="h1"
              component="h2"
              label={mname.name}
              style={{ fontSize: "2rem" }}
            >
              {mname.name}
            </Typography>
          ))}
          {marketDetail.map((where) => (
            <Typography
              variant="h3"
              component="h3"
              label={where.province}
              style={{ fontSize: "1.2rem" }}
            >
              {where.province} ,{where.district}
            </Typography>
          ))}

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
