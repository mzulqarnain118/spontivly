import React, { lazy } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import { handleNext, handleBack } from "../../redux/skillsSlice";
import companyLogo from "assets/images/CompanyLogo.png";
import {
  MobileStepper,
  IconButton,
  useMediaQuery,
  ListItemButton,
  ListItemText,
  Toolbar,
  List,
  ListItem,
  CssBaseline,
  Typography,
  Drawer,
} from "@mui/material";
import success from "assets/icons/success.svg";
import lock from "assets/icons/lock.svg";
import warning from "assets/icons/Warming.svg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import common from "../../components/common";
import {
  onBoarding,
  Main,
  AppBar,
  DrawerFooter,
  DrawerHeader,
} from "../../styles/components/onBoardingStyles";
import { ApiCall, generatePayload, setLocal } from "utils";
const Skills = lazy(() => import("./Skills"));
const Interests = lazy(() => import("./Interests"));
const Location = lazy(() => import("./Location"));
const Company = lazy(() => import("./Company"));
const Objective = lazy(() => import("./Objective"));
const Bio = lazy(() => import("./Bio"));
const Social = lazy(() => import("./Social"));
const Profile = lazy(() => import("./Profile"));

function OnBoarding() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedChips: skillsSelectedChips, activeStep } = useSelector(
    (state) => state.skills
  );
  const { linkedin, twitter, facebook, instagram } = useSelector(
    (state) => state.social
  );
  const { selectedChips: interestsSelectedChips } = useSelector(
    (state) => state.interests
  );
  const setSelectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const { companyName, position, stage } = useSelector(
    (state) => state.company.companyInfo
  );
  const { selectedChips: objectiveSelectedChips } = useSelector(
    (state) => state.objective
  );
  const bioText = useSelector((state) => state.onBoarding.bioText);
  const { photoFlag, profilePicPayload } = useSelector((state) => state.onBoarding);
  const isSmallScreen = useMediaQuery("(max-width:414px)");
  const classes = onBoarding();
  const steps = [
    {
      label: "Skills",
      component: <Skills />,
    },
    {
      label: "Interests",
      component: <Interests />,
    },
    {
      label: "Location",
      component: <Location />,
    },
    {
      label: "Company",
      component: <Company />,
    },
    {
      label: "Objective",
      component: <Objective />,
    },
    {
      label: "Bio",
      component: <Bio />,
    },
    {
      label: "Social",
      component: <Social />,
    },
    {
      label: "Profile",
      component: <Profile />,
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const handleFinish = async () => {
    const skills = generatePayload(skillsSelectedChips);
    const interests = generatePayload(interestsSelectedChips);
    const objectives = generatePayload(objectiveSelectedChips);
    const photoFormData = new FormData();
    photoFormData.append("file", profilePicPayload);
    const jsonData = {
      company_name: companyName,
      position,
      introduction: bioText,
      linkedin_id: linkedin.id,
      instagram_id: instagram.id,
      facebook_id: facebook.id,
      twitter_id: twitter.id,
      location: setSelectedLocation,
      company_stage: stage,
      skills,
      interests,
      objectives,
    };

    const combinedFormData = new FormData();
    combinedFormData.append("file", profilePicPayload);
    combinedFormData.append("data", JSON.stringify(jsonData));
    try {
      const response = await ApiCall("profile/", "POST", combinedFormData);
      if (response?.status === 200) {
        setLocal("onboarding", true);
        navigate("/");
      }
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:136 ~ handleFinish ~ error:", error);
    }
  };

  const isNextButtonDisabled = () => {
    switch (activeStep) {
      case 0:
        return !skillsSelectedChips || skillsSelectedChips.length === 0;
      case 1:
        return !interestsSelectedChips || interestsSelectedChips.length === 0;
      case 2:
        return setSelectedLocation === null;
      case 3:
        return companyName === "" || position === "" || stage === null;
      default:
        return activeStep === 7 && photoFlag === false;
    }
  };

  const nextButtonText = (() => {
    let nextButtonText = "Next";

    if (activeStep === 7) {
      nextButtonText = "Finish";
    } else if (
      (activeStep === 4 && objectiveSelectedChips.length <= 0) ||
      (activeStep === 5 && bioText === "")
    ) {
      nextButtonText = "Skip";
    }

    return nextButtonText;
  })();

  return (
    <Container>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.toolbarIcon}
          >
            <MenuIcon />
          </IconButton>
          {!isSmallScreen && (
            <Typography noWrap component="div" className={classes.label}>
              {steps[activeStep].label}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className={classes.drawerHeader}>
          <common.Img src={companyLogo} />
          <Link to={true ? "#" : "/member-portal"} className={classes.link}>
            {"Save and exit"}
          </Link>
        </DrawerHeader>
        <Typography className={classes.sidebarHeader}>
          Complete your profile
        </Typography>
        <List className={classes.list}>
          {[
            "Skills",
            "Interests",
            "Location",
            "Company",
            "Objective",
            "Bio",
            "Social",
            "Profile",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton disabled={index !== activeStep}>
                <ListItemText
                  primary={text}
                  className={classes.listItemButton}
                />
              </ListItemButton>
              {index !== activeStep ? (
                index < activeStep ? (
                  <common.Img
                    src={success}
                    className={classes.listItemSuccessIcon}
                  />
                ) : (
                  <common.Img src={lock} className={classes.listItemIcon} />
                )
              ) : (
                <common.Img
                  src={warning}
                  className={classes.listItemSuccessIcon}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {(!isSmallScreen || (isSmallScreen && !open)) && (
          <>
            <Container className={classes.mainContainer}>
              {steps[activeStep].component}
            </Container>
            <DrawerFooter
              position="fixed"
              open={open}
              className={classes.drawerFooter}
            >
              <MobileStepper
                variant="progress"
                steps={8}
                position="static"
                activeStep={activeStep}
                className={classes.mobileStepper}
              />
              <div className={classes.footerButtonDiv}>
                <common.MuiButton
                  onClick={() => {
                    dispatch(handleBack());
                  }}
                  disabled={activeStep === 0}
                  label="Back"
                />
                <common.MuiButton
                  onClick={() => {
                    activeStep === 7 ? handleFinish() : dispatch(handleNext());
                  }}
                  disabled={isNextButtonDisabled()}
                  variant="contained"
                  label={nextButtonText}
                />
              </div>
            </DrawerFooter>
          </>
        )}
      </Main>
    </Container>
  );
}

export default OnBoarding;
