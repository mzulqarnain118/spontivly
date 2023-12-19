import { DialogTitle, Typography, Dialog, DialogContent, DialogActions, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import common from 'components/common'
import React from 'react'
import MuiIcon from './MuiIcon'

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: (theme.spacing = 2),
    position: 'absolute'
  },
  root: {
    minWidth: 0,
    margin: (theme.spacing = 0.5)
  }
}))

export default function Popup({ width, title, subTitle, children, openPopup, setPopup, submitBtnLabel, submitHandler, handleFormClear }) {
  const classes = useStyles()

  return (
    <Dialog fullWidth maxWidth={width ?? 'md'} open={openPopup} classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle>
        <div className="row-between">
          <Typography variant="h5" align="left">
            {title}
          </Typography>
          <MuiIcon
            onClick={() => {
              setPopup(!openPopup)
            }}
            name="Close"
          />
        </div>
        <Typography align="left" sx={{ color: 'customColors.subtitle1' }}>
          {subTitle}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      {submitBtnLabel && (
        <DialogActions>
          {handleFormClear && (
            <Link align="left" onClick={handleFormClear}>
              Clear all
            </Link>
          )}
          <common.MuiButton
            size={'md'}
            onClick={() => {
              submitHandler && submitHandler()
              setPopup(!openPopup)
            }}
            variant="contained"
            label={submitBtnLabel}
          />
        </DialogActions>
      )}
    </Dialog>
  )
}
