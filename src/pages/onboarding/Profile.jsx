import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoURL } from "../../redux/onBoardingSlice";
import commonStyles from "../../styles/commonStyles";
import { Container } from "@mui/material";
import { Controls as common } from "../../components/common";
import defaultProfile from "assets/images/defaultProfile.png";
import { readFile } from "utils";
import uploadIcon from "assets/icons/upload.png";
function Profile() {
  const dispatch = useDispatch();
  const profilePic = useSelector((state) => state.onBoarding.profilePic);
  const classes = commonStyles();
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    // Check if a file is selected
    if (!file) {
      console.error("No file selected");
      return;
    }
     readFile(file, (uploadedImage) => {
       dispatch(
         setPhotoURL({ profilePic:uploadedImage, profilePicPayload: file })
       );
     });
  };

  return (
    <>
      <common.FormHeading
        heading="Upload a profile picture"
        title=" This helps people put a face to the name"
      />
      <Container className={classes.mainContainer}>
        <common.Img
          src={profilePic ?? defaultProfile}
          className={classes.profileImage}
        />
        <common.FileUploadButton
          handleUploadPhoto={handleUploadPhoto}
          label={"Upload Photo"}
          size="medium"
          startIcon={<common.Img src={uploadIcon} />}
        />
      </Container>
    </>
  );
}

export {React}.memo(Profile);
