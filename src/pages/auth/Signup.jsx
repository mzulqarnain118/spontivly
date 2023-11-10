import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import NewSearchInput from '../../components/common/NewSearchInput';
import LinkedInButton from '../../components/common/LinkedInButton';
import CustomButton from '../../components/common/CustomButton';
import { IconButton, Popover, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from '../../styles/components/loginStyles'
import logo from '../../assets/images/logo-1.png'

function Signup() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [buttonText, setbuttonText] = useState('Continue');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showAdditionalTextField, setShowAdditionalTextField] = useState(false); // Track whether to show the additional text field
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleSearchTextChange = (searchText) => {
      // Enable the button if there is some text in the search field
      setIsDisabled(searchText.trim() === '');
    };
    const handleContinueClick = () => {
      setShowAdditionalTextField(true);
      { buttonText == 'Continue' && setbuttonText('Create account') }
      // Show the additional text field when the "Continue" button is clicked
    };
    const handlePassword = (e) => {
      const newText = e.target.value;
      setPassword(newText);
    };
    const handleFullName = (e) => {
      const newText = e.target.value;
      setFullName(newText);
    };
    const handleLinkedInButtonClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const classes = useStyles();
  
    const open = Boolean(anchorEl);
    const id = open ? 'linkedin-popup' : undefined;
  return (
    <Container maxWidth="sm" className={classes.container}>
    <Box className={classes.box}>
      <img
        alt=""
        src={logo}
        className={classes.logo}
      />
      <Typography className={classes.title}>Welcome to The Avengers</Typography>
      <LinkedInButton onClick={handleLinkedInButtonClick} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing="1rem" // Use rem units
        sx={{ marginTop: '1.5rem' }}
      >
        <Divider className={classes.divider} />{/* Convert 400px to vw */}
        <Typography variant="subtitle1"   className={classes.subtitle}>
          or
        </Typography>
        <Divider className={classes.divider} />{/* Convert 400px to vw */}
      </Stack>
      <Box sx={{ display: 'flex' }}>


      </Box>
      {showAdditionalTextField && (
        <TextField
          fullWidth
          variant="outlined"
          value={fullName}
          onChange={handleFullName}
          InputProps={{
            startAdornment: (
              <IconButton disabled>
                <SearchIcon />
              </IconButton>
            ),
          }}
          placeholder="Full name"
          className={classes.passwordInput}
        />
      )}
      <NewSearchInput onSearchTextChange={handleSearchTextChange} />
      {showAdditionalTextField && (
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePassword}
          InputProps={{
            startAdornment: (
              <IconButton disabled>
                <SearchIcon />
              </IconButton>
            ),
          }}
          placeholder="Password"
          className={classes.passwordInput}
        />
      )}
      <CustomButton disable={isDisabled} onClick={handleContinueClick} text={buttonText} />
      <Stack
        direction="column"
        alignItems="center"
        spacing="0.125vw" // Convert 2px to vw
        sx={{ marginTop: '1.5vw' }} // Convert 24px to vw
      >
        <Typography variant="body2" className={classes.bodyText}>
          By clicking <Link to="/signup" className={classes.createAccountLink}>"Create account" ,</Link> I agree to Tampa Bay Wave’s TOS and Privacy Policy
        </Typography>

      </Stack>
    </Box>
  </Container>
  )
}

export default Signup
