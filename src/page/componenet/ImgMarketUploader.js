import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { postImg } from "../m_profiles/m_profile-service";
export default function UploadButtons(props) {
  const { marketdetail } = props;
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(new FormData());

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
      setImage(reader.result);
    };
    console.log(image);

    reader.readAsDataURL(file);
  };
  const apiSave = async (event) => {
    if (image) {
      const payload = new FormData();
      payload.append("market", marketdetail._id);
      payload.append("img", image);
      setImageUrl(null);
      setImage(new FormData());
      const res = await postImg(payload);
      console.log(res);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Stack direction="column" alignItems="center" spacing={1}>
        <label htmlFor="upload-image">
          <Button variant="contained" component="span">
            Upload
          </Button>
          <input
            id="upload-image"
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileUpload}
          />
        </label>
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {imageUrl && <img src={imageUrl} alt="Uploaded Image" height="300" />}
        </div>
        {imageUrl && (
          <div style={{ marginTop: "16px" }}>
            <Button variant="contained" color="primary" onClick={apiSave}>
              Save
            </Button>
          </div>
        )}
      </Stack>
    </Container>
  );
}
