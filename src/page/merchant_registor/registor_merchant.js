import React from "react";
import "../App.css";
import Alert from "../componenet/Alert/Alert1997";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RoleSelect from "../componenet/Selector_address";
import Upload from "../componenet/ImageUp_MarketR";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { postMeRegister } from "./register_merchant-service";

function Registor() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [mnameInput, setmnameInput] = React.useState("");
  const [districtInput, setDistrictInput] = React.useState("");
  const [provinceInput, setProvinceInput] = React.useState("");
  const [addressInput, setAddressInput] = React.useState("");
  const [phonenumberInput, setPhonenumberInput] = React.useState("");
  const [image, setImage] = React.useState(new FormData());
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
    if (!mnameInput || !addressInput) {
      setMessage("Fill is empty or Fill is Incorrect.");
      setShowMessage(true);
    } else {
      const payload = new FormData();
      payload.append("name", mnameInput);
      payload.append("phone", phonenumberInput);
      payload.append("address", addressInput);
      payload.append("province", "Bangkok");
      payload.append("district", "Bangkok");
      payload.append("post", "123444");
      payload.append("img", image, image.name);

      console.log(payload);
      const res = await postMeRegister(payload);
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
        <h1 className="Text-Style">ลงทะเบียนพ่อค้าแม่ค้า</h1>

        <Box component="form" noValidate autoComplete="off">
          {" "}
          <p>
            <TextField
              id="mName"
              label="Name&SurName "
              value={mnameInput}
              onChange={(e) => setmnameInput(e.target.value)}
              variant="filled"
              sx={{ width: 300 }}
            />
          </p>
          <p>
            <TextField
              id="phoneNumber"
              label="PhoneNumber"
              value={phonenumberInput}
              onChange={(e) => setPhonenumberInput(e.target.value)}
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
          <p>
            <h4 className="Text-Style-seconds">อัพโหลดรูปโปรไฟล์</h4>
            <Upload
              setFormData={(e) => {
                setImage(e);
              }}
            ></Upload>
          </p>
        </Box>
        <p>
          <RoleSelect></RoleSelect>
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
