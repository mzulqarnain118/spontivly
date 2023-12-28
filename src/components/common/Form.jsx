import React from "react";
import { DialogActions } from "@mui/material";
import { useForm } from "react-hook-form";
import { Controls as common } from "../../components/common";

export function Form({ onSubmit, children,submitLabel }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const formProps = {
    register,
    handleSubmit,
    control,
    setValue,
    errors,
  };

  return (
    <form className="col gap-1" onSubmit={handleSubmit(onSubmit)}>
      {children({ ...formProps })}
      {submitLabel === 'Save' ? (
        <DialogActions>
          <common.MuiButton label={'Cancel'} />
          <common.MuiButton variant="contained" type="submit" label={submitLabel} />
        </DialogActions>
      ) : (
        <common.MuiButton size='md' variant="contained" type="submit" label={submitLabel} />
      )}
    </form>
  )
}
