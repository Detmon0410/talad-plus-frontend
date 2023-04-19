import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./TableDate.css";
import DateField from "./DateField";
import ZoneSelector from "./ZoneSelector";
import Button from "@mui/material/Button";
import { getSubStall } from "../m_booking/m_booking-service";
import { postEditstatus } from "../m_control/m_control-service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
export default function DataTable(props) {
  const { stallall, market } = props;
  const columns = [
    { field: "Number", headerName: "Number", width: 100 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Payment", headerName: "Payment", width: 130 },
    {
      field: "Status",
      headerName: "Status",
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

  const handleDateChange = (date) => {
    setPickDate(date);
  };
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

  const sentAPI = async () => {
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));

    const payloadstatus = selectedRows;
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
            backgroundColor: "#33cc33",
            fontSize: "18px",
          }}
          onClick={sentAPI}
        >
          ยืนยันการจอง
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#cc3833",
            fontSize: "18px",
          }}
        >
          ยกเลิกการจอง
        </Button>
      </div>
    </div>
  );
}
