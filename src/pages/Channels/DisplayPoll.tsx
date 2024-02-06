import { Card, CardContent, Typography, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import { ApiCall } from '../../utils'
import { channelStyles } from './channelStyles'

interface Choice {
  id: number
  name: string
  chosen_by: number[] // Assuming chosen_by contains user IDs
  count: number
  i_voted: number
}

interface DisplayPollProps {
  choices: Choice[]
  postId: number
  refetch: any
}

const DisplayPoll: React.FC<DisplayPollProps> = ({ choices, postId, refetch }) => {
  const classes = channelStyles()

  const handleCheckboxChange = async (choice: number) => {
    const payload = {
      post: postId,
      choice
    }
    const addedVote = await ApiCall('posts/vote/', null, 'POST', payload)

    if (addedVote) {
      refetch()
    }
  }

  return (
    <Grid item xs={12}>
      <RadioGroup>
        {choices?.map((choice) => (
          <Card key={choice?.id} className={classes.card} sx={{ mt: 3 }}>
            <CardContent className="row-between">
              <FormControlLabel
                value={choice?.id}
                control={<Radio />}
                checked={choice?.i_voted > 0 ? true : false}
                label={choice?.name}
                onChange={() => handleCheckboxChange(choice?.id)}
              />
              <Typography variant="body2">Votes: {choice?.count ?? 0}</Typography>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </Grid>
  )
}

export { DisplayPoll }
