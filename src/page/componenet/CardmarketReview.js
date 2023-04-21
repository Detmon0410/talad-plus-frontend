import { CardContent, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import "./Tabbar_Market.css";

function ReviewCard({ name, rating, review }) {
  return (
    <div className="card-body" style={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Rating name="no-value" value={rating} size="small" readOnly />
        <Typography variant="body2">{review}</Typography>
      </CardContent>
    </div>
  );
}

export default ReviewCard;
