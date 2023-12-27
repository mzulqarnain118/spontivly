import { Chip, Container, Avatar } from '@mui/material'
import React from 'react'
import { Controls as common } from '.'
import { commonStyles } from '../../styles/commonStyles'

interface ChipContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onDelete?: () => void
  chips?: any[]
}

const ChipContainer: React.FC<ChipContainerProps> = ({ chips, onDelete, onClick }) => {
  const classes: any = commonStyles()

  return (
    <Container className={classes.chipContainer}>
      {chips?.map((data) => (
        <Chip
          key={data?.id}
          avatar={<Avatar src={data?.file} />}
          label={data?.title}
          size="medium"
          onDelete={onDelete}
          deleteIcon={<common.MuiIcon name="Clear" />}
          onClick={onClick}
          className={classes.chip}
        />
      ))}
    </Container>
  )
}

export { ChipContainer }
