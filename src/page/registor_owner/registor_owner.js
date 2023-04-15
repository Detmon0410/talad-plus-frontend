import React from "react";
import "../App.css";
import Alert from "../componenet/Alert/Alert1997";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddressSelect from "../componenet/Selector_address";
import Upload from "../componenet/ImageUp_MarketR";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { postRegister } from "./registor_owner-service";

function Registor() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [marketnameInput, setmarketnameInput] = React.useState("");
  const [ownernameInput, setOwnernameInput] = React.useState("");
  const [phonenumberInput, setPhoneNumberInput] = React.useState("");
  const [addressInput, setAddressInput] = React.useState("");
  const [image, setImage] = React.useState();
  const [imagelicense, setImageLicense] = React.useState();

  const provinceItem = [
    { value: "Bangna", name: "Bangna" },
    { value: "Bansue", name: "Bangna" },
  ];
  const districtItem = [
    { value: "Bangkok", name: "Bangkok" },
    { value: "Bangkok", name: "Bangkok" },
  ];
  const postItem = [
    { value: "10800", name: "10800" },
    { value: "11800", name: "11800" },
  ];
  const sentAPI = async () => {
    if (
      !marketnameInput ||
      !ownernameInput ||
      !phonenumberInput ||
      !addressInput
    ) {
      setMessage("Fill is empty or Fill is Incorrect.");
      setShowMessage(true);
    } else {
      const payload = new FormData();
      payload.append("name", marketnameInput);
      payload.append("phone", phonenumberInput);
      payload.append("address", addressInput);
      payload.append("province", "Bangkok");
      payload.append("district", "Bangkok");
      payload.append("post", "123444");
      payload.append("img", image, image.name);
      payload.append("imglicense", imagelicense, imagelicense.name);

      console.log(payload);
      const res = await postRegister(payload);
      navigate("/login");
      console.log(res);
    }
  };

  return (
    <div className="App">
      <Alert
        message={message}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
      <header className="App-header">
        <h1 className="Text-Style">ลงทะเบียนตลาด</h1>
        <Box component="form" noValidate autoComplete="off">
          {" "}
          <p>
            <TextField
              id="market_name"
              label="Market Name"
              value={marketnameInput}
              onChange={(e) => setmarketnameInput(e.target.value)}
              variant="filled"
              sx={{ width: 300 }}
            />
          </p>
          <p>
            <TextField
              id="market_owner"
              label="Owner Name"
              variant="filled"
              value={ownernameInput}
              onChange={(e) => setOwnernameInput(e.target.value)}
              sx={{ width: 300 }}
            />
          </p>
          <p>
            <TextField
              id="phone_number"
              label="Phone Number"
              value={phonenumberInput}
              onChange={(e) => setPhoneNumberInput(e.target.value)}
              variant="filled"
              sx={{ width: 300 }}
            />
          </p>
          <p>
            <TextField
              id="market_address"
              label="Market Address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              variant="filled"
              sx={{ width: 300 }}
            />
          </p>
        </Box>
        <p>
          <AddressSelect></AddressSelect>
        </p>

        <p
          style={{
            fontSize: "12px",
            color: "#000000",
          }}
        >
          <h2>อัพโหลดรูปภาพปกตลาด</h2>
          <Upload setFormData={setImage}></Upload>
        </p>

        <p
          style={{
            fontSize: "12px",
            color: "#000000",
          }}
        >
          <h2>อัพโหลดรูปใบอนุญาตตลาด</h2>
          <Upload setFormData={setImageLicense}></Upload>
        </p>

        <p>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
            }}
            onClick={sentAPI}
          >
            Next
          </Button>
        </p>
      </header>
    </div>
  );
}

export default Registor;
