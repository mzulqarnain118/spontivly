import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'
import React from 'react'

export function Checkbox({ register, label, size }) {
  return <FormControlLabel control={<MuiCheckbox {...register} size={size ?? 'large'} />} label={label} />
}
