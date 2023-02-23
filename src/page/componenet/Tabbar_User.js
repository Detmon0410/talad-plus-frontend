import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImgList from "./ImageList";
import ReviewCard from "./CardReview_User";
import RecentCard from "./CardRecentMarket";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
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
          <Tab label="รูปภาพสินค้า" {...a11yProps(0)} />
          <Tab label="รีวิวจากเจ้าของตลาด" {...a11yProps(1)} />
          <Tab label="ตลาดที่เช่าล่าสุด" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        รูปภาพสินค้า
        <ImgList></ImgList>
      </TabPanel>
      <TabPanel value={value} index={1}>
        รีวิวจากผู้เช่า
        <ReviewCard
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></ReviewCard>
      </TabPanel>
      <TabPanel value={value} index={2}>
        ตลาดที่เช่าล่าสุด
        <RecentCard></RecentCard>
      </TabPanel>
    </Box>
  );
}
