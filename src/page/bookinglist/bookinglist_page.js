import * as React from "react";
import Bookinglist from "./bookingcard";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./bookingcards.css";
export default function SimpleAccordion() {
  const { state } = useLocation();
  const [stalllist, setStalllist] = React.useState(state);

  const handleCloseHistory = () => {
    console.log(stalllist);
  };
  return (
    <div>
      <div className="history-header">
        <Typography sx={{ fontSize: "25px" }}>My Booking Stall List</Typography>
        <Button
          className="refresh-btn"
          variant="contained"
          style={{
            backgroundColor: "#33cc33",
            fontSize: "17px",
          }}
          onClick={handleCloseHistory}
        >
          refresh
          <RefreshIcon sx={{ width: "30px", height: "30px" }} />
        </Button>
      </div>
      <div className="booking-container">
        {stalllist ? (
          stalllist.length > 0 ? (
            stalllist
              .reverse()
              .map((booking) => (
                <Bookinglist
                  stallId={booking._id}
                  zone={booking.zone}
                  name={booking.market_name}
                  start={booking.dateStart}
                  end={booking.dateEnd}
                  status={booking.status}
                  number={booking.number}
                ></Bookinglist>
              ))
          ) : (
            <p>ไม่มีตลาดที่คุณจองในขณะนี้</p>
          )
        ) : (
          <p>ไม่มีตลาดที่คุณจองในขณะนี้</p>
        )}
      </div>
    </div>
  );
}
