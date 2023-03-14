import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
  const { items1, district, setDistrict } = props;
  const { items2, province, setProvince } = props;
  const { items3, post, setPostNumber } = props;
  const handleChangeD = (event) => {
    setDistrict(event.target.value);
  };

  const handleChangeP = (event) => {
    setProvince(event.target.value);
  };
  const handleChangePO = (event) => {
    setPostNumber(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220, "& > :not(style)": { m: 1, width: "10ch" } }}>
      <FormControl fullWidth>
        <InputLabel id="district-select-label">District</InputLabel>
        <Select
          labelId="districtselect"
          id="districtselect"
          value={district}
          label="DistrictRole"
          onChange={handleChangeD}
        >
          <MenuItem value={10}>BangSue</MenuItem>
          <MenuItem value={20}>Mueng</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="">Province</InputLabel>
        <Select
          labelId="provinceselect"
          id="provinceselect"
          value={province}
          label="Province"
          onChange={handleChangeP}
        >
          <MenuItem value={10}>Bangkok</MenuItem>
          <MenuItem value={20}>Nakhonayok</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="">Post Nunber</InputLabel>
        <Select
          labelId="Postnumeselect"
          id="postnumselect"
          value={post}
          label="PostNumber"
          onChange={handleChangePO}
        >
          <MenuItem value={10}>26000</MenuItem>
          <MenuItem value={20}>11800</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
