import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "../App.css";
export default function FormControlLabelPosition() {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">เลือกวันที่ตลาดเปิด</FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Sun"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Mon"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Tue"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Wed"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Thu"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Fri"
          labelPlacement="top"
        />
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="Sat"
          labelPlacement="top"
        />
      </FormGroup>
    </FormControl>
  );
}
