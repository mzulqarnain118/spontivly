import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBioText } from '../../redux/onBoardingSlice'; // Import the action
import { Container,Box } from '@mui/material';
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
function Bio() {
  const bioText = useSelector((state) => state.onBoarding.bioText);
  const classes = commonStyles();
  const dispatch = useDispatch();

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
            onChange={(e) => dispatch(setBioText(e.target.value))}
          />
        </Box>
      </Container>
    </>
  );
}

export default Bio;
