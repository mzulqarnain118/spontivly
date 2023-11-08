import React, { useCallback, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/joy';
import { Grid, Switch, Container } from "@mui/material";
import socialStyles from '../../styles/components/socialStyles';
import { useTheme } from '@mui/material/styles';
import common from '../../components/common';
import config from "../../config";
import {
  LoginSocialFacebook,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialTwitter,
} from 'reactjs-social-login';
const socialData = [
  {
    name: "LinkedIn",
    image: require("../../assets/images/Linkedin.png"),
    link: "linkedin.com",
  },
  {
    name: "Instagram",
    image: require("../../assets/images/Instagram.png"),
    link: "instagram.com",
  },
  {
    name: "Facebook",
    image: require("../../assets/images/Facebook.png"),
    link: "facebook.com",
  },
  {
    name: "Twitter",
    image: require("../../assets/images/twitter.png"),
    link: "twitter.com",
  },
];

function Social() {
  const classes = socialStyles();
  const theme = useTheme();
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState('');
  const {
    SOCIAL_AUTH_LINKEDIN_APP_ID,
    SOCIAL_AUTH_LINKEDIN_APP_SECRET,
    SOCIAL_AUTH_INSTAGRAM_APP_ID,
    SOCIAL_AUTH_INSTAGRAM_APP_SECRET,
    SOCIAL_AUTH_FB_APP_ID,
    SOCIAL_AUTH_TWITTER_V2_APP_KEY,
    SOCIAL_AUTH_REDIRECT_URI,
  } = config;

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  const renderSocialLogin = (Component, props) => {
    return (
      <Component
        {...props}
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={SOCIAL_AUTH_REDIRECT_URI}
        onResolve={({ provider, data }) => {
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Switch />
      </Component>
    );
  };

  return (
    <Grid className={classes.container}>
      <common.FormHeading
        heading="Connect your social"
        title="This helps us find connections that are relevant to you"
      />
      <Container className={classes.subContainer}>
        {socialData.map((social, index) => (
          <div key={index}>
            <Card
              orientation="horizontal"
              variant="outlined"
              className={classes.card}
              sx={{
                [theme.breakpoints.down('md')]: {
                  width: '20rem',
                },
              }}
            >
              <img src={social.image} className={classes.cardImage} loading="lazy" alt="" />
              <CardContent>
                <Typography className={classes.cardTitle}>{social.name}</Typography>
                <Typography className={classes.cardLink}>{social.link}</Typography>
              </CardContent>
              {social.name === 'LinkedIn' &&
                renderSocialLogin(LoginSocialLinkedin, {
                  client_id: SOCIAL_AUTH_LINKEDIN_APP_ID,
                  client_secret: SOCIAL_AUTH_LINKEDIN_APP_SECRET,
                  scope: 'profile',
                })}
              {social.name === 'Instagram' &&
                renderSocialLogin(LoginSocialInstagram, {
                  client_id: SOCIAL_AUTH_INSTAGRAM_APP_ID,
                  client_secret: SOCIAL_AUTH_INSTAGRAM_APP_SECRET,
                })}
              {social.name === 'Facebook' && 
                renderSocialLogin(LoginSocialFacebook, {
                  appId: SOCIAL_AUTH_FB_APP_ID,
                  fieldsProfile: 'id,first_name,last_name,middle_name,name,name_format',
                })}
              {social.name === 'Twitter' &&
                renderSocialLogin(LoginSocialTwitter, {
                  client_id: SOCIAL_AUTH_TWITTER_V2_APP_KEY,
                })}
            </Card>
          </div>
        ))}
      </Container>
    </Grid>
  );
}

export default React.memo(Social);
