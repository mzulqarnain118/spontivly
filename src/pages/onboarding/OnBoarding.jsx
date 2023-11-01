import React, { lazy } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/system';
import { Button, useMediaQuery } from '@mui/material';
import companyLogo from '../../assets/images/CompanyLogo.png';
import MobileStepper from '@mui/material/MobileStepper';
import IconButton from '@mui/material/IconButton';
import success from '../../assets/icons/success.svg';
import lock from '../../assets/icons/lock.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onBoarding, Main, AppBar, DrawerFooter, DrawerHeader } from '../../styles/components/onBoardingStyles';
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
    const [activeStep, setActiveStep] = React.useState(0);
    const { selectedChips: skillsSelectedChips, chipData: skillsChipData } = useSelector((state) => state.skills);
    const { selectedChips: interestsSelectedChips, chipData: interestsChipData } = useSelector((state) => state.interests);
    const searchText = useSelector((state) => state.location.searchText);
    const { companyName, position, stage } = useSelector((state) => state.company);
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

    const handleNext = React.useCallback(() => {
        setActiveStep((activeStep) => activeStep + 1);
    }, [activeStep]);

    const handleBack = React.useCallback(() => {
        setActiveStep((activeStep) => activeStep - 1);
    }, [activeStep]);
    const isNextButtonDisabled = React.useMemo(() => {
        switch (activeStep) {
            case 0:
                return !skillsSelectedChips || skillsSelectedChips.length === 0;
            case 2:
                return searchText === '';
            case 3:
                return companyName === '' || position === '' || stage === '';
            default:
                return activeStep === 7;
        }
    }, [activeStep, skillsSelectedChips, searchText, companyName, position, stage]);

    const nextButtonText = (() => {
        return (activeStep === 1 && interestsSelectedChips.length <= 0) ||
            (activeStep === 4 && objectiveSelectedChips.length <= 0) ||
            (activeStep === 5 && bioText == '') ? 'Skip' : 'Next';
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
                    {!isSmallScreen &&
                        <Typography noWrap component="div" className={classes.label}>
                            {steps[activeStep].label}
                        </Typography>
                    }
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
                    <Link to="/member-portal" className={classes.link}>
                        {'Save and exit'}
                    </Link>
                </DrawerHeader>
                <Divider />
                <Typography className={classes.sidebarHeader}>Complete your profile</Typography>
                <List className={classes.list}>
                    {['Skills', 'Interests', 'Location', 'Company', 'Objective', 'Bio', 'Social', 'Profile'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton disabled={index !== activeStep}>
                                <ListItemText primary={text} className={classes.listItemButton} />
                            </ListItemButton>
                            {index !== activeStep ? (index < activeStep ? <img src={success} className={classes.listItemSuccessIcon} /> : <img src={lock} className={classes.listItemIcon} />) : ''}
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {(!isSmallScreen || (isSmallScreen && !open)) &&
                    <>
                        <Container className={classes.mainContainer}
                        >
                            {steps[activeStep].component}
                        </Container>
                        <DrawerFooter position="fixed" open={open} className={classes.drawerFooter}>
                            <MobileStepper
                                variant="progress"
                                steps={8}
                                position="static"
                                activeStep={activeStep}
                                className={classes.mobileStepper}
                            />
                            <div className={classes.footerButtonDiv}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={handleBack}
                                    disabled={activeStep === 0}
                                    className={classes.footerBackButton}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleNext}
                                    disabled={isNextButtonDisabled}
                                    className={classes.footerNextButton}

                                >
                                    {nextButtonText}
                                </Button>
                            </div>
                        </DrawerFooter>
                    </>
                }

            </Main>
        </Container>
    );
}

export default OnBoarding
