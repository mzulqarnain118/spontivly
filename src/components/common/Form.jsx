import { DialogActions } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Controls as common } from '../../components/common'

export function Form({ onSubmit, children, submitLabel }) {
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful }
  } = useForm()

  useEffect(() => {
    if (isSubmitSuccessful) {
      // Reset the form with the defaultValues
      reset()
    }
  }, [isSubmitSuccessful, reset])

  const formProps = {
    register,
    unregister,
    handleSubmit,
    control,
    setValue,
    errors,
    getValues, 
    reset
  }

  return (
    <form className="col gap-1" onSubmit={handleSubmit(onSubmit)}>
      {children({ ...formProps })}
      {submitLabel === 'Save' ? (
        <DialogActions>
          <common.MuiButton label={'Cancel'} />
          <common.MuiButton variant="contained" type="submit" label={submitLabel} />
        </DialogActions>
      ) : (
        <common.MuiButton size="md" variant="contained" type="submit" label={submitLabel} />
      )}
    </form>
  )
}

// Exporting all the props from useForm
export const useCustomForm = () => {
  const formProps = useForm()

  return { ...formProps }
}
