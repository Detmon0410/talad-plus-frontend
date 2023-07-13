import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { postImg, getMyImgList } from "../m_profiles/m_profile-service";
import { getmyWallet } from "../wallet-market copy/wallet-market-service";

export default function ImageUpload(props) {
  const { marketdetail, setPictureList } = props;
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  const [dataImg, setDataImg] = useState(new FormData());

  useEffect(() => {
    if (images.length < 1) {
      setShowSaveButton(false);
      return;
    }

    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
    setShowSaveButton(true);
  }, [images]);

  function onImageChange(e) {
    e.preventDefault();
    setDataImg(e.target.files[0]);
    setImages([...e.target.files]);
  }

  async function handleSave() {
    const payload = new FormData();
    payload.append("market", marketdetail._id);
    payload.append("img", dataImg, dataImg.name);
    const res = await postImg(payload);
    setShowSaveButton(false);
    getMyImgList(marketdetail._id).then((res) => {
      setPictureList(res.image);
      console.log(res);
    });
    console.log(res);
  }
  // const onApi = async (event, newValue) => {
  //   getMyImgList(marketdetail._id).then((res) => {
  //     setPictureList(res.image);
  //     console.log(res.image);
  //   });
  //   // console.log(res);
  // };

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
        {showSaveButton && !saveButtonClicked && (
          <div>
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
          </div>
        )}
        {showSaveButton && !saveButtonClicked && (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        )}
        {/* <Button variant="contained" color="primary" onClick={onApi}>
          test
        </Button> */}
      </Stack>
    </Container>
  );
}
