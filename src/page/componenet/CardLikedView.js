import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { getSelectedMarket } from "../public_market_profile/public_marketprofile-service";

import {
  postUnLikeMarket,
  getLikeMarket,
} from "../u_homepage/u_homepage-service";
import { useNavigate } from "react-router-dom";
import { selectUserReducer } from "../../redux/user/selector";

export default function RecipeReviewCard(props) {
  const { market, setLiked, targetid } = props;
  const userSelector = useSelector(selectUserReducer);
  const navigate = useNavigate();
  const role = userSelector.role;
  const handleClick = async () => {
    const marketId = market._id;
    const payload = {};
    console.log(marketId);
    const res = await getSelectedMarket(payload, marketId);

    navigate("/Viewmarket", {
      state: res,
    });
    console.log(res);
  };
  const apiUnlike = async () => {
    const marketId = market._id;
    const payload = {};
    console.log(marketId);
    const res = await postUnLikeMarket(payload, marketId);
    const likeres = await getLikeMarket();
    setLiked(likeres);
    console.log(res);
  };

  return !market ? (
    <Card sx={{ maxWidth: 800 }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          No data available.
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={market.name}
        subheader={market.province + "," + market.district}
      />
      <Button onClick={handleClick}>
        <CardMedia
          component="img"
          style={{ height: "194px", width: "450px" }}
          image={`data:image/jpeg;base64,${market.img}`}
          alt="CoverImg"
        />
      </Button>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {market.detail}
        </Typography>
      </CardContent>
      {role !== "Market" && (
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={apiUnlike}>
            <NotInterestedIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
