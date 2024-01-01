import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import { ApiCall } from 'utils'
import { channelStyles } from './channelStyles'

interface Choice {
  id: number
  name: string
  chosen_by: number[] // Assuming chosen_by contains user IDs
  count: number
}

interface DisplayPollProps {
  choices: Choice[]
  postId: number
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
    <RadioGroup className="col-start gap-1">
      {choices?.map((choice) => (
        <Card key={choice?.id} className={classes.card}>
          <CardContent className="row-between">
            <FormControlLabel
              value={choice?.id}
              control={<Radio />}
              label={choice?.name}
              onChange={() => handleCheckboxChange(choice?.id)}
            />
            <Typography variant="body2">Votes: {choice?.count ?? 0}</Typography>
          </CardContent>
        </Card>
      ))}
    </RadioGroup>
  )
}

export { DisplayPoll }
