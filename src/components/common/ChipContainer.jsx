import { Chip, Container } from '@mui/material'
import { Controls as common } from 'components/common'
import React from 'react'

const ChipContainer = ({ chips, onDelete, onClick, classes }) => {
  return (
    <Container className={classes?.chipContainer}>
      {chips?.map((data) => (
        <Chip
          key={data?.id}
          label={data?.title}
          size="medium"
          onDelete={onDelete?.(data)}
          deleteIcon={<common.MuiIcon name="Clear" />}
          onClick={onClick?.(data)}
          className={onDelete ? classes?.selectedChip : classes?.chip}
        />
      ))}
    </Container>
  )
}

export { ChipContainer }
