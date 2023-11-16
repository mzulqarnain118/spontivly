import React from "react";
import {
  Grid,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import socialStyles from "../../styles/components/socialStyles";
import common from "../../components/common";
import config from "../../config";
import { setSoicalData } from "../../redux/socialSlice";
import { useDispatch, useSelector } from "react-redux";
import linkedIn from "assets/images/Linkedin.png";
import instagram from "assets/images/Instagram.png";
import facebook from "assets/images/Facebook.png";
import twitter from "assets/images/twitter.png";
import {
  LoginSocialFacebook,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialTwitter,
} from "reactjs-social-login";
const socialData = [
  {
    name: "LinkedIn",
    image: linkedIn,
    link: "linkedin.com",
  },
  {
    name: "Instagram",
    image: instagram,
    link: "instagram.com",
  },
  {
    name: "Facebook",
    image: facebook,
    link: "facebook.com",
  },
  {
    name: "Twitter",
    image: twitter,
    link: "twitter.com",
  },
];

function Social() {
  const classes = socialStyles();
  const dispatch = useDispatch();
  const social = useSelector((state) => state.social);
  const {
    REACT_APP_LINKEDIN_APP_ID,
    REACT_APP_LINKEDIN_APP_SECRET,
    REACT_APP_INSTAGRAM_APP_ID,
    REACT_APP_INSTAGRAM_APP_SECRET,
    REACT_APP_FB_APP_ID,
    REACT_APP_TWITTER_V2_APP_KEY,
    REACT_APP_REDIRECT_URI,
  } = config;

  const renderSocialLogin = (Component, props) => {
    const platform = props.platform;
    return (
      <Component
        {...props}
        redirect_uri={REACT_APP_REDIRECT_URI}
        onResolve={({ provider, data }) => {
          dispatch(
            setSoicalData({
              provider,
              id: provider == "facebook" ? data.userID : data.id ,
            })
          );
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <common.CustomSwitch
          checked={social[platform].id === null ? false : true}
        />
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
            >
              <div className="row-center">
                <common.Img src={social.image} className={classes.cardImage} />
                <CardContent>
                  <Typography className={classes.cardTitle}>
                    {social.name}
                  </Typography>
                  <Typography className={classes.cardLink}>
                    {social.link}
                  </Typography>
                </CardContent>
              </div>

              {social.name === "LinkedIn" &&
                renderSocialLogin(LoginSocialLinkedin, {
                  client_id: REACT_APP_LINKEDIN_APP_ID,
                  client_secret: REACT_APP_LINKEDIN_APP_SECRET,
                  scope: "profile",
                  platform: social.name.toLocaleLowerCase(),
                })}
              {social.name === "Instagram" &&
                renderSocialLogin(LoginSocialInstagram, {
                  client_id: REACT_APP_INSTAGRAM_APP_ID,
                  client_secret: REACT_APP_INSTAGRAM_APP_SECRET,
                  platform: social.name.toLocaleLowerCase(),
                })}
              {social.name === "Facebook" &&
                renderSocialLogin(LoginSocialFacebook, {
                  appId: REACT_APP_FB_APP_ID,
                  fieldsProfile:
                    "id,first_name,last_name,middle_name,name,name_format",
                  platform: social.name.toLocaleLowerCase(),
                })}
              {social.name === "Twitter" &&
                renderSocialLogin(LoginSocialTwitter, {
                  client_id: REACT_APP_TWITTER_V2_APP_KEY,
                  platform: social.name.toLocaleLowerCase(),
                })}
            </Card>
          </div>
        ))}
      </Container>
    </Grid>
  );
}

export default React.memo(Social);
