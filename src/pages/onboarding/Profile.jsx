import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoURL } from '../../redux/photoSlice';
import commonStyles from '../../styles/commonStyles';
import { Container } from '@mui/material';
import common from "../../components/common";

function Profile() {
  const dispatch = useDispatch();
  const photoURL = useSelector((state) => state.photo.photoURL);
  const classes = commonStyles();
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoObjectURL = URL.createObjectURL(file);
      dispatch(setPhotoURL(photoObjectURL));
    }
  };

  return (
    <>
      <common.FormHeading
        heading="Upload a profile picture"
        title=" This helps people put a face to the name"
      />
      <Container className={classes.mainContainer}>
        <img
          src={photoURL}
          className={classes.profileImage}
          loading="lazy"
          alt=""
        />
        <common.CustomIconButton
          handleUploadPhoto={handleUploadPhoto}
          label={"Upload Photo"}
          CustomIcon={require("../../assets/icons/upload.png")}
        />
      </Container>
    </>
  );
}

export default React.memo(Profile)
