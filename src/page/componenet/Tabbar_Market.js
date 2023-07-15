import React, { useEffect, useState } from "react";
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
import ImgUpload from "./ImgMarketUploader";
import { getMyImgList } from "../m_profiles/m_profile-service";
import { useSelector } from "react-redux";
import { selectUserReducer } from "../../redux/user/selector";
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
  const [pictureList, setPictureList] = React.useState([]);
  const userSelector = useSelector(selectUserReducer);
  const [ownerref, setOwnerRef] = useState([]);
  const [marketref, setMarketRef] = useState([]);

  const handleChange = (event, newValue) => {
    getReview(marketdetail._id).then((res) => {
      setReviewList(res);
    });
    setValue(newValue);
  };
  useEffect(() => {
    getMyImgList(marketdetail._id).then((res) => setPictureList(res.image));
    setOwnerRef(userSelector.oid);
    setMarketRef(marketdetail.owner);
  }, []);

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
        {ownerref == marketref ? (
          <ImgUpload
            marketdetail={marketdetail}
            setPictureList={setPictureList}
          />
        ) : (
          <div></div>
        )}
        <ImgList pictureList={pictureList}></ImgList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>รีวิวจากผู้เช่า</p>
        <div>
          {ReviewList.map((review, index) => (
            <ReviewCard
              key={index}
              name={review.profile.name}
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
