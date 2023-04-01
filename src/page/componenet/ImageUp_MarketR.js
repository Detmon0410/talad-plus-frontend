import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

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
    e.preventDefault();
    // e.target.files.forEach((file, i) => {
    //   data.append(`file`, firstImage, firstImage.name);
    // });
    setFormData(e.target.files[0]);
    //send data to API upload image

    setImages([...e.target.files]);
  }

  return (
    <div className="App">
      <label>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#ffc422",
            fontSize: "18px",
            width: "50%",
          }}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          />

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
        </Button>
      </label>
    </div>
  );
}
