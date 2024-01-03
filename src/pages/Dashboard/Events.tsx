import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import filter from '../../assets/icons/filter.svg'
import fileIcon from '../../assets/icons/u_paperclip.svg'
import { Controls as common } from '../../components/common'
import { channelStyles } from '../Channels/channelStyles'

interface Event {
  id: number
  monthName: string
  day: string
  eventName: string
}

const events: Event[] = [
  { id: 1, monthName: 'October', day: '27', eventName: 'Event 1' },
  { id: 2, monthName: 'October', day: '29', eventName: 'Event 2' },
  { id: 3, monthName: 'November', day: '09', eventName: 'Event 2' }
  // Add more events as needed
]

export const Events: React.FC = () => {
  const classes = channelStyles()

  return (
    <Grid item xs={12}>
      <Card className={classes.container}>
        <CardContent className="col-start gap-1">
          <Typography variant="h6">Events</Typography>
          {/* {events?.map((event: Event) => (
            <div key={event.id} className="col-start">
              <div className="row-end gap-075">
                <div className={`col-center gap-0 ${classes.eventCalender}`}>
                  <Typography variant="h8" color="common.white" className={classes.eventMonthName}>
                    {event.monthName.slice(0, 3)} 
                  </Typography>
                  <Typography variant="h6">{event.day}</Typography>
                </div>
                <Typography color="primary.light" variant="h6">
                  {`${event.monthName} ${event.day}`}
                </Typography>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <common.MuiButton size="large" label="Attending" />
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3}>
                  <common.MuiButton startCustomIcon={filter} />
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3}>
                  <common.MuiButton startCustomIcon={fileIcon} />
                </Grid>
              </Grid>
            </div>
          ))} */}
        </CardContent>
      </Card>
    </Grid>
  )
}