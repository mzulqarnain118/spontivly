import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoURL } from '../../redux/onBoardingSlice';
import commonStyles from '../../styles/commonStyles';
import { Container } from '@mui/material';
import common from "../../components/common";

function Profile() {
  const dispatch = useDispatch();
  const photoURL = useSelector((state) => state.photo?.file);
  const classes = commonStyles();
const handleUploadPhoto = (event) => {
  const file = event.target.files;

  console.log("🚀 ~ file: Profile.jsx:16 ~ handleUploadPhoto ~ file:", file)

  // Check if a file is selected
  if (!file) {
    console.error("No file selected");
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", "dp");
  formData.append("type", "dp");
  formData.append("owner_id", 1);
  dispatch(setPhotoURL(formData));
};


  return (
    <>
      <common.FormHeading
        heading="Upload a profile picture"
        title=" This helps people put a face to the name"
      />
      <Container className={classes.mainContainer}>
        <common.Img src={photoURL} className={classes.profileImage} />
        <common.MuiButton
          handleUploadPhoto={handleUploadPhoto}
          label={"Upload Photo"}
          size="medium"
          startIcon={
            <common.Img src={require("assets/icons/upload.png")} />
          }
        />
      </Container>
    </>
  );
}

export default React.memo(Profile)
