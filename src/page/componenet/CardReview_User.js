import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { blue } from "@mui/material/colors";

export default function MediaCard() {
  return (
    <p>
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bang One Market
          </Typography>
          <Typography variant="body2" color="text.secondary">
            จ่ายเงินตรงเวลาดีมาก สินค้ามีคุณภาพ สุภาพเรียบร้อย
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" aria-label="Like" sx={{ color: blue[500] }}>
            <ThumbUpIcon />
          </IconButton>
          <IconButton size="small" aria-label="DisLike">
            <ThumbDownIcon />
          </IconButton>
        </CardActions>
      </Card>
    </p>
  );
}
