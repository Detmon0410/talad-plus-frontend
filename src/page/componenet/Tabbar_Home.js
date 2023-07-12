import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "./Cardlayout";
import LikeCard from "./CardlayoutLiked";
import { Button } from "@mui/material";
import "./Tabbar_Home.css";
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from "react-thailand-address-typeahead";
import "../merchant_registor/registor.css";
import { getMyMarketNear } from "./Tabbar_Home-service";
import { getLikeMarket } from "../u_homepage/u_homepage-service";

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
  const { marketlist } = props;
  const [value, setValue] = React.useState(0);
  const [val, setVal] = React.useState(ThailandAddressValue.empty());
  const [sState, setsState] = React.useState(false);
  const [searchMarket, setSearchMarket] = React.useState([]);
  const [liked, setLiked] = React.useState({});

  const handleChange = async (event, newValue) => {
    const res = await getLikeMarket();
    setLiked(res);
    setOnLoading(true);
    // console.log(res);
    setValue(newValue);
  };
  useEffect(() => {
    console.log(liked);
  }, [liked]);
  const sentAPI = async () => {
    if (!val.province || !val.district) {
      // Handle the case when province or district values are missing
      console.log("Province or district values are missing.");
    } else {
      const province = val.province;
      const district = val.district;
      try {
        const res = await getMyMarketNear(district, province);
        setSearchMarket(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const [onLoading, setOnLoading] = React.useState(false);

  return (
    <React.Fragment>
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
            <Tab label="ตลาดแนะนำ" {...a11yProps(0)} />
            <Tab label="ตลาดใกล้ฉัน" {...a11yProps(1)} />
            <Tab label="ตลาดที่ถูกใจ" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          ตลาดแนะนำ
          {marketlist.map((market) => {
            return (
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card market={market}></Card>
              </p>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          ค้นหาตลาดในพื้นที่
          <p>
            <div className="address-container">
              <ThailandAddressTypeahead
                value={val}
                onValueChange={(val) => setVal(val)}
              >
                <ThailandAddressTypeahead.DistrictInput
                  style={{
                    borderRadius: 5,
                    fontSize: "1rem",
                    width: "272px",
                    height: "23px",
                    padding: "8.5px 14px",
                    border: "1px solid rgb(192, 192, 192)",
                  }}
                  placeholder="District"
                />
                <ThailandAddressTypeahead.ProvinceInput
                  style={{
                    borderRadius: 5,
                    fontSize: "1rem",
                    width: "272px",
                    height: "23px",
                    padding: "8.5px 14px",
                    border: "1px solid rgb(192, 192, 192)",
                  }}
                  placeholder="Province"
                />

                <ThailandAddressTypeahead.Suggestion
                  containerProps={{
                    style: { border: "1px solid black" },
                  }}
                  optionItemProps={{
                    style: { fontSize: 16, cursor: "pointer" },
                  }}
                />
              </ThailandAddressTypeahead>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#33cc33",
                  fontSize: "18px",
                }}
                onClick={sentAPI}
              >
                ค้นหา
              </Button>
            </div>
            <div>
              {searchMarket.length === 0 ? (
                <p style={{ textAlign: "center" }}>Location not found.</p>
              ) : (
                searchMarket.map((market) => (
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    key={market.id} // Make sure to include a unique key for each element in the array
                  >
                    <Card market={market}></Card>
                  </p>
                ))
              )}
            </div>
          </p>
        </TabPanel>
        <TabPanel value={value} index={2}>
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
                  <LikeCard
                    market={selectMarket}
                    setLiked={setLiked}
                  ></LikeCard>
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
    </React.Fragment>
  );
}
