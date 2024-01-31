import { FormControl, FormHelperText } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Controls as common } from '../../components/common'
import { capitalizeFirstLetter } from '../../utils'

interface ValidationRules {
  required: boolean
  minLength?: {
    value: number
    message: string
  }
  maxLength?: {
    value: number
    message: string
  }
  pattern?: {
    value: RegExp
    message: string
  }
  validate?: {
    value: any
    message: string
  }
  custom?: {
    value: any
    message: string
  }
  [key: string]: any
}

const ControlledInput = ({ component, name, control, errors, validation = {}, ...inputProps }: any) => {
  const { required, maxLength, minLength, pattern, validate, customRule, customRuleMessage, ...customRules }: ValidationRules = validation

  const rules = {
    required: required || true,
    ...(minLength && { minLength: { value: minLength || 2, message: customRules.maxLength || 'Too short.' } }),
    ...(maxLength && { maxLength: { value: maxLength || 20, message: customRules.maxLength || 'Cannot exceed 20 characters.' } }),
    ...(pattern && { pattern: { value: pattern, message: customRules.pattern || 'Invalid pattern' } }),
    ...(validate && { validate: { value: validate, message: customRules.validate || 'Custom validation failed' } }),
    ...(customRule && { custom: { value: customRule, message: customRuleMessage || 'Custom rule failed' } }),
    ...customRules
  }

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field }) => {
        if (component) {
          // If a custom component is provided
          return (
            <FormControl>
              {React.cloneElement(component, { ...field, ...inputProps })}
              {Boolean(errors?.[name]) && (
                <FormHelperText sx={{ color: 'error.main' }}>{`${capitalizeFirstLetter(
                  errors?.[name]?.ref?.name
                )} is required`}</FormHelperText>
              )}
            </FormControl>
          )
        }

        // Default to common.Input if no custom component is provided
        return <common.Input {...field} error={errors?.[name]} {...inputProps} />
      }}
    />
  )
}

export { ControlledInput }
