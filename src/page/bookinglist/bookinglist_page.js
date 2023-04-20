import * as React from "react";
import Bookinglist from "./bookingcard";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
export default function SimpleAccordion() {
  const { state } = useLocation();
  const [stalllist, setStalllist] = React.useState(state);

  const handleCloseHistory = () => {
    console.log(stalllist);
  };
  return (
    <div>
      <Typography>My Booking Stall List</Typography>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#33cc33",
          fontSize: "18px",
        }}
        onClick={handleCloseHistory}
      ></Button>
      {stalllist.map((booking) => (
        <Bookinglist
          name={booking._id}
          start={booking.dateStart}
          end={booking.dateEnd}
          status={booking.status}
          number={booking.number}
        ></Bookinglist>
      ))}
    </div>
  );
}
