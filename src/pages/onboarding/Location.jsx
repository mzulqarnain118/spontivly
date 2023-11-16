import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import {
  setLocationText,
  setSelectedLocation,
} from "../../redux/locationSlice"; // Import your action
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import locationIcon from "assets/icons/location.png";
import locationStyles from "../../styles/components/locationStyles";
function Location() {
  const classes = commonStyles();
  const locationClasses = locationStyles();
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.location.searchText);
  const locations = useSelector((state) => state.location.locations);
  const handleSelect = (name, state, id) => {
    dispatch(setLocationText(`${name},${state}`));
    dispatch(setSelectedLocation(id));
  };
  const customHandleClearClick = () => {
    dispatch(setLocationText(""));
    dispatch(setSelectedLocation(null));
  };
  return (
    <>
      <common.FormHeading
        heading="Where are you located?"
        title="Tell us what city you’re based in"
      />
      <Container maxWidth="sm" className={classes.container}>
        <Box className={classes.mainContainer}>
          <common.Input
            placeholder="Search Location"
            value={searchText}
            reduxHandleChange={setLocationText}
            customHandleClearClick={customHandleClearClick}
            startIcon={true}
            endIcon={true}
          />
        </Box>
      </Container>
      {locations.map((data, index) => (
        <>
          <Box
            className={locationClasses.container}
            onClick={() => handleSelect(data.name, data.state.name, data.id)}
          >
            <common.Img src={locationIcon} className={locationClasses.image} />
            <Box className={locationClasses.content}>
              <Typography>{data.name}</Typography>
              <Typography>{data.state.name}</Typography>
            </Box>
          </Box>
        </>
      ))}
    </>
  );
}

export default React.memo(Location);
