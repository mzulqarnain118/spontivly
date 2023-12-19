import { Grid, Container, Card, CardContent, Typography } from '@mui/material'
import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginSocialFacebook, LoginSocialInstagram, LoginSocialLinkedin, LoginSocialTwitter } from 'reactjs-social-login'
import facebook from '../../assets/images/Facebook.png'
import instagram from '../../assets/images/Instagram.png'
import linkedIn from '../../assets/images/Linkedin.png'
import twitter from '../../assets/images/twitter.png'
import { Controls as common } from '../../components/common'
import { config } from '../../config'
import { setSoicalData } from '../../redux/socialSlice'
import { socialStyles } from '../../styles/components/socialStyles'
const socialData = [
  {
    name: 'LinkedIn',
    image: linkedIn,
    link: 'linkedin.com'
  },
  {
    name: 'Instagram',
    image: instagram,
    link: 'instagram.com'
  },
  {
    name: 'Facebook',
    image: facebook,
    link: 'facebook.com'
  },
  {
    name: 'Twitter',
    image: twitter,
    link: 'twitter.com'
  }
]

function SocialComponent() {
  const classes = socialStyles()
  const dispatch = useDispatch()
  const social = useSelector((state) => state.social)
  const {
    VITE_LINKEDIN_APP_ID,
    VITE_LINKEDIN_APP_SECRET,
    VITE_INSTAGRAM_APP_ID,
    VITE_INSTAGRAM_APP_SECRET,
    VITE_FB_APP_ID,
    VITE_TWITTER_V2_APP_KEY,
    VITE_REDIRECT_URI
  } = config

  const renderSocialLogin = (Component, props) => {
    const platform = props.platform

    return (
      <Component
        {...props}
        redirect_uri={VITE_REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log('data........', data, provider)
          dispatch(
            setSoicalData({
              provider,
              id: provider == 'facebook' ? data.userID : data.access_token
            })
          )
        }}
        onReject={(err) => {
          console.log(err)
        }}
      >
        <common.CustomSwitch checked={social[platform].id === null ? false : true} />
      </Component>
    )
  }

  return (
    <Grid className={classes.container}>
      <common.FormHeading heading="Connect your social" title="This helps us find connections that are relevant to you" />
      <Container className={classes.subContainer}>
        {socialData.map((social, index) => (
          <div key={index}>
            <Card orientation="horizontal" variant="outlined" className={classes.card}>
              <div className="row-center">
                <common.Img src={social.image} className={classes.cardImage} />
                <CardContent>
                  <Typography className={classes.cardTitle}>{social.name}</Typography>
                  <Typography className={classes.cardLink}>{social.link}</Typography>
                </CardContent>
              </div>

              {social.name === 'LinkedIn' &&
                renderSocialLogin(LoginSocialLinkedin, {
                  client_id: VITE_LINKEDIN_APP_ID,
                  client_secret: VITE_LINKEDIN_APP_SECRET,
                  scope: 'profile',
                  platform: social.name.toLocaleLowerCase()
                })}
              {social.name === 'Instagram' &&
                renderSocialLogin(LoginSocialInstagram, {
                  client_id: VITE_INSTAGRAM_APP_ID,
                  client_secret: VITE_INSTAGRAM_APP_SECRET,
                  platform: social.name.toLocaleLowerCase()
                })}
              {social.name === 'Facebook' &&
                renderSocialLogin(LoginSocialFacebook, {
                  appId: VITE_FB_APP_ID,
                  fieldsProfile: 'id,first_name,last_name,middle_name,name,name_format',
                  platform: social.name.toLocaleLowerCase()
                })}
              {social.name === 'Twitter' &&
                renderSocialLogin(LoginSocialTwitter, {
                  client_id: VITE_TWITTER_V2_APP_KEY,
                  // client_secret: VITE_TWITTER_V2_APP_SECRET,
                  platform: social.name.toLocaleLowerCase()
                })}
            </Card>
          </div>
        ))}
      </Container>
    </Grid>
  )
}

export const Social = memo(SocialComponent)
