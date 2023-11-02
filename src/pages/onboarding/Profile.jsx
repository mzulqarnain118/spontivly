import { Button, SvgIcon } from '@mui/joy'
import React from 'react'
import { styled } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { setPhotoURL } from '../../redux/photoSlice';
import profileStyles from '../../styles/components/profileStyles';
import { Container, Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
 
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


function Profile() {
  const dispatch = useDispatch();
  const photoURL = useSelector((state) => state.photo.photoURL);
  const classes = profileStyles();
  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoObjectURL = URL.createObjectURL(file);
      dispatch(setPhotoURL(photoObjectURL));
    }
  };

  return (
    <>
      <Typography className={classes.heading}> Upload a profile picture</Typography>

      <span className={classes.title}
      >
        This helps people put a face to the name
      </span>
      <Container className={classes.mainContainer} >
        <img
          src={photoURL}
          className={classes.profileImage}
        
          loading="lazy"
          alt=""
        />
        <Button
          className={classes.button}
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
        >
          Upload Photo
          <VisuallyHiddenInput type="file" onChange={handleUploadPhoto} accept="image/*" />
        </Button>
      </Container>
    </>
  )
}

export default React.memo(Profile)
