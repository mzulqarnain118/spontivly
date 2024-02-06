import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, ClassNameMap } from '@mui/material'
import React, { useCallback } from 'react'
import { commonStyles } from '../../styles/commonStyles'

export function Select(
  {
    name,
    className,
    label,
    disabled,
    required,
    value,
    error = null,
    valueUpdater,
    defaultValue,
    multiple,
    register,
    children,
    listUpdater,
    customHandleChange,
    options,
    ...other
  }: any,
  props: any
) {
  const classes: ClassNameMap<any> = commonStyles()
  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target

      if (listUpdater) {
        listUpdater((prevFormData: any) => ({
          ...prevFormData,
          [name]: value
        }))
      } else if (valueUpdater) {
        valueUpdater(value)
      }
    },
    [listUpdater, valueUpdater]
  )

  return (
    <FormControl fullWidth variant="outlined" {...(error && { error: true })}>
      {label && <InputLabel>{`${label}${props.required ? ` *` : ``}`}</InputLabel>}
      <MuiSelect
        value={value ?? ''}
        label={label && `${label}${props.required ? `*` : ``}`}
        name={name}
        onChange={customHandleChange ?? handleChange}
        className={className ?? classes.inputContainer}
        fullWidth
        {...register}
        disabled={disabled}
        multiple={multiple}
        required={required}
        error={Boolean(error)} // Use Boolean() to convert the error prop to a boolean
        displayEmpty
        {...other}
      >
        {defaultValue && (
          <MenuItem value="">
            <em>{defaultValue}</em>
          </MenuItem>
        )}
        {children}
        {options?.map((item: any) => (
          <MenuItem key={item?.id} value={item?.id}>
            {item?.title ?? item?.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {Boolean(error) && <FormHelperText sx={{ color: 'error.main' }}>{`${defaultValue} is required`}</FormHelperText>}
    </FormControl>
  )
}
