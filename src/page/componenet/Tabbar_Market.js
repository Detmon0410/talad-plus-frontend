import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImgList from "./ImageList";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import ReviewCard from "../componenet/CardmarketReview";
import "./Tabbar_Market.css";
import { Button } from "@mui/material";
import { getReview } from "../public_market_profile/public_marketprofile-service";
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
        <Box sx={{ p: 3 }}>
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
  const reviews = [
    {
      name: "John Doe",
      date: "April 20, 2023",
      review: "This is a great product! I highly recommend it.",
    },
    {
      name: "Jane Smith",
      date: "April 19, 2023",
      review:
        "I was disappointed with this product. It did not meet my expectations.",
    },
  ];

  const handleChange = (event, newValue) => {
    getReview(marketdetail._id).then((res) => {
      setReviewList(res);
      console.log(ReviewList);
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
          <Tab label="รูปภาพตลาด" {...a11yProps(0)} />
          <Tab label="ริวิวจากผู้เช่า" {...a11yProps(1)} />
          <Tab label="โปรโมชั่น" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        รูปภาพตลาด
        <ImgList></ImgList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>รีวิวจากผู้เช่า</p>
        <div>
          {ReviewList.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.name}
              rating={review.star}
              review={review.description}
            />
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        โปรโมชั่น
      </TabPanel>
    </Box>
  );
}
