import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function StandardImageList(props) {
  const { pictureList } = props;
  const handleDelete = (index) => {
    // Handle the delete action for the image at the specified index
    // You can update the pictureList array or perform any necessary actions
  };
  const [selectedImg, setSelectedImg] = React.useState(null);
  const handleOpenImage = (img) => {
    setSelectedImg(img);
  };

  const handleCloseImage = () => {
    setSelectedImg(null);
  };
  return (
    <>
      <ImageList
        sx={{ width: "100%", height: 300, marginTop: "20px" }}
        cols={3}
        rowHeight={280}
      >
        {pictureList && pictureList.length > 0 ? (
          pictureList.map((img, index) => (
            <ImageListItem
              key={index}
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: 0, // Remove the default padding to prevent additional spacing
                marginTop: "20px", // Set the margin top for spacing between pictures
              }}
            >
              <img
                src={`data:image/jpeg;base64,${img}`}
                alt={`Image ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenImage(img)}
              />
              <IconButton
                aria-label="Delete"
                onClick={() => handleDelete(index)}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))
        ) : (
          <div></div>
        )}
      </ImageList>

      <Dialog open={!!selectedImg} onClose={handleCloseImage} maxWidth="md">
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={`data:image/jpeg;base64,${selectedImg}`}
            alt="Preview"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
