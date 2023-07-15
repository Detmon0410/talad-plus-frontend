import React, { useEffect, useState } from "react";
import "../App.css";
import "./registor_owner.css";
import Alert from "../componenet/Alert/Alert1997";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Upload from "../componenet/ImageUp_MarketR";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { postRegister } from "./registor_owner-service";
import {
  ThailandAddressTypeahead,
  ThailandAddressValue,
} from "react-thailand-address-typeahead";

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
  const [val, setVal] = useState(ThailandAddressValue.empty());
  const [subDistrict, setSubDistrict] = React.useState("");

  const sentAPI = async () => {
    if (
      !marketnameInput ||
      !ownernameInput ||
      !phonenumberInput ||
      !addressInput
    ) {
      setMessage("Fill is empty or Fill is Incorrect.");
      console.log(val.province);
      setShowMessage(true);
    } else {
      const payload = new FormData();
      payload.append("name", marketnameInput);
      payload.append("phone", phonenumberInput);
      payload.append("address", addressInput);
      payload.append("subdistrict", val.subdistrict);
      payload.append("ownername", ownernameInput);
      payload.append("province", val.province);
      payload.append("district", val.district);
      payload.append("post", val.postalCode);
      payload.append("img", image, image.name);
      payload.append("imglicense", imagelicense, imagelicense.name);

      console.log(payload);
      const res = await postRegister(payload);
      navigate("/ThisWallet");
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

      <h1 className="Text-Style">ลงทะเบียนตลาด</h1>

      <Box component="form" noValidate autoComplete="off">
        {" "}
        <p>
          <TextField
            size="small"
            id="market_name"
            label="ชื่อตลาด"
            value={marketnameInput}
            onChange={(e) => setmarketnameInput(e.target.value)}
            variant="outlined"
            sx={{ width: 300 }}
          />
        </p>
        <p>
          <TextField
            size="small"
            id="market_owner"
            label="ชื่อเจ้าของตลาด"
            variant="outlined"
            value={ownernameInput}
            onChange={(e) => setOwnernameInput(e.target.value)}
            sx={{ width: 300 }}
          />
        </p>
        <p>
          <TextField
            size="small"
            id="phoneinput"
            label="เบอร์โทรศัพท์"
            value={phonenumberInput}
            onChange={(e) => setPhoneNumberInput(e.target.value)}
            vvariant="outlined"
            sx={{ width: 300 }}
          />
        </p>
        <p>
          <TextField
            size="small"
            id="market_address"
            label="ที่อยู่ของตลาด"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            variant="outlined"
            sx={{ width: 300 }}
          />
        </p>
      </Box>
      <p>
        <div className="address-container">
          {" "}
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
              optionItemProps={{ style: { fontSize: 16, cursor: "pointer" } }}
            />
          </ThailandAddressTypeahead>
        </div>
      </p>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
      </Box>
      <p>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ffc422",
            fontSize: "18px",
          }}
          onClick={sentAPI}
        >
          ถัดไป
        </Button>
      </p>
    </div>
  );
}

export default Registor;
