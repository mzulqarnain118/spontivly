import React from 'react'
import { Controller } from 'react-hook-form'
import { Controls as common } from '../../components/common'

const ControlledInput = ({ name, control, errors, ...inputProps }) => (
  <Controller
    name={name}
    rules={{ required: true }}
    control={control}
    render={({ field }) => <common.Input {...field} error={errors?.[name]} {...inputProps} />}
  />
)

export { ControlledInput }
