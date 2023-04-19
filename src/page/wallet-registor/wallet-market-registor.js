import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { postCreateWallet } from "./wallet-registor-service";
import "./WalletRegisterPage.css";
import WalletIcon from "@mui/icons-material/Wallet";
function RegistorWallet() {
  const navigate = useNavigate();
  const [walletNameInput, setWalletNameInput] = React.useState("");
  const [walletNumberInput, setWalletNumberInput] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);

  const sentAPI = async () => {
    if (!walletNameInput || !walletNumberInput) {
      setMessage("Fill is empty.");
      setShowMessage(true);
    } else {
      const payload = {
        bank_user: walletNameInput,
        bank_number: walletNumberInput,
      };
      postCreateWallet(payload);
    }
  };

  return (
    <div className="table-container">
      <WalletIcon
        style={{ color: "#ffc422", height: 200, width: 200 }}
      ></WalletIcon>
      <Typography variant="h5" gutterBottom className="Typography-root">
        ลงทะเบียน wallet
      </Typography>
      <TextField
        required
        id="wallet-name"
        label="ชื่อผู้ถือบัตร"
        value={walletNameInput}
        onChange={(event) => setWalletNameInput(event.target.value)}
      />
      <TextField
        required
        id="wallet-number"
        label="เลขบัญชีธนาคาร"
        type="number"
        value={walletNumberInput}
        onChange={(event) => setWalletNumberInput(event.target.value)}
      />

      <Button
        variant="contained"
        onClick={sentAPI}
        style={{
          backgroundColor: "#ffc422",
          width: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Confirm
      </Button>
    </div>
  );
}

export default RegistorWallet;
