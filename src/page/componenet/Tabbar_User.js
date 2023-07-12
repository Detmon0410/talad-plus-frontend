import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ReviewCard from "../componenet/CardmarketReview";
import "./Tabbar_Market.css";
import { Button } from "@mui/material";
import { getReview } from "../public_market_profile/public_marketprofile-service";
import { getLikeMarket } from "../u_homepage/u_homepage-service";
import LikeCard from "./CardlayoutLiked";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const { marketdetail } = props;
  const [value, setValue] = React.useState(0);
  const [rating, setRating] = React.useState(2);
  const [ReviewList, setReviewList] = React.useState([]);
  const [onLoading, setOnLoading] = React.useState(false);
  const [liked, setLiked] = React.useState([]);

  const handleChange = (event, newValue) => {
    getReview(marketdetail._id).then((res) => {
      setReviewList(res);
      console.log(res);
    });
    getLikeMarket().then((res) => {
      setLiked(res);
      setOnLoading(true);
    });
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="รีวิวจากเจ้าของตลาด" {...a11yProps(0)} />
          <Tab label="ตลาดที่ถูกใจ" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        รีวิวจากเจ้าของตลาด
        {ReviewList.map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            rating={review.star}
            review={review.description}
          ></ReviewCard>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        ตลาดที่ถูกใจ
        {onLoading ? (
          liked.market.map((selectMarket) => {
            return (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <LikeCard market={selectMarket} setLiked={setLiked}></LikeCard>
              </p>
            );
          })
        ) : (
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </TabPanel>
    </Box>
  );
}
