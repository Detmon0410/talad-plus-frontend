import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "./PaymentForm.css";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { getSelectedStall } from "./visapayment-service";

const PaymentForm = (props) => {
  const {
    openModal,
    setOpenModal,
    onSubmit,
    price,
    setName,
    setNum,
    setExpM,
    setExpY,
    setCcvin,
    Name,
    Num,
    ExpM,
    ExpY,
    Ccvin,
  } = props;
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [ccv, setCcv] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <div className="u-modal" hidden={!openModal}>
      <div
        className="modal-bg"
        onClick={() => {
          setOpenModal(false);
        }}
      ></div>
      <div className="modal-container">
        <form className="payment-form" onSubmit={handleFormSubmit}>
          <CreditCardOutlinedIcon classname="my-icon" />
          <Typography variant="h4" gutterBottom>
            Visapayment
          </Typography>
          <TextField
            label="Card Number"
            value={Num}
            onChange={(event) => setNum(event.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Cardholder Name"
            value={Name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            required
          />
          <div className="expiration-date">
            <TextField
              label="Expiration Month"
              value={ExpM}
              onChange={(event) => setExpM(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Expiration Year"
              value={ExpY}
              onChange={(event) => setExpY(event.target.value)}
              fullWidth
              required
            />
          </div>
          <TextField
            label="CCV"
            value={Ccvin}
            onChange={(event) => setCcvin(event.target.value)}
            fullWidth
            required
          />
          <Typography variant="h6" className="total">
            Total Price: {price}฿
          </Typography>
          <Button type="submit" variant="contained" onClick={onSubmit}>
            Submit Payment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
