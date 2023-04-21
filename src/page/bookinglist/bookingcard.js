import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSelectedStall } from "./bookinglist-service";

export default function SimpleAccordion(props) {
  const navigate = useNavigate();
  const { name, start, number, end, status, zone, stallId } = props;
  const sentAPI = async () => {
    const res = await getSelectedStall(stallId);
    navigate("/Receipt", {
      state: res,
    });
    console.log(res);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {name} Status : {status}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {" "}
            Zone:{zone},Number:{number}
          </Typography>
          <Typography>
            start renting : {new Date(start).toLocaleDateString()}
          </Typography>
          <Typography>
            renting end : {new Date(end).toLocaleDateString()}
          </Typography>
          <Button onClick={sentAPI}>ใบเสร็จ</Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
