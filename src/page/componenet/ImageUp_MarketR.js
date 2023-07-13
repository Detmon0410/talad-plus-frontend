import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
export default function ImageUpload(props) {
  const { setFormData } = props;
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    e.preventDefault(); // e.target.files.forEach((file, i) => {
    //   data.append(`file`, firstImage, firstImage.name);
    // });
    setFormData(e.target.files[0]); //send data to API upload image

    setImages([...e.target.files]);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Stack direction="column" alignItems="center" spacing={1}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input type="file" hidden accept="image/*" onChange={onImageChange} />
          <PhotoCamera />
        </IconButton>
        {imageURLs.map((imageSrc, idx) => (
          <img
            sx={{ ml: 2 }}
            key={idx}
            width="80%"
            height="50%"
            src={imageSrc}
            alt="Market Ricesne"
          />
        ))}
      </Stack>
    </Container>
  );
}
