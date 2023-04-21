import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./admin.css";
import { display, maxWidth } from "@mui/system";
import {
  getmyWallet,
  getMyHistory,
  patchWithdraw,
  getWithdrawList,
  patchApprove,
  patchReject,
} from "./admin_main-service";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "time", headerName: "Time", width: 150 },
  { field: "date", headerName: "Date", width: 150 },
  { field: "status", headerName: "status", width: 150 },
  { field: "banknum", headerName: "Bank Number", width: 150 },
];

const Page = () => {
  const [showTable, setShowTable] = React.useState(false);
  const [myWallet, setMyWallet] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    // Assuming your data is stored in a variable named "data"
    const newData = myWallet.map((item, index) => {
      return {
        id: item._id,
        name: item.name,
        amount: item.money,
        banknum: item.bank_number,
        time: item.time,
        date: item.date,
        status: item.status,
      };
    });
    setRows(newData);
  }, [myWallet]);
  const handleShowTableClick = async () => {
    const res = await getWithdrawList();
    setMyWallet(res);
    console.log(res);
    setShowTable(!showTable);
  };
  useEffect(() => {
    console.log(selectionModel);
  }, [selectionModel]);

  const sentAPI = async () => {
    const selectedRows = rows.filter((row) => selectionModel.includes(row.id));
    const payloadstatus = selectedRows.map((row) => ({
      id: row.id,
      status: "approved", // or "rejected" if you have a Reject button
    }));
    const withdraw = selectedRows[0]._id;

    const res = await patchApprove(withdraw, payloadstatus); // call the API with the withdrawal ID and status payload
    // handle the response as needed, e.g. show a success message or refresh the table
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleShowTableClick}
        style={{ marginTop: "10px" }}
      >
        {showTable ? "Close Table" : "Show Withdraw Transfer Table"}
      </Button>
      {showTable && (
        <div>
          <div style={{ height: 400, Width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              checkboxSelection
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel); // Handle default Data Grid selection
              }}
            />
          </div>
          <div className="button-container">
            <Button variant="contained" on onClick={sentAPI}>
              {" "}
              Approve
            </Button>
            <Button variant="contained" color="error">
              {" "}
              Reject
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
