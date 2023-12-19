import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Controls as common } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import { commonStyles } from "styles";
import { readFile } from "utils";
import { setPhotoURL } from "../../redux/onBoardingSlice";
import defaultProfile from "assets/images/defaultProfile.png";
import uploadIcon from "assets/icons/upload.png";

const panels = [
  {
    key: "profile",
    title: "Profile",
    subheader: "This information will be displayed publicly.",
    component: <ProfileContent />,
  },
  {
    key: "bio",
    title: "Bio",
    subheader: "Add additional details for your profile.",
  },
  {
    key: "social",
    title: "Social Integerations",
    subheader: "Your social media profiles.",
  },
  {
    key: "password",
    title: "Update Password",
    subheader:
      "By changing your password, you help make sure that only you can use your account.",
  },
];
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProfileContent = () => {
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
        setPhotoURL({ profilePic: uploadedImage, profilePicPayload: file })
      );
    });
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" align="left">
        Photo
      </Typography>
      <Grid container display={"flex"} alignItems="center">
        <Grid item md={2}>
          <common.Img
            src={profilePic ?? defaultProfile}
            className={classes.settingsProfileImage}
          />
        </Grid>
        <Grid item md={3}>
          <common.MuiButton
            handleUploadPhoto={handleUploadPhoto}
            label={"Upload Photo"}
            size="large"
            startIcon={<common.Img src={uploadIcon} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const Profile = () => {
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (panel) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: !prevExpanded[panel],
    }));
  };

  return (
    <Box display="flex" flexDirection="column" mt={15}>
      {panels.map((panel) => (
        <Card key={panel.key} sx={{ mb: 10 }}>
          <CardHeader
            sx={{ borderBottom: "1px solid #e0e0e0" }}
            action={
              <ExpandMore
                expand={expanded[panel.key] || false}
                onClick={() => handleExpandClick(panel.key)}
                aria-expanded={expanded[panel.key]}
                aria-label="show more"
              >
                <ExpandMoreIcon fontSize="large" />
              </ExpandMore>
            }
            titleTypographyProps={{ sx: { textAlign: "left" } }}
            subheaderTypographyProps={{ sx: { textAlign: "left" } }}
            title={panel.title}
            subheader={panel.subheader}
          />
          <Collapse in={expanded[panel.key]} timeout="auto" unmountOnExit>
            <CardContent>{panel.component}</CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

export {Profile};
