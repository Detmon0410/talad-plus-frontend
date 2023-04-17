import React, { useState } from "react";
import "../App.css";
import Alert from "../componenet/Alert/Alert1997";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import RoleSelect from "../componenet/Selector_address";
import Upload from "../componenet/ImageUp_MarketR";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { postMeRegister } from "./register_merchant-service";
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from "react-thailand-address-typeahead";

function Registor() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [showMessage, setShowMessage] = React.useState(false);
  const [mnameInput, setmnameInput] = React.useState("");

  const [addressInput, setAddressInput] = React.useState("");
  const [phonenumberInput, setPhonenumberInput] = React.useState("");
  const [image, setImage] = React.useState(new FormData());
  const [val, setVal] = useState(ThailandAddressValue.empty());

  const sentAPI = async () => {
    if (!mnameInput || !addressInput) {
      setMessage("Fill is empty or Fill is Incorrect.");
      setShowMessage(true);
    } else {
      const payload = new FormData();
      payload.append("name", mnameInput);
      payload.append("phone", phonenumberInput);
      payload.append("address", addressInput);
      payload.append("province", val.province);
      payload.append("subdistrict", val.subdistrict);
      payload.append("district", val.district);
      payload.append("post", val.postalCode);
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
              size="small"
              value={mnameInput}
              onChange={(e) => setmnameInput(e.target.value)}
              variant="outlined"
              sx={{ width: 300 }}
            />
          </p>
          <p>
            <TextField
              id="phoneNumber"
              label="PhoneNumber"
              size="small"
              value={phonenumberInput}
              onChange={(e) => setPhonenumberInput(e.target.value)}
              variant="outlined"
              sx={{ width: 300 }}
            />
          </p>
          <p>
            <TextField
              size="small"
              id="market_address"
              label="Address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              variant="outlined"
              sx={{ width: 300 }}
            />
          </p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {" "}
            <ThailandAddressTypeahead
              value={val}
              onValueChange={(val) => setVal(val)}
            >
              <ThailandAddressTypeahead.SubdistrictInput
                style={{
                  borderRadius: 5,
                  marginBottom: 10,
                  fontSize: 24,
                  border: "1px solid grey",
                }}
                placeholder="Subdistrict"
              />
              <ThailandAddressTypeahead.DistrictInput
                style={{
                  borderRadius: 5,
                  marginBottom: 10,
                  fontSize: 24,
                  border: "1px solid grey",
                }}
                placeholder="District"
              />
              <ThailandAddressTypeahead.ProvinceInput
                style={{
                  borderRadius: 5,
                  marginBottom: 10,
                  fontSize: 24,
                  border: "1px solid grey",
                }}
                placeholder="Province"
              />
              <ThailandAddressTypeahead.PostalCodeInput
                style={{
                  borderRadius: 5,
                  marginBottom: 10,
                  fontSize: 24,
                  border: "1px solid grey",
                }}
                placeholder="Postal Code"
              />

              <ThailandAddressTypeahead.Suggestion
                containerProps={{
                  style: { border: "1px solid black" },
                }}
                optionItemProps={{ style: { fontSize: 16, cursor: "pointer" } }}
              />
            </ThailandAddressTypeahead>
          </Box>
          <p>
            <h4 className="Text-Style-seconds">อัพโหลดรูปโปรไฟล์</h4>
            <Upload
              setFormData={(e) => {
                setImage(e);
              }}
            ></Upload>
          </p>
        </Box>
        <p></p>

        <p>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
            }}
            onClick={sentAPI}
          >
            Submit
          </Button>
        </p>
      </header>
    </div>
  );
}

export default Registor;
