import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBioText } from '../../redux/bioSlice'; // Import the action
import Textarea from '@mui/joy/Textarea';
import { useTheme } from '@mui/material/styles';
import bioStyles from '../../styles/components/bioStyles';
import { Container, Typography } from '@mui/material';
function Bio() {
  const dispatch = useDispatch();
  const bioText = useSelector((state) => state.bio.bioText);
  const theme = useTheme();
  const classes = bioStyles();

  const handleBioChange = (e) => {
    dispatch(setBioText(e.target.value));
  };


  return (
    <>
      <Typography className={classes.heading}> Tell us about yourself</Typography>

      <span className={classes.title}
      >
        This helps people in the community get to know you
      </span>
      <Container className={classes.mainContainer}>
        <Textarea
          placeholder="Tell us anything you want the community to know..."
          value={bioText}
          onChange={handleBioChange}
          className={classes.text}
          sx={{
            [theme.breakpoints.up('md')]: {
              width: '34.1875rem',
              height: '11.34rem' // Adjust width for screens wider than 'md' breakpoint
            }, // Initially use full width

            
          }}
        />
      </Container>
    </>
  );
}

export default Bio;
