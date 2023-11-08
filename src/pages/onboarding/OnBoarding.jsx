import React, { lazy, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import companyLogo from '../../assets/images/CompanyLogo.png';
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
} from "@mui/material";
import success from '../../assets/icons/success.svg';
import lock from '../../assets/icons/lock.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import common from "../../components/common";
import { onBoarding, Main, AppBar, DrawerFooter, DrawerHeader } from '../../styles/components/onBoardingStyles';
import { setLocal,getLocal } from '../../utils';
const Skills = lazy(() => import('./Skills'));
const Interests = lazy(() => import('./Interests'));
const Location = lazy(() => import('./Location'));
const Company = lazy(() => import('./Company'));
const Objective = lazy(() => import('./Objective'));
const Bio = lazy(() => import('./Bio'));
const Social = lazy(() => import('./Social'));
const Profile = lazy(() => import('./Profile'));


const drawerWidth = 313;


function OnBoarding() {
    const theme = useTheme();
  const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(getLocal("activeStep"));
    const { selectedChips: skillsSelectedChips, chipData: skillsChipData } = useSelector((state) => state.skills);
    const { selectedChips: interestsSelectedChips, chipData: interestsChipData } = useSelector((state) => state.interests);
    const setSelectedLocation = useSelector((state) => state.location.selectedLocation);
    const { companyName, position, stage } = useSelector((state) => state.company.companyInfo);
    const { selectedChips: objectiveSelectedChips, chipData: objectiveChipData } = useSelector((state) => state.objective);
    const bioText = useSelector((state) => state.bio.bioText);
    const isSmallScreen = useMediaQuery('(max-width:414px)');
    const classes = onBoarding();
    const steps = [
        {
            label: 'Skills',
            component: <Skills />,
        },
        {
            label: 'Interests',
            component: <Interests />,
        },
        {
            label: 'Location',
            component: <Location />,
        },
        {
            label: 'Company',
            component: <Company />,
        },
        {
            label: 'Objective',
            component: <Objective />,
        },
        {
            label: 'Bio',
            component: <Bio />,
        },
        {
            label: 'Social',
            component: <Social />,
        },
        {
            label: 'Profile',
            component: <Profile />,
        },
    ]

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
 
  useEffect(() => {
    !activeStep && setLocal("activeStep",0);
  }, [activeStep]);

  const handleNext = React.useCallback(() => {
      setLocal("activeStep", activeStep + 1);
      setActiveStep(getLocal("activeStep"));
    }, [activeStep]);

    const handleBack = React.useCallback(() => {
      setLocal("activeStep", activeStep - 1);
      setActiveStep(getLocal("activeStep"));
    }, [activeStep]);
    const isNextButtonDisabled = () => {
      switch (activeStep) {
        case 0:
          return !skillsSelectedChips || skillsSelectedChips.length === 0;
        case 1:
          return !interestsSelectedChips || interestsSelectedChips.length === 0;
        case 2:
          return setSelectedLocation === null;
        case 3:
          return companyName === '' || position === '' || stage === null;
        default:
          return activeStep === 7;
      }
    };

    const nextButtonText = (() => {
      return (activeStep === 4 && objectiveSelectedChips.length <= 0) ||
      (activeStep === 5 && bioText == '') ? 'Skip': 'Next';
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
            <img src={companyLogo} alt="Company Logo" />
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
                    <img
                      loading="lazy"
                      src={success}
                      className={classes.listItemSuccessIcon}
                    />
                  ) : (
                    <img
                      loading="lazy"
                      src={lock}
                      className={classes.listItemIcon}
                    />
                  )
                ) : (
                  ""
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
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    className={classes.footerBackButton}
                    label="Back"
                  />
                  <common.MuiButton
                    onClick={handleNext}
                    disabled={isNextButtonDisabled()}
                    className={classes.footerNextButton}
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

export default OnBoarding
