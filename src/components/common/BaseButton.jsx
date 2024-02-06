import React from 'react'
import { commonStyles } from 'styles'

export function BaseButton({ label }) {
  const classes = commonStyles()

  return <sup className={`row-center ${classes.base}`}>{label}</sup>
}
