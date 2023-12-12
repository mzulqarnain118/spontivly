import React, { useState, useCallback } from "react";
import { Stack, Divider, Container, Typography } from "@mui/material";
import { loginStyles } from "../../styles";
import logo from "assets/images/logo-1.png";
import common from "../../components/common";
import { useNavigate } from "react-router-dom";
import { ApiCall, encodeParam, getLocal, setLocal } from "../../utils";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export default function Auth() {
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
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);

        if (buttonText === "Create account") {
          navigate("/onboarding");
        } else if (buttonText === "Continue") {
              const encodedEmail = encodeParam(formData.email);
          const response = await ApiCall(
            `auth/is-email-exist?email=${encodedEmail}`
          );

          if (response) {
            setButtonText("Login");
          } else {
            setButtonText("Create account");
          }
        } else if (buttonText === "Login") {
          const payload = {
            email: formData.email,
            password: formData?.password,
          };
          const response = await ApiCall("auth/login", null, "POST", payload);
          if (response) {
            const { token, onboarding } = response;
            !onboarding && localStorage.clear();
            setLocal("token", token);
            setLocal("onboarding", onboarding);
            navigate(onboarding ? "/" : "/onboarding");
          }
        }
      } catch (error) {
        console.error("Error in onSubmit:", error);
      } finally {
        setLoading(false);
      }
    },
    [buttonText, formData, navigate, setButtonText, setLocal]
  );

  const handleLinkedInButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <common.Img src={logo} type="logo" />
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
            listUpdater={setFormData}
            placeholder="Full name"
            startIcon={true}
            required
          />
        )}
        <common.Input
          name="email"
          placeholder="Search"
          type="email"
          listUpdater={setFormData}
          value={formData.email}
          startIcon={true}
          required
        />

        {["Create account", "Login"].includes(buttonText) && (
          <common.Input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            listUpdater={setFormData}
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
            By clicking <common.Link to="#" label="Create account" />
          </>
        )}
        I agree to Tampa Bay Wave’s <common.Link to="#" label="TOS" />
        and <common.Link to="#" label="Privacy Policy" />
      </Typography>
    </Container>
  );
}
