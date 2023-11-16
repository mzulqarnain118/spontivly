import React, { useState, useCallback, useMemo } from "react";
import { Stack, Divider, Container, Typography,Box } from "@mui/material";
import { Link } from "react-router-dom";
import { loginStyles } from "../../styles";
import logo from "assets/images/logo-1.png";
import common from "../../components/common";
import { useNavigate } from "react-router-dom";
import { ApiCall, setLocal } from "../../utils";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
function Signup() {
  const [buttonText, setButtonText] = useState("Continue");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const classes = loginStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
  try {
    setLoading(true);

    if (buttonText === "Create account") {
      navigate("/onboarding");
    } else if (buttonText === "Continue") {
      const response = await ApiCall(
        `auth/is-email-exist?email=${formData.email}`,
        "GET"
      );

      if (response?.status === 200) {
        setButtonText("Login");
      } else {
        setButtonText("Create account");
      }
    } else if (buttonText === "Login") {
      const response = await ApiCall("auth/login", "POST", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setLocal("token", response.data.token);
        navigate("/onboarding");
      }
    }
  } catch (error) {
    console.error("Error in onSubmit:", error);
  } finally {
    setLoading(false);
  }
}, [buttonText, formData.email, navigate, setButtonText, setLocal]);


  const handleLinkedInButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <common.Img src={logo} logo={true} />
      <common.FormHeading heading=" Welcome to The Avengers" />
      <common.MuiButton
        onClick={handleLinkedInButtonClick}
        bgcolor="steelblue"
        color="white"
        size="large"
        variant="contained"
        label="Continue with LinkedIn"
        startIcon={<LinkedInIcon fontSize="large" />}
      />
      <Stack direction="row" spacing="1rem" className={classes.dividerText}>
        <Divider className={classes.divider} />
        <Typography>or</Typography>
        <Divider className={classes.divider} />
      </Stack>
      <form onSubmit={onSubmit} className={classes.subContainer}>
        {buttonText === "Create account" && (
          <common.Input
            name="fullName"
            value={formData.fullName}
            objOnChange={setFormData}
            placeholder="Full name"
            startIcon={true}
            required
          />
        )}
        <common.Input
          name="email"
          placeholder="Search"
          type="email"
          objOnChange={setFormData}
          value={formData.email}
          startIcon={true}
          required
        />

        {["Create account", "Login"].includes(buttonText) && (
          <common.Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            objOnChange={setFormData}
            startIcon={true}
            required
          />
        )}
        <common.MuiButton
          type="submit"
          label={buttonText}
          color="white"
          size="large"
          variant="contained"
          disabled={formData?.email === ""}
        />
      </form>

      <Typography variant="body2" className={classes.bodyText}>
        {buttonText === "Create account" && (
          <>
            By clicking{" "}
            <Link to="#" className={classes.createAccountLink}>
              "Create account" ,
            </Link>
          </>
        )}
        I agree to Tampa Bay Wave’s{" "}
        <Link to="#" className={classes.createAccountLink}>
          TOS
        </Link>{" "}
        and{" "}
        <Link to="#" className={classes.createAccountLink}>
          Privacy Policy
        </Link>
      </Typography>
    </Container>
  );
}

export default Signup;
