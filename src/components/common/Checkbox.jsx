import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
import React from 'react'

export function Checkbox(props) {
  const { name, label, value, onChange, disabled, size, key } = props

  return (
    <FormControlLabel
      key={key}
      control={<MuiCheckbox size={size} name={name} checked={value} disabled={disabled ? disabled : false} onChange={onChange} />}
      label={label}
    />
  )
}