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
import "./registor.css";

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

      <h1 className="Text-Style">ลงทะเบียนพ่อค้าแม่ค้า</h1>

      <Box component="form" noValidate autoComplete="off">
        {" "}
        <p>
          <TextField
            id="mName"
            label="ชื่อ"
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
            label="เบอร์โทรศัพท์"
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
            label="ที่อยู่"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            variant="outlined"
            sx={{ width: 300 }}
          />
        </p>
      </Box>
      <p>
        <div className="address-container">
          <ThailandAddressTypeahead
            value={val}
            onValueChange={(val) => setVal(val)}
          >
            <ThailandAddressTypeahead.SubdistrictInput
              style={{
                borderRadius: 5,
                fontSize: "16px",
                width: "272px",
                height: "23px",
                padding: "8.5px 14px",
                border: "1px solid rgb(192, 192, 192)",
              }}
              placeholder="ตำบล/แขวง"
            />
            <ThailandAddressTypeahead.DistrictInput
              style={{
                borderRadius: 5,
                fontSize: "1rem",
                width: "272px",
                height: "23px",
                padding: "8.5px 14px",
                border: "1px solid rgb(192, 192, 192)",
              }}
              placeholder="อำเภอ/เขต"
            />
            <ThailandAddressTypeahead.ProvinceInput
              style={{
                borderRadius: 5,
                fontSize: "1rem",
                width: "272px",
                height: "23px",
                padding: "8.5px 14px",
                border: "1px solid rgb(192, 192, 192)",
              }}
              placeholder="จังหวัด"
            />
            <ThailandAddressTypeahead.PostalCodeInput
              style={{
                borderRadius: 5,
                fontSize: "1rem",
                width: "272px",
                height: "23px",
                padding: "8.5px 14px",
                border: "1px solid rgb(192, 192, 192)",
              }}
              placeholder="รหัสไปรษณีย์"
            />
            <ThailandAddressTypeahead.Suggestion
              containerProps={{
                style: { border: "1px solid black" },
              }}
              optionItemProps={{
                style: { fontSize: 16, cursor: "pointer" },
              }}
            />
          </ThailandAddressTypeahead>
        </div>
      </p>
      <p>
        <h4 className="Text-Style-seconds">อัพโหลดรูปโปรไฟล์</h4>
        <Upload
          setFormData={(e) => {
            setImage(e);
          }}
        ></Upload>
      </p>

      <p></p>

      <p>
        <Box component="form" noValidate autoComplete="off">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ffc422",
              fontSize: "18px",
            }}
            onClick={sentAPI}
          >
            ยืนยัน
          </Button>
        </Box>
      </p>
    </div>
  );
}

export default Registor;
