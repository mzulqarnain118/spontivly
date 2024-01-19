import { Avatar, Box, Card, CardContent, Grid, Typography, Divider } from '@mui/material'
import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { ApiCall, encodeParams } from 'utils'
import { Controls as common } from '../../components/common'
import { channelStyles } from '../Channels/channelStyles'
import { Events } from './Events'

function RecommendationCard({ setRefetchUser }) {
  const currentUser = useSelector((state) => state?.dashboard?.currentUser)
  const isFavorite = (id) => currentUser?.favorites?.some((item) => item.id == id)
  const classes = channelStyles()

  async function fetchRecommendations() {
    const queryParams = {
      sort: 'Recommendation'
    }
    const encodedParams = encodeParams(queryParams)
    const apiUrl = `profile?${encodedParams}`
    const Recommendations = await ApiCall(apiUrl)

    return Recommendations?.results
  }

  const addFavorites = async (id) => {
    try {
      const response = await ApiCall('profile/favorite/', null, 'POST', {
        favorite: id
      })

      if (response) {
        setRefetchUser((old) => !old)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  const { data: recommendations, isLoading } = useQuery('profile/', () => fetchRecommendations())

  return (
    <Grid container spacing={2}>
      <Grid container item>
        <Events />
      </Grid>

      <Grid container item>
        <Card className={classes.container}>
          <CardContent className="col-start gap-1">
            <Typography variant="h6">Recommendations</Typography>
            {!isLoading &&
              recommendations?.slice(0, 3)?.map((recommendation, index) => (
                <Grid container item direction="column" alignItems="flex-start" key={recommendation?.id} wrap="nowrap">
                  <Grid item xs={12} className="row gap-1">
                    <Avatar src={recommendation?.profile_pic} />
                    <Box className="recommendation-details col-start gap-05">
                      <Box className="row-start gap-05">
                        <Typography variant="author">{recommendation?.user?.first_name + ' ' + recommendation?.user?.last_name}</Typography>
                        {isFavorite(recommendation?.id) ? (
                          <common.MuiIcon name="StarRateRounded" color="warning.main" onClick={() => addFavorites(recommendation?.id)} />
                        ) : (
                          <common.MuiIcon
                            name="StarBorderRounded"
                            color="primary.lighter"
                            onClick={() => addFavorites(recommendation?.id)}
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} textAlign="left">
                    {recommendation?.objectives?.length !== 0 && (
                      <Typography variant="lightSubtitle2">
                        You and {recommendation?.user?.first_name ?? ''} share the objective of{' '}
                        <Typography sx={{ color: 'primary.main', fontSize: '12px', fontWeight: '600' }} component="span">
                          {recommendation?.objectives?.map((purpose, index) => (
                            <span key={purpose?.id}>
                              {index > 0 && index === recommendation?.objectives?.length - 1 ? (
                                <span style={{ color: 'primary.light' }}> and </span>
                              ) : null}
                              {index > 0 && index < recommendation?.objectives?.length - 1 ? ', ' : ''}
                              {purpose?.title ?? ''}
                            </span>
                          ))}
                        </Typography>
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} textAlign="left">
                    {recommendation?.interests?.length !== 0 && (
                      <Typography variant="lightSubtitle2">
                        You and {recommendation?.user?.first_name ?? ''} are both interested in{' '}
                        <Typography sx={{ color: 'primary.main', fontSize: '12px', fontWeight: '600' }} component="span">
                          {recommendation?.interests?.map((purpose, index) => (
                            <span key={purpose?.id}>
                              {index > 0 && index === recommendation?.interests?.length - 1 ? (
                                <span style={{ color: 'primary.light' }}> and </span>
                              ) : null}
                              {index > 0 && index < recommendation?.interests?.length - 1 ? ', ' : ''}
                              {purpose?.title ?? ''}
                            </span>
                          ))}
                        </Typography>
                      </Typography>
                    )}
                  </Grid>
                  <div className={` ${index < recommendations.length - 1 ? 'divider' : ''}`}></div>
                </Grid>
              ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export { RecommendationCard }
