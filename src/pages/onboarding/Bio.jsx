import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBioText } from '../../redux/bioSlice'; // Import the action
import { Container } from '@mui/material';
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
function Bio() {
  const dispatch = useDispatch();
  const bioText = useSelector((state) => state.bio.bioText);
  const classes = commonStyles();

  return (
    <>
      <common.FormHeading
        heading="Tell us about yourself"
        title="This helps people in the community get to know you"
      />
      <Container className={classes.mainContainer}>
        <common.TextArea
          placeholder="Tell us anything you want the community to know..."
          value={bioText}
          onChange={(e) => dispatch(setBioText(e.target.value))}
        />
      </Container>
    </>
  );
}

export default Bio;
