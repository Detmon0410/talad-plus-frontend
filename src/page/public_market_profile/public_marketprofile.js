import React, { useEffect } from "react";
import "../App.css";
import "../componenet/Tabbar_Market.css";
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
import { postCreateReview } from "./public_marketprofile-service";
import { getReview } from "./public_marketprofile-service";

function MProfile() {
  const navigate = useNavigate();
  const { state, statereview } = useLocation();
  const userSelector = useSelector(selectUserReducer);
  const [marketDetail, setMarketDetail] = React.useState(state);
  const [reviewList, setReviewList] = React.useState(statereview);
  const [date, setDate] = React.useState(new Date());
  const [rating, setRating] = React.useState(2);
  const [reviewValue, setReviewValue] = React.useState("");

  const handleClick = async () => {
    const marketId = marketDetail._id;
    const res = await getStallAll(marketId);
    navigate("/bookingstall", {
      state: res,
    });
    console.log("this is " + res);
  };

  const sendApiReview = async () => {
    const marketId = marketDetail._id;
    const payload = {
      market: marketId,
      description: reviewValue,
      rating: rating,
    };

    const res = await postCreateReview(payload);

    console.log("this is " + reviewList);
  };

  useEffect(() => {
    console.log("this is" + reviewList);
  }, [marketDetail]);
  useEffect(() => {
    console.log(state);
    console.log(statereview);
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
              <Typography component="legend">คะแนนตลาด</Typography>
              <Rating
                size="large"
                name="no-value"
                value={marketDetail.totalStars}
                readOnly
              />
            </Box>
          </p>

          <Typography
            variant="body1"
            component="div"
            sx={{
              color: "black", // Set text color to black
              border: "1px solid white", // Add border with white color
              padding: "8px",
              borderRadius: "4px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add drop shadow effect
            }}
          >
            {marketDetail.detail}
          </Typography>
          <p></p>
          {userSelector.role !== "Market" ? (
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
                <p></p>
              </Button>
            </Box>
          ) : (
            <Box></Box>
          )}
          <p></p>
          <div
            className="reviewbox-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            {" "}
            {userSelector.role !== "Market" ? (
              <TextField
                id="review"
                label="แสดงความคิดเห็น"
                variant="outlined"
                multiline
                maxRows={4}
                style={{
                  fontSize: 14,
                  width: "300px",
                  marginLeft: "20px",
                }}
                value={reviewValue}
                onChange={(event) => setReviewValue(event.target.value)}
              />
            ) : (
              <Box></Box>
            )}
            <div classname="starbutton">
              {userSelector.role !== "Market" ? (
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setRating(newValue);
                  }}
                />
              ) : (
                <Box></Box>
              )}
              {userSelector.role !== "Market" ? (
                <Button
                  variant="contained"
                  style={{
                    fontSize: 14,
                    height: "45px",
                    width: "90px",
                    marginLeft: "20px",
                  }}
                  onClick={sendApiReview}
                >
                  เขียนรีวิว
                </Button>
              ) : (
                <Box></Box>
              )}
            </div>
          </div>
          <p></p>
          <Tabbar marketdetail={marketDetail}></Tabbar>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default MProfile;
