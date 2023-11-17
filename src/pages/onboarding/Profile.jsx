import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoURL } from "../../redux/onBoardingSlice";
import commonStyles from "../../styles/commonStyles";
import { Container } from "@mui/material";
import common from "../../components/common";
import defaultProfile from "assets/images/defaultProfile.png";
import { readFile } from "utils";

function Profile() {
  const dispatch = useDispatch();
  const photoURL = useSelector((state) => state.onBoarding.file);

  console.log("🚀 ~ file: Profile.jsx:13 ~ Profile ~ photoURL:", photoURL)

  const classes = commonStyles();
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
        console.log(
          "🚀 ~ file: Profile.jsx:19 ~ handleUploadPhoto ~ file:",
          file
        );

    const uploadFile = reader.readAsDataURL(file);


    console.log(
      "🚀 ~ file: Profile.jsx:21 ~ handleUploadPhoto ~ uploadFile:",
      uploadFile
    );

    // Check if a file is selected
    if (!file) {
      console.error("No file selected");
      return;
    }
    dispatch(setPhotoURL(file));
  };

  return (
    <>
      <common.FormHeading
        heading="Upload a profile picture"
        title=" This helps people put a face to the name"
      />
      <Container className={classes.mainContainer}>
        <common.Img
          src={photoURL ?? defaultProfile}
          className={classes.profileImage}
        />
        <common.MuiButton
          handleUploadPhoto={handleUploadPhoto}
          label={"Upload Photo"}
          size="medium"
          startIcon={<common.Img src={require("assets/icons/upload.png")} />}
        />
      </Container>
    </>
  );
}

export default React.memo(Profile);
