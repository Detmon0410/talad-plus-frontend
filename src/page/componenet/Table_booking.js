import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./TableDate.css";
import DateField from "./DateField";
import ZoneSelector from "./ZoneSelector";
import Button from "@mui/material/Button";
import { getSubStall } from "../m_booking/m_booking-service";
import { postEditstatus, postReject } from "../m_control/m_control-service";
import { getMerchant } from "../u_profilesM/u_profileMservice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { postReport } from "../m_control/m_control-service";
export default function DataTable(props) {
  const { stallall, market } = props;
  const columns = [
    { field: "Number", headerName: "Number", width: 100 },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },

    { field: "Name", headerName: "Name", width: 130 },
    { field: "Payment", headerName: "Payment", width: 130 },
    {
      field: "Start",
      headerName: "Start",
      width: 150,
    },
    {
      field: "End",
      headerName: "End",
      width: 150,
    },
  ];
  const [selectionModel, setSelectionModel] = useState([]);
  const [pickdate, setPickDate] = useState(null);
  const [availableNumber, SetAvailableNumber] = React.useState([]);
  const [selectedZone, setSelectedZone] = React.useState("");
  const [pickZone, setPickZone] = React.useState({});
  const [isNumberDisabled, setIsNumberDisabled] = React.useState(true);
  const [isDateDisabled, setIsDateDisabled] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const AlertA = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [message, setMessage] = React.useState("");
  const [rating, setRating] = React.useState(2);
  const [reviewValue, setReviewValue] = React.useState("");

  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setPickDate(date);
  };
  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleZoneChange = (zone) => {
    setSelectedZone(pickZone);
    setIsDateDisabled(false);
  };
  const sendApiC = async () => {
    // const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    // const payloadstatus = selectedRows[0].user;
    //console.log(typeof selectedRows[0].User);
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    const refid = selectedRows[0].User;
    const res = await getMerchant(refid);
    navigate("/ProfileView", {
      state: res,
      uid: res._id,
    });
    console.log(res);
  };
  const sendApiReport = async () => {
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    const payloadstatus = selectedRows[0].User;
    console.log(typeof selectedRows[0].User);
    const payload = {
      merchant: selectedRows[0].User,
      description: reviewValue,
      rating: rating,
    };
    const res = await postReport(payload);
    console.log(payloadstatus);
  };
  const sentAPID = async () => {
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    const payloadstatus = selectedRows;
    const marketId = payloadstatus[0].id;
    const datepick = new Date(pickdate);
    const payload = {
      zoneId: pickZone._id,
      date: datepick,
    };
    console.log(payloadstatus[0].id);
    postReject(marketId, payloadstatus);
    getSubStall(payload, marketId).then((res) => {
      SetAvailableNumber(res);
      console.log(res);
    });
  };

  const sentAPI = async () => {
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    const payloadstatus = selectedRows;
    if (payloadstatus.length !== 0) {
      const marketId = market._id;
      const datepick = new Date(pickdate);
      const payload = {
        zoneId: pickZone._id,
        date: datepick,
      };
      console.log(payloadstatus);
      postEditstatus(marketId, payloadstatus);
      getSubStall(payload, marketId).then((res) => {
        SetAvailableNumber(res);
        console.log(res);
      });
    }
  };

  useEffect(() => {
    if (pickdate !== null && pickZone !== {}) {
      const marketId = market._id;
      const datepick = new Date(pickdate);
      const payload = {
        zoneId: pickZone._id,
        date: datepick,
      };
      getSubStall(payload, marketId).then((res) => {
        SetAvailableNumber(res);
        console.log(res);
      });
    }
  }, [pickZone, pickdate]);

  useEffect(() => {
    // Assuming your data is stored in a variable named "data"
    const newData = availableNumber.map((item, index) => {
      return {
        id: item._id,
        Number: item.number,
        Name: item.merchant, // Replace this with the appropriate field for the stall name
        Status: item.status,
        Payment: item.payment,
        User: item.user,
        Start: item.dateStart,
        End: item.dateEnd,
      };
    });
    setRows(newData);
  }, [availableNumber]);

  return (
    <div className="table-container">
      <div className="row">
        <ZoneSelector
          pickZone={pickZone}
          zonein={stallall}
          setDisable={setIsDateDisabled}
          setPickZone={setPickZone}
          onChange={handleZoneChange}
        />
        <DateField
          value={pickZone}
          isdisable={isDateDisabled}
          locale="en"
          onChange={handleDateChange}
        />
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel); // Handle default Data Grid selection
          }}
        />
      </div>

      <div className="btn-container">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#225dff ",
            fontSize: "16px",
          }}
          onClick={sendApiC}
        >
          ตรวจสอบผู้เช่า
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#33cc33",
            fontSize: "16px",
          }}
          onClick={sentAPI}
        >
          ยืนยันการจอง
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#cc3833",
            fontSize: "16px",
          }}
          onClick={sentAPID}
        >
          ยกเลิกการจอง
        </Button>
      </div>

      <div
        className="reviewbox-container"
        style={{ display: "flex", alignItems: "center" }}
      >
        {" "}
        <TextField
          id="review"
          label="รายงานผู้เช่า"
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
        <div classname="starbutton">
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              console.log(newValue);
              setRating(newValue);
            }}
          />

          <Button
            variant="contained"
            style={{
              fontSize: 14,
              height: "45px",
              width: "90px",
              marginLeft: "20px",
            }}
            color="warning"
            onClick={sendApiReport}
          >
            รายงาน
          </Button>
        </div>
      </div>
    </div>
  );
}
