import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Upload from "../componenet/ImageUp_MarketR";
import TextField from "@mui/material/TextField";
import TableWaiting from "../componenet/Table_booking";
import React, { useEffect } from "react";
import { postCreateStall } from "./m_control-service";

import { postMyMarket } from "../m_profiles/m_profile-service";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";
import Alert from "../componenet/Alert/Alert1997";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import TypeSelect from "../componenet/Selector_role";
import {
  getStallAll,
  getSubStall,
  postRentStall,
} from "../m_booking/m_booking-service";
import { useLocation } from "react-router-dom";
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
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);

  const [value, setValue] = React.useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [stallmarket, setStallMarket] = React.useState(state);
  const userSelector = useSelector(selectUserReducer);
  const allstall = stallmarket.stall;
  const market = stallmarket.market;
  const [marketDetail, setMarketDetail] = React.useState([]);
  const [createStall, setCreateStall] = React.useState([]);
  const [aboutMarket, setAboutMarket] = React.useState("");
  const [zoneInput, setZoneInput] = React.useState("");
  const [startInput, setStartInput] = React.useState("");
  const [endInput, setEndInput] = React.useState("");
  const [priceInput, setPricewordInput] = React.useState("");
  const marketId = marketDetail.map((mname) => mname._id);
  const [image, setImage] = React.useState(new FormData());
  const [date, setDate] = React.useState({
    opendate: [],
  });
  const [markettype, setMarketType] = React.useState();
  const [dateSelect, setDateSelect] = React.useState(null);
  const items = [
    { value: "Month", name: "รายเดือน" },
    { value: "Day", name: "รายวัน" },
  ];
  ///////////////////////////// TAB 1 ///////////////////////////////////////////////////
  useEffect(() => {
    console.log(date);
  }, [date]);

  const handleChangeTab = async (e, newValue) => {
    const res = await getStallAll(marketId);
    setStallMarket(res);
    setValue(newValue);
  };

  const handleChangeBox = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { opendate } = date;

    // Case 1 : The user checks the box
    if (checked) {
      setDate({
        opendate: [...opendate, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setDate({
        opendate: opendate.filter((e) => e !== value),
      });
    }
  };

  useEffect(() => {}, [marketDetail], [createStall]);

  useEffect(() => {
    postMyMarket(userSelector).then((res) => {
      setMarketDetail([...res]);
      console.log(market);
    });
  }, []);
  useEffect(() => {
    postCreateStall(userSelector).then((res) => {
      setCreateStall([...res]);
      console.log(res);
    });
  }, []);
  const sentAPI1 = async () => {
    if (
      !marketDetail ||
      !createStall ||
      !zoneInput ||
      !startInput ||
      !endInput ||
      !priceInput ||
      !date
    ) {
      setMessage("Fill is empty ");

      setShowMessage(true);
    } else {
      const payload = new FormData();
      payload.append("zone", zoneInput);
      payload.append("startNum", startInput);
      payload.append("endNum", endInput);
      payload.append("price", priceInput);
      payload.append("about", aboutMarket);
      payload.append("dayOpen", date.opendate);
      payload.append("mtype", markettype);
      payload.append("img", image, image.name);
      const res = await postCreateStall(marketId, payload);
      const pullstall = await getStallAll(marketId);
      navigate("/MControl", {
        state: pullstall,
      });
      console.log(payload);
      console.log(res);
      console.log(pullstall);
    }
  };

  /////////////////////////////////// Tab 2////////////////////////////////////////////////

  return (
    <Box sx={{ width: "100%" }}>
      <p></p>
      <Alert
        message={message}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
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
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="กำหนดพื้นที่เช่า" {...a11yProps(0)} />
          <Tab label="จัดการตลาด" {...a11yProps(1)} />
          <Tab label="การแจ้งเตือน" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        อัพโหลดแผนผังตลาด
        <Upload
          setFormData={(e) => {
            setImage(e);
          }}
        >
          {" "}
        </Upload>
        <p></p>
        กำหนดวันของตลาด
        <Box display="flex" justifyContent="center" alignItems="center">
          <p>
            <FormControl component="fieldset">
              <FormLabel component="legend">เลือกวันที่ตลาดเปิด</FormLabel>
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="Sun"
                  control={<Checkbox />}
                  label="Sun"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
                <FormControlLabel
                  value="Mon"
                  control={<Checkbox />}
                  label="Mon"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
                <FormControlLabel
                  value="Tue"
                  control={<Checkbox />}
                  label="Tue"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
                <FormControlLabel
                  value="Wed"
                  control={<Checkbox />}
                  label="Wed"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
                <FormControlLabel
                  value="Thu"
                  control={<Checkbox />}
                  label="Thu"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
                <FormControlLabel
                  value="Fri"
                  control={<Checkbox />}
                  label="Fri"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
                <FormControlLabel
                  value="Sat"
                  control={<Checkbox />}
                  label="Sat"
                  labelPlacement="top"
                  onChange={handleChangeBox}
                />
              </FormGroup>
            </FormControl>
          </p>
        </Box>
        <p>กำหนด โซน/เริ่มต้น/สิ้นสุด/ราคาค่าเช่า</p>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "10ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {" "}
            <TextField
              required
              id="zone"
              label="โซน"
              variant="outlined"
              size="small"
              value={zoneInput}
              onChange={(e) => setZoneInput(e.target.value)}
            />
            <TextField
              type="number"
              required
              id="start"
              label="เริ่มต้น"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
            />
            <TextField
              type="number"
              required
              id="end"
              label="สิ้นสุด"
              variant="outlined"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={endInput}
              onChange={(e) => setEndInput(e.target.value)}
            />
            <TextField
              required
              type="number"
              id="price"
              label="ราคาแผง"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">฿</InputAdornment>
                ),
              }}
              value={priceInput}
              onChange={(e) => setPricewordInput(e.target.value)}
            />
          </Box>
          <p></p>
        </Box>
        <p>กำหนดรูปแบบการเช่า</p>
        <Box display="flex" justifyContent="center" alignItems="center">
          <p>
            {" "}
            <TypeSelect
              items={items}
              role={markettype}
              setRole={setMarketType}
              n={"Market Type"}
            />
          </p>
        </Box>
        <p>ใส่รายละเอียดเกี่ยวกับสัญญา</p>
        <TextField
          id="outlined-multiline-static"
          label="About"
          value={aboutMarket}
          multiline
          rows={6}
          onChange={(e) => setAboutMarket(e.target.value)}
          sx={{ width: "80%" }}
        />
        <p>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
              md: 2,
            }}
            onClick={sentAPI1}
          >
            เพยแพร่
          </Button>
        </p>
        <Alert
          message={message}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography
          variant="h1"
          component="h2"
          label="BookingList"
          style={{ fontSize: "2rem" }}
        >
          รายการที่เปิดเช่า
        </Typography>
        <p></p>
        <Box> </Box>
        <Box>
          <TableWaiting stallall={allstall} market={market}></TableWaiting>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        โปรโมชั่น
      </TabPanel>
    </Box>
  );
}
