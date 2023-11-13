import React, { useState, useEffect } from "react";
import LinkedInButton from "../../components/common/LinkedInButton";
import CustomButton from "../../components/common/CustomButton";
import { Stack, Divider, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "../../styles/components/loginStyles";
import logo from "../../assets/images/logo-1.png";
import common from "../../components/common";

function Signup() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonText, setbuttonText] = useState("Continue");
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    searchText: "",
  });

  const [showAdditionalTextField, setShowAdditionalTextField] = useState(false); // Track whether to show the additional text field
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setIsDisabled(formData?.searchText?.trim() === "");
  }, [formData.searchText]);

  const handleContinueClick = () => {
    setShowAdditionalTextField(true);
    {
      buttonText == "Continue" && setbuttonText("Create account");
    }
    // Show the additional text field when the "Continue" button is clicked
  };

  const handleLinkedInButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyles();

  const open = Boolean(anchorEl);
  return (
    <Container maxWidth="sm">
      <common.Img src={logo} logo={true} />
      <common.FormHeading heading=" Welcome to The Avengers" />
      <LinkedInButton onClick={handleLinkedInButtonClick} />
      <Stack direction="row" spacing="1rem" className={classes.dividerText}>
        <Divider className={classes.divider} />
        <Typography >
          or
        </Typography>
        <Divider className={classes.divider} />
      </Stack>
      {showAdditionalTextField && (
        <common.Input
          name="fullName"
          value={formData.fullName}
          objOnChange={setFormData}
          placeholder="Full name"
          startIcon={true}
        />
      )}
      <common.Input
        name="searchText"
        placeholder="Search"
        objOnChange={setFormData}
        value={formData.searchText}
        startIcon={true}
      />

      {showAdditionalTextField && (
        <common.Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          objOnChange={setFormData}
          startIcon={true}
        />
      )}
      <CustomButton
        disable={isDisabled}
        onClick={handleContinueClick}
        text={buttonText}
      />
      <Stack className={classes.info}>
        <Typography variant="body2" className={classes.bodyText}>
          By clicking{" "}
          <Link to="/signup" className={classes.createAccountLink}>
            {" "}
            "Create account" ,
          </Link>{" "}
          I agree to Tampa Bay Wave’s{" "}
          <Link to="#" className={classes.createAccountLink}>
            TOS
          </Link>{" "}
          and{" "}
          <Link to="#" className={classes.createAccountLink}>
            Privacy Policy
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}

export default Signup;
