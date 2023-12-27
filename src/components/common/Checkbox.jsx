import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
import React from 'react'

export function Checkbox(props) {
  const { name, label, value, onChange, disabled,register, size, key } = props

  return (
    <FormControlLabel
      key={key}
      control={
        <MuiCheckbox
          {...register}
          size={size ?? 'large'}
          name={name}
          checked={value}
          disabled={disabled ? disabled : false}
          onChange={onChange}
        />
      }
      label={label}
    />
  )
}