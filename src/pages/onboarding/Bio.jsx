import React from 'react';
import {  useSelector } from 'react-redux';
import { setBioText } from '../../redux/onBoardingSlice'; // Import the action
import { Container,Box } from '@mui/material';
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
function Bio() {
  const bioText = useSelector((state) => state.onBoarding.bioText);
  const classes = commonStyles();

  return (
    <>
      <common.FormHeading
        heading="Tell us about yourself"
        title="This helps people in the community get to know you"
      />
      <Container maxWidth="sm">
        <Box className={classes.mainContainer}>
          <common.Input
            placeholder="Tell us anything you want the community to know..."
            value={bioText}
            rows={5}
            multiline={true}
            reduxHandleChange={setBioText}
          />
        </Box>
      </Container>
    </>
  );
}

export default Bio;
