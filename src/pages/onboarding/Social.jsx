import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid, Switch, Container } from "@mui/material";
import socialStyles from '../../styles/components/socialStyles';
import { useTheme } from '@mui/material/styles';
import common from '../../components/common';
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
              <Switch />
            </Card>
          </div>
        ))}
      </Container>
    </Grid>
  );
}

export default React.memo(Social);
