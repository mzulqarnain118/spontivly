import MenuIcon from '@mui/icons-material/Menu'
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
  Drawer
} from '@mui/material'
import { Container } from '@mui/system'
import React, { lazy, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import lock from '../../assets/icons/lock.svg'
import success from '../../assets/icons/success.svg'
import warning from '../../assets/icons/Warming.svg'
import companyLogo from '../../assets/images/CompanyLogo.png'
import { Controls as common } from '../../components/common'
import { handleNext, handleBack } from '../../redux/onBoardingSlice'
import { onBoarding, Main, AppBar, DrawerFooter, DrawerHeader } from '../../styles/components/onBoardingStyles'
import { ApiCall, generatePayload, getLocal, setLocal } from '../../utils'
import { SKILLS_STEP, INTERESTS_STEP, LOCATION_STEP, EMPLOYMENT_STEP, OBJECTIVES_STEP, BIO_STEP, DEFAULT_STEP } from './stepNames'
const Skills = lazy(() => import('./Skills').then((module) => ({ default: module.Skills })))
const Interests = lazy(() => import('./Interests').then((module) => ({ default: module.Interests })))
const Location = lazy(() => import('./Location').then((module) => ({ default: module.Location })))
const Company = lazy(() => import('./Company').then((module) => ({ default: module.Company })))
const Objective = lazy(() => import('./Objective').then((module) => ({ default: module.Objective })))
const Bio = lazy(() => import('./Bio').then((module) => ({ default: module.Bio })))
const Social = lazy(() => import('./Social').then((module) => ({ default: module.Social })))
const Profile = lazy(() => import('./Profile').then((module) => ({ default: module.Profile })))

function OnBoarding() {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedChips: skillsSelectedChips } = useSelector((state: any) => state.skills)
  const { activeStep } = useSelector((state: any) => state.onBoarding)
  const { linkedin, twitter, facebook, instagram } = useSelector((state: any) => state.social)
  const { selectedChips: interestsSelectedChips } = useSelector((state: any) => state.interests)
  const setSelectedLocation = useSelector((state: any) => state.location.selectedLocation)
  const { companyName, position, stage } = useSelector((state: any) => state.company.companyInfo)
  const { selectedChips: objectiveSelectedChips } = useSelector((state: any) => state.objective)
  const bioText = useSelector((state: any) => state.onBoarding.bioText)
  const { photoFlag, profilePicPayload } = useSelector((state: any) => state.onBoarding)
  const isSmallScreen = useMediaQuery('(max-width:414px)')
  const classes: any = onBoarding()
  const steps = [
    {
      label: 'Skills',
      component: <Skills />
    },
    {
      label: 'Interests',
      component: <Interests />
    },
    {
      label: 'Location',
      component: <Location />
    },
    {
      label: 'Company',
      component: <Company />
    },
    {
      label: 'Objective',
      component: <Objective />
    },
    {
      label: 'Bio',
      component: <Bio />
    },
    {
      label: 'Social',
      component: <Social />
    },
    {
      label: 'Profile',
      component: <Profile />
    }
  ]

  const handleDrawerOpen = () => {
    setOpen(!open)
  }
  const handleFinish = async () => {
    const skills = generatePayload(skillsSelectedChips)
    const interests = generatePayload(interestsSelectedChips)
    const objectives = generatePayload(objectiveSelectedChips)
    const photoFormData = new FormData()

    photoFormData.append('file', profilePicPayload)
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
      objectives
    }

    const combinedFormData = new FormData()

    combinedFormData.append('file', profilePicPayload)
    combinedFormData.append('data', JSON.stringify(jsonData))
    const response = await ApiCall('profile/', null, 'POST', combinedFormData)

    if (response) {
      setLocal('onboarding', true)
      navigate('/channels')
    }
  }

  const isNextButtonDisabled = () => {
    switch (activeStep) {
      case SKILLS_STEP:
        return !skillsSelectedChips || skillsSelectedChips.length === 0
      case INTERESTS_STEP:
        return !interestsSelectedChips || interestsSelectedChips.length === 0
      case LOCATION_STEP:
        return setSelectedLocation === null
      case EMPLOYMENT_STEP:
        return companyName === '' || position === '' || stage === null
    }
  }

  const nextButtonText = () => {
    let nextButtonText = 'Next'

    if (activeStep === DEFAULT_STEP) {
      nextButtonText = 'Finish'
    } else if ((activeStep === OBJECTIVES_STEP && objectiveSelectedChips.length <= 0) || (activeStep === BIO_STEP && bioText === '')) {
      nextButtonText = 'Skip'
    }

    return nextButtonText
  }

  return (
    <Container>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ mr: '-10px' }}>
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={classes.toolbarIcon}>
            <MenuIcon />
          </IconButton>
          {!isSmallScreen && (
            <Typography noWrap component="div" className={classes.label}>
              {steps?.[activeStep]?.label}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open}>
        <DrawerHeader className={classes.drawerHeader}>
          <common.Img src={companyLogo} />
          <Link to={true ? '#' : '/member-portal'} className={classes.link}>
            {'Save and exit'}
          </Link>
        </DrawerHeader>
        <Typography className={classes.sidebarHeader}>Complete your profile</Typography>
        <List className={classes.list}>
          {['Skills', 'Interests', 'Location', 'Company', 'Objective', 'Bio', 'Social', 'Profile'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton disabled={index !== activeStep}>
                <ListItemText primary={text} className={classes.listItemButton} />
              </ListItemButton>
              {index !== activeStep ? (
                index < activeStep ? (
                  <common.Img src={success} className={classes.listItemSuccessIcon} />
                ) : (
                  <common.Img src={lock} className={classes.listItemIcon} />
                )
              ) : (
                <common.Img src={warning} className={classes.listItemSuccessIcon} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {(!isSmallScreen || (isSmallScreen && !open)) && (
          <>
            <Container className={classes.mainContainer}>{steps[activeStep].component}</Container>
            <DrawerFooter position="fixed" open={open} className={classes.drawerFooter}>
              <MobileStepper
                variant="progress"
                steps={8}
                position="static"
                activeStep={activeStep}
                className={classes.mobileStepper}
                backButton={undefined}
                nextButton={undefined}
              />
              <div className={classes.footerButtonDiv}>
                <common.MuiButton
                  onClick={() => {
                    dispatch(handleBack())
                  }}
                  disabled={activeStep === 0}
                  label="Back"
                />
                <common.MuiButton
                  onClick={() => {
                    activeStep === 7 ? handleFinish() : dispatch(handleNext())
                  }}
                  disabled={isNextButtonDisabled()}
                  variant="contained"
                  label={nextButtonText()}
                />
              </div>
            </DrawerFooter>
          </>
        )}
      </Main>
    </Container>
  )
}

export { OnBoarding }
