import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./WalletPage.css";
import {
  getmyWallet,
  getMyHistory,
  patchWithdraw,
} from "./wallet-market-service";
import { useLocation } from "react-router-dom";
function WalletPage() {
  const { state } = useLocation();
  const [WalletDetail, setWalletDetail] = React.useState(state);
  const [walletName, setWalletName] = useState("My Wallet");
  const [History, setHistory] = React.useState([]);
  const [historylist, setHistorylist] = React.useState([]);
  const [money, setMoney] = useState(1000);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const handleWithdrawMoney = () => {
    patchWithdraw();
    getmyWallet().then((res) => {
      setWalletDetail(res);
    });

    getMyHistory().then((res) => {
      setHistory(res);
    });

    setMoney(money - 100);
  };

  const columns = [
    { field: "id", headerName: "Order", width: 40 },
    {
      field: "amount",
      headerName: "Amount",
      width: 80,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
    },
  ];

  useEffect(() => {
    // Assuming your data is stored in a variable named "data"
    const newData = History.map((item, index) => {
      return {
        id: index + 1,
        amount: item.money,
        status: item.status, // Replace this with the appropriate field for the stall name
        date: item.date,
        time: item.time,
      };
    });
    console.log(newData);
    setRows(newData);
  }, [History]);

  const handleViewHistory = () => {
    getMyHistory().then((res) => {
      setHistory(res);
      console.log(res);
    });
    setHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryOpen(false);
  };

  return (
    <div className="container">
      <Box
        sx={{
          p: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          borderRadius: 5,
          width: "80%",
        }}
      >
        <Typography variant="h4" className="title">
          {WalletDetail[0].name}
        </Typography>
        <div className="info">
          <Typography
            variant="h5"
            className="wallet-code"
          >{`Wallet Code: ${WalletDetail[0].bank_number}`}</Typography>
          <Typography
            variant="h5"
            className="money"
          >{`Money: ${WalletDetail[0].money}`}</Typography>
        </div>
        <Button
          variant="contained"
          onClick={handleWithdrawMoney}
          style={{ backgroundColor: "#ffc422", width: "150px" }}
        >
          Withdraw
        </Button>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={historyOpen ? handleCloseHistory : handleViewHistory}
      >
        {historyOpen ? "Close History" : "View History"}
      </Button>

      {historyOpen && (
        <div className="history" style={{ marginTop: "16px" }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletPage;
