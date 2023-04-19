import React, { useEffect, useState } from "react";
import "../App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { selectUserReducer } from "../../redux/user/selector";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getStallAll, getSubStall, postRentStall } from "./m_booking-service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function MProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userSelector = useSelector(selectUserReducer);
  const [marketDetail, setMarketDetail] = React.useState(state);
  const [zone, setZone] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [payment, setPayment] = React.useState("");
  const [start, setStart] = React.useState(null);
  const [zoneSet, setZoneSet] = React.useState({});
  const [zoneSetImg, setZoneSetImg] = React.useState(null);
  const [subStallSet, setSubStallSet] = React.useState({});
  const [selectedZone, setSelectedZone] = React.useState({});
  const [subStall, setSubStall] = React.useState({});
  const [availableNumber, SetAvailableNumber] = React.useState([]);
  const [isDateDisabled, setIsDateDisabled] = React.useState(true);
  const [isNumberDisabled, setIsNumberDisabled] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const AlertA = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChangeZone = (event) => {
    setZoneSetImg(event.target.value.img);
    setSelectedZone(event.target.value);
    setIsDateDisabled(false);
  };
  const handleChangeNumber = (event) => {
    setNumber(event.target.value);
  };
  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  const mappingZoneNew = (rentedSubStall) => {
    console.log("selectedZone", selectedZone);
    console.log("rentedSubStall", rentedSubStall);
    let subStallForRent = [];
    for (let i = selectedZone.startNum; i <= selectedZone.endNum; i++) {
      subStallForRent.push(i);
    }
    for (const rentedSubStallData of rentedSubStall) {
      const index = subStallForRent.indexOf(rentedSubStallData.number);
      if (index > -1) {
        subStallForRent.splice(index, 1);
      }
    }
    SetAvailableNumber(subStallForRent);
    setIsNumberDisabled(false);
  };

  const sendApiRent = () => {
    const marketId = marketDetail.market._id;
    if (!number || !start || !payment) {
      setMessage("Fill is Empty");
      setOpen(true);
    } else {
      const payload = {
        zoneId: selectedZone._id,
        number: number,
        date: start,
        payment: payment,
      };
      postRentStall(payload, marketId).then((res) => {
        if (res.status === 200) {
          // nav to สรุป
        } else {
          console.log(res.response.data.message);
          setMessage(res.response.data.message);

          setOpen(true);
        }
      });
    }
  };

  const mappingZone = (input) => {
    console.log(input);
    const substalls = {};
    input.forEach((item) => {
      // forEach ลูป substall หาสมาชิกจาก item ที่รับมาจากsubstall
      if (!substalls[selectedZone.zone]) {
        // { zone : [ 4,6 เลขที่ถูกจอง]}
        substalls[selectedZone.zone] = [];
      }
      substalls[selectedZone.zone].push(item.number);
    });

    setSubStallSet(substalls);
    const stalls = {};
    const stallImgs = {};
    selectedZone.forEach((item) => {
      stalls[item.zone] = arrayRange(item.startNum, item.endNum, 1); //{ zone: [ 1,2,3,4,5... ทั้งหมด]}
      stallImgs[item.zone] = item.img; // { zone: img }
    });

    setZoneSetImg(stallImgs);
    setZoneSet(marketDetail.stall);
  };

  useEffect(() => {
    setZoneSet(marketDetail.stall);
    console.log(selectedZone);
    setSubStall();
  });
  useEffect(() => {
    if (start !== null && selectedZone !== null) {
      const marketId = marketDetail.market._id;
      const payload = {
        zoneId: selectedZone._id,
        date: start,
      };
      getSubStall(payload, marketId).then((res) => {
        mappingZoneNew(res);
      });
    }
  }, [selectedZone, start]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <AlertA onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {message}
          </AlertA>
        </Snackbar>
      </Stack>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <p></p>

          <p></p>
          <Typography
            variant="h1"
            component="h2"
            label={marketDetail.market.name}
            style={{ fontSize: "2rem" }}
          >
            {marketDetail.market.name}
          </Typography>

          <p>
            <Typography
              variant="h3"
              component="h3"
              label={marketDetail.market.province}
              style={{ fontSize: "1.2rem" }}
            >
              แผนผังพื้นที่เช่า
            </Typography>
          </p>
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
            <TransformWrapper defaultScale={1}>
              <TransformComponent>
                {zoneSetImg ? (
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
                    src={`data:image/jpeg;base64,${zoneSetImg}`}
                  />
                ) : (
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
                    src={`data:image/jpeg;base64,${marketDetail.market.img}`}
                  />
                )}
              </TransformComponent>
            </TransformWrapper>
          </Box>
          <p></p>
          <p>
            <Typography
              variant="h3"
              component="h3"
              label={marketDetail.province}
              style={{ fontSize: "1.2rem" }}
            >
              เลือกโซนที่ต้องการ
            </Typography>
            <p>
              <Box
                sx={{
                  minWidth: 220,
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Zone</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedZone}
                    label="Zone"
                    onChange={handleChangeZone}
                    required
                  >
                    {Object.keys(zoneSet).map((item) => (
                      <MenuItem value={zoneSet[item]}>
                        {zoneSet[item].zone}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <p></p>
              <p>
                <Typography
                  variant="h3"
                  component="h3"
                  label={marketDetail.province}
                  style={{ fontSize: "1.2rem" }}
                >
                  เลือกวันที่ที่ต้องการ
                </Typography>
              </p>
              <p>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  teAdapter={AdapterDayjs}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={1}>
                      <DatePicker
                        label="date"
                        renderInput={(params) => <TextField {...params} />}
                        value={start}
                        disabled={isDateDisabled}
                        required
                        onChange={async (newValue) => {
                          const selectedDate = new Date(newValue); // create a new Date object from newValue
                          console.log(selectedDate);
                          setStart(selectedDate);
                        }}
                      ></DatePicker>
                    </Stack>
                  </LocalizationProvider>
                </Box>
                <p>
                  <Typography
                    variant="h3"
                    component="h3"
                    label={marketDetail.province}
                    style={{ fontSize: "1.2rem" }}
                  >
                    เลือกเลขแผงที่ต้องการ
                  </Typography>
                </p>
                <Box
                  sx={{
                    minWidth: 220,
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Number
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={number}
                      label="Number"
                      onChange={handleChangeNumber}
                      disabled={isNumberDisabled}
                      required
                    >
                      {availableNumber.map((number) => (
                        <MenuItem value={number}>{number}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Typography
                  variant="h3"
                  component="h3"
                  label={marketDetail.province}
                  style={{ fontSize: "1.2rem" }}
                >
                  เลือกรูปแบบการชำระเงิน
                </Typography>
                <p></p>
                <Box
                  sx={{
                    minWidth: 220,
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Payment
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={payment}
                      label="Zone"
                      onChange={handleChangePayment}
                    >
                      <MenuItem value="cash">เงินสด</MenuItem>
                      <MenuItem value="visa">บัดร เดบิต/เครดิต</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <p></p>
              </p>
            </p>
          </p>

          <p></p>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#33cc33",
              fontSize: "18px",
            }}
            onClick={sendApiRent}
          >
            Submit
          </Button>

          <p></p>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default MProfile;
