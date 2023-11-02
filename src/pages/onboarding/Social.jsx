import React from 'react'
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { AspectRatio, CardOverflow, Grid } from '@mui/joy';
import linkedin from '../../assets/images/Linkedin.png'
import insta from '../../assets/images/Instagram.png'
import fb from '../../assets/images/Facebook.png'
import twitter from '../../assets/images/twitter.png'

import { Switch } from '@mui/material';
import socialStyles from '../../styles/components/socialStyles';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Social() {
  const classes = socialStyles();
  const theme = useTheme();
  return (
    <>
      <Typography className={classes.heading}> Connect your social</Typography>


      <span className={classes.title}
      >
        This helps us find connections that are relevant to you
      </span>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item>
          <Card
            orientation="horizontal"
            variant="outlined"
            className={classes.card}
            sx={{
             
              [theme.breakpoints.down('md')]: {
                width: '20rem',
              }
            }}
          >
            <img
              src={linkedin}
              className={classes.cardImage}
              loading="lazy"
              alt=""
            />
            <CardContent>
              <Typography className={classes.cardTitle} >LinkedIn</Typography>
              <Typography className={classes.cardLink}>linkedin.com</Typography>
            </CardContent>
            <Switch />
          </Card>
        </Grid>
        <Grid item>
          <Card orientation="horizontal" variant="outlined" 
          className={classes.card}
          sx={{
          
            [theme.breakpoints.down('md')]: {
              width: '20rem',
            }
          }}>

            <img
              src={insta}
              className={classes.cardImage}

              loading="lazy"
              alt=""
            />
            <CardContent>
              <Typography className={classes.cardTitle} >Instagram</Typography>
              <Typography className={classes.cardLink}>instagram.com</Typography>
            </CardContent>
            <Switch />
          </Card>
        </Grid>
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item>
          <Card orientation="horizontal" variant="outlined"
          className={classes.card}

           sx={{
            
            [theme.breakpoints.down('md')]: {
              width: '20rem',
            }
          }}>

            <img
              src={fb}
              className={classes.cardImage}
              loading="lazy"
              alt=""
            />

            <CardContent>
              <Typography className={classes.cardTitle} >Facebook</Typography>
              <Typography className={classes.cardLink}>facebook.com</Typography>
            </CardContent>
            <Switch />
          </Card>
        </Grid>
        <Grid item >
          <Card orientation="horizontal" variant="outlined" 
          className={classes.card}
          
          sx={{
           
            [theme.breakpoints.down('md')]: {
              width: '20rem',
            }
          }}>

            <img
              src={twitter}
              className={classes.cardImage}
              loading="lazy"
              alt=""
            />

            <CardContent>
              <Typography className={classes.cardTitle} >Twitter</Typography>
              <Typography className={classes.cardLink}>twitter.com</Typography>
            </CardContent>
            <Switch />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default React.memo(Social)
