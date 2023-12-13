import React from "react";
import { DialogActions } from "@mui/material";
import { useForm } from "react-hook-form";
import common from "components/common";

export default function Form({ onSubmit, children,submitLabel }) {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({ ...formProps })}
      {submitLabel === "Save" ? (
        <DialogActions>
          <common.MuiButton label={"Cancel"} />
          <common.MuiButton
            variant="contained"
            type="submit"
            label={submitLabel}
          />
        </DialogActions>
      ) : (
        <common.MuiButton
          variant="contained"
          type="submit"
          label={submitLabel}
        />
      )}
    </form>
  );
}
