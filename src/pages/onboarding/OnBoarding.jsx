import React, { lazy, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import { handleNext, handleBack } from "../../redux/skillsSlice";
import companyLogo from "../../assets/images/CompanyLogo.png";
import {
  MobileStepper,
  IconButton,
  useMediaQuery,
  ListItemButton,
  ListItemText,
  Toolbar,
  List,
  ListItem,
  Divider,
  CssBaseline,
  Typography,
  Drawer,
} from "@mui/material";
import success from "../../assets/icons/success.svg";
import lock from "../../assets/icons/lock.svg";
import warning from "../../assets/icons/Warming.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import common from "../../components/common";
import {
  onBoarding,
  Main,
  AppBar,
  DrawerFooter,
  DrawerHeader,
} from "../../styles/components/onBoardingStyles";
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
  const {
    selectedChips: skillsSelectedChips,
    chipData: skillsChipData,
    activeStep,
  } = useSelector((state) => state.skills);
 const {skills,} = useSelector((state) => state);
  const { selectedChips: interestsSelectedChips, chipData: interestsChipData } =
    useSelector((state) => state.interests);
  const setSelectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );
  const { companyName, position, stage } = useSelector(
    (state) => state.company.companyInfo
  );
  const { selectedChips: objectiveSelectedChips, chipData: objectiveChipData } =
    useSelector((state) => state.objective);
  const bioText = useSelector((state) => state.onBoarding.bioText);
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

const generatePayload = () => {
  switch (activeStep) {
    case 0:
      return {
        skills: skillsSelectedChips.reduce((acc, cur) => {
          acc.push(cur.id);
          return acc;
        }, []),
        // Add other properties specific to this case
      };
    case 1:
      return {
        interests: skillsSelectedChips.reduce((acc, cur) => {
          // Custom logic for interests
          // acc.push(cur.someOtherProperty);
          return acc;
        }, []),
        // Add other properties specific to this case
      };
    // case 2:
    //   return {
    //     location: otherData.selectedLocation,
    //     // Add other properties specific to this case
    //   };
    // case 3:
    //   return {
    //     company: otherData.companyName,
    //     position: otherData.position,
    //     stage: otherData.stage,
    //     // Add other properties specific to this case
    //   };
    // Add more cases as needed
    default:
      return {};
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
        return activeStep === 7;
    }
  };

  const nextButtonText = (() => {
    return (activeStep === 4 && objectiveSelectedChips.length <= 0) ||
      (activeStep === 5 && bioText == "")
      ? "Skip"
      : "Next";
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
        <Divider />
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
                    dispatch(handleNext());
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
