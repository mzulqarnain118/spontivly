import React, { useCallback, useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid, Switch, Container } from "@mui/material";
import socialStyles from '../../styles/components/socialStyles';
import { useTheme } from '@mui/material/styles';
import common from '../../components/common';
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from 'reactjs-social-login';

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from 'react-social-login-buttons';
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
  const REDIRECT_URI = 'http://localhost:3000'
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState();

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);
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
                [theme.breakpoints.down("md")]: {
                  width: "20rem",
                },
              }}
            >
              <img
                src={social.image}
                className={classes.cardImage}
                loading="lazy"
                alt=""
              />
              <CardContent>
                <Typography className={classes.cardTitle}>
                  {social.name}
                </Typography>
                <Typography className={classes.cardLink}>
                  {social.link}
                </Typography>
              </CardContent>
              {social.name == 'LinkedIn' &&
                <LoginSocialLinkedin
                  client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
                  client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
                  scope='profile'
                  redirect_uri={REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Switch />
                </LoginSocialLinkedin>
              }
              {social.name == 'Instagram' &&
                <LoginSocialInstagram
                  client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
                  client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
                  redirect_uri={REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Switch />
                </LoginSocialInstagram>
              }
              {social.name == 'Facebook' &&
                <LoginSocialFacebook
                  appId={process.env.REACT_APP_FB_APP_ID || ''}
                  fieldsProfile={
                    'id,first_name,last_name,middle_name,name,name_format'
                  }
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  redirect_uri={REDIRECT_URI}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Switch />
                </LoginSocialFacebook>
              }
              {social.name == 'Twitter' &&
                <LoginSocialTwitter
                  client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
                  redirect_uri={REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onLogoutSuccess={onLogoutSuccess}
                  onResolve={({ provider, data }) => {
                    setProvider(provider);
                    setProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Switch />
                </LoginSocialTwitter>
              }


            </Card>
          </div>
        ))}


      </Container>


    </Grid>
  );
}

export default React.memo(Social);
