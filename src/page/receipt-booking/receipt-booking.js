import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import "./receipt.css";
import { useLocation } from "react-router-dom";

const Receipt = () => {
  const { state } = useLocation();
  const [stalldetail, setStalldetail] = React.useState(state);
  const transferTime = new Date(`2000-01-01T${stalldetail.transfer_time}:00`);
  const formattedTime = transferTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Grid container spacing={5} classname="main">
      <Grid item xs={12}>
        <Paper className="paper">
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            {" "}
            {stalldetail.market_name}
          </Typography>
          <div style={{ marginBottom: "50px" }}></div>
          <Typography variant="body1">
            Zone : {stalldetail.zone} , Number : {stalldetail.number}
          </Typography>
          <div style={{ marginBottom: "50px" }}></div>
          <Typography variant="body1">
            Rented Start :{new Date(stalldetail.dateStart).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            Rented End :{new Date(stalldetail.dateEnd).toLocaleDateString()}
          </Typography>
          <div style={{ marginBottom: "50px" }}></div>
          <Typography variant="body1">
            Payment : {stalldetail.payment}
          </Typography>

          <Typography variant="body1" className="total">
            Total: {stalldetail.price} ฿.-
          </Typography>
          <div style={{ marginBottom: "50px" }}></div>
          <Typography variant="body1" className="total">
            status : {stalldetail.status}
          </Typography>
          <Typography variant="body1" className="total">
            Transfer: {stalldetail.transfer_date} {formattedTime}
          </Typography>
          <div style={{ marginBottom: "150px" }}></div>
        </Paper>
        <p></p>
        <Button
          variant="contained"
          classname="button"
          style={{
            backgroundColor: "#33cc33",
            fontSize: "14px",
          }}
        >
          Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default Receipt;
