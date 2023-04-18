import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./TableDate.css";
import DateField from "./DateField";
import ZoneSelector from "./ZoneSelector";
import {
  getStallAll,
  getSubStall,
  postRentStall,
} from "../m_booking/m_booking-service";

export default function DataTable(props) {
  const { stallall, market } = props;
  const columns = [
    { field: "id", headerName: "Number", width: 100 },
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Payment", headerName: "Payment", width: 130 },
    {
      field: "Status",
      headerName: "Status",
      width: 90,
    },
  ];

  const rows = [
    { id: 1, Name: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const [pickdate, setPickDate] = useState(null);
  const [availableNumber, SetAvailableNumber] = React.useState([]);
  const [selectedZone, setSelectedZone] = React.useState("");
  const [pickZone, setPickZone] = React.useState({});
  const [isNumberDisabled, setIsNumberDisabled] = React.useState(true);
  const handleDateChange = (date) => {
    setPickDate(date);
    console.log(pickdate);
    console.log(pickZone);
  };
  const handleZoneChange = (zone) => {
    setSelectedZone(zone);
  };
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
  useEffect(() => {
    if (pickdate !== null && pickZone !== {}) {
      const marketId = market._id;
      const datepick = new Date(pickdate);
      const payload = {
        zoneId: pickZone._id,
        date: datepick,
      };
      getSubStall(payload, marketId).then((res) => {
        mappingZoneNew(res);
        console.log(res);
      });
    }
  }, [pickZone, pickdate]);
  return (
    <div>
      <p>
        <div className="row">
          <DateField value={pickZone} locale="en" onChange={handleDateChange} />
          <ZoneSelector
            pickZone={pickZone}
            zonein={stallall}
            setPickZone={setPickZone}
            onChange={handleZoneChange}
          />
        </div>
      </p>
      <div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
