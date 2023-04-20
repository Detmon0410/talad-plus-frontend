import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import "./receipt.css";

const Receipt = () => {
  return (
    <Grid container spacing={3} classname="main">
      <Grid item xs={12}>
        <Paper className="paper">
          <Typography variant="h5">MarketName</Typography>
          <Typography variant="body1">Zone&Number</Typography>
          <Typography variant="body1">dateStart</Typography>
          <Typography variant="body1">dateEnd</Typography>
          <Typography variant="body1">payment Type</Typography>

          <Typography variant="body1" className="total">
            Total: $60.00
          </Typography>
          <Typography variant="body1" className="total">
            status
          </Typography>
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
