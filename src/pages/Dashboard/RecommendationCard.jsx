import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import star from '../../assets/icons/star.svg'
import profile from '../../assets/images/profile.jpg'
import { Controls as common } from '../../components/common'
import { channelStyles } from '../Channels/channelStyles'
const data = [
  {
    name: 'Scott Lang',
    action: 'are both interested in',
    purposes: ['Climate Change', 'Quantum Computing', 'Quantum Computing']
  },
  {
    name: 'James Rhodes',
    action: 'share the objective of',
    purposes: ['Hiring / Recruiting']
  },
  {
    name: 'Natasha Romanoff',
    action: 'are both interested in',
    purposes: ['Defense Technology']
  }
]

function RecommendationCard() {
  const currentUser = useSelector((state) => state?.dashboard?.currentUser)
  const isFavorite = (id) => currentUser?.favorites?.some((item) => item.id == id)
  const classes = channelStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.container}>
          <CardContent className="col-start">
            <Typography variant="h6">Events</Typography>
            <Typography variant="body2">This is the content of Card 1.</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.container}>
          <CardContent className="col-start gap-1">
            <Typography variant="h6">Recommendations</Typography>
            {data.map((recommendation) => (
              <Fragment key={recommendation?.name}>
                <Box className="row gap-1">
                  <Avatar src={recommendation?.profile_pic} />
                  <Box className="recommendation-details col-start gap-05">
                    <Box className="row-start gap-05">
                      <Typography variant="author">{recommendation?.user?.first_name + recommendation?.user?.last_name}</Typography>
                      {isFavorite(recommendation?.id) ? (
                        <common.MuiIcon name="StarRateRounded" color="warning.main" onClick={() => addFavorites(recommendation?.id)} />
                      ) : (
                        <common.MuiIcon name="StarBorderRounded" color="primary.lighter" onClick={() => addFavorites(recommendation?.id)} />
                      )}
                    </Box>
                  </Box>
                </Box>
                <Typography align="start" variant="lightSubtitle2">
                  You and {recommendation?.name ?? ''} {recommendation?.action ?? ''}{' '}
                  <Typography sx={{ color: 'primary.main', fontSize: '12px', fontWeight: '600' }} component="span">
                    {recommendation?.purposes.map((purpose, index) => (
                      <span key={index}>
                        {index > 0 && index === recommendation?.purposes?.length - 1 ? (
                          <span style={{ color: 'primary.light' }}> and </span>
                        ) : null}
                        {index > 0 && index < recommendation?.purposes.length - 1 ? ', ' : ''}
                        {purpose ?? ''}
                      </span>
                    ))}
                  </Typography>
                </Typography>
              </Fragment>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export { RecommendationCard }
