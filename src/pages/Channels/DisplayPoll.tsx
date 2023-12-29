import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'
import { channelStyles } from './channelStyles'

interface Choice {
  id: number
  name: string
  chosen_by: number[] // Assuming chosen_by contains user IDs
}

interface DisplayPollProps {
  choices: Choice[]
  description: string
}

const DisplayPoll: React.FC<DisplayPollProps> = ({ choices }) => {
  const classes = channelStyles()

  const handleCheckboxChange = (choiceId: number) => {
    console.log('🚀 ~ file: DisplayPoll.tsx:20 ~ handleCheckboxChange ~ choiceId:', choiceId)

    // Handle checkbox change logic here (e.g., updating the chosen_by array)
  }

  return (
    <RadioGroup className="col-start gap-1">
      {choices.map((choice) => (
        <Card key={choice.id} className={classes.card}>
          <CardContent className="row-between">
            <FormControlLabel value={choice.id} control={<Radio />} label={choice.name} onChange={() => handleCheckboxChange(choice.id)} />
            <Typography variant="body2">Votes: {choice.chosen_by.length}</Typography>
          </CardContent>
        </Card>
      ))}
    </RadioGroup>
  )
}

export { DisplayPoll }
