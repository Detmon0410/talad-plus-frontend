import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";

export default function SimpleAccordion(props) {
  const { name, start, number, end, status } = props;
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{number}</Typography>
          <Typography>start renting : {start}</Typography>
          <Typography>renting end :{end}</Typography>
          <Button>ใบเสร็จ</Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
