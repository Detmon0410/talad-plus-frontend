import { Card, CardContent, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

function ReviewCard({ name, rating, review }) {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Rating name="no-value" value={rating} size="small" />
        <Typography variant="body2">{review}</Typography>
      </CardContent>
    </Card>
  );
}

export default ReviewCard;
