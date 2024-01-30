import { DialogTitle, Box, Typography, Dialog, DialogContent, DialogActions, Link } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Controls as common } from '.'
import { MuiIcon } from './MuiIcon'

const useStyles = makeStyles((theme: any) => ({
  dialogWrapper: {
    padding: (theme.spacing = 2),
    position: 'absolute'
  },
  root: {
    minWidth: 0,
    margin: (theme.spacing = 0.5)
  }
}))

export function Popup({
  width,
  title,
  setPopups,
  subTitle,
  children,
  openPopup,
  setPopup,
  submitBtnLabel,
  cancelBtnLabel,
  submitHandler,
  handlePopupCancel,
  popupName,
  onClose
}: any) {
  const classes = useStyles()

  return (
    <Box sx={{ position: 'relative' }}>
      <Dialog fullWidth maxWidth={width ?? 'md'} open={openPopup} classes={{ paper: classes.dialogWrapper }}>
        <DialogTitle>
          {submitBtnLabel === 'Confirm' ? (
            <Typography variant="h5">{title ?? 'Are you sure?'}</Typography>
          ) : (
            <>
              <div className="row-between">
                <Typography variant="h5" align="left">
                  {title}
                </Typography>
                <MuiIcon
                  onClick={() => {
                    setPopup && setPopup(!openPopup)
                    onClose && onClose()
                    setPopups && popupName && setPopups((prev) => ({ ...prev, [popupName]: false }))
                  }}
                  name="Close"
                />
              </div>
              <Typography align="left" sx={{ color: 'customColors.subtitle1' }}>
                {subTitle}
              </Typography>
            </>
          )}
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {children}
        </DialogContent>
        {submitBtnLabel && (
          <DialogActions className='row-between'>
            {cancelBtnLabel || submitBtnLabel === 'Confirm'  && (
              <common.MuiButton
                className="child"
                type="button"
                size={'large'}
                onClick={() => {
                  handlePopupCancel && handlePopupCancel()
                  setPopup && setPopup(!openPopup)
                  setPopups && popupName && setPopups((prev) => ({ ...prev, [popupName]: false }))
                }}
                variant='outlined'
                label={cancelBtnLabel ?? 'Cancel'}
              />
            )}
            <common.MuiButton
              className="child"
              size={submitBtnLabel === 'Confirm' ? 'large' : 'md'}
              onClick={() => {
                submitHandler && submitHandler()
                setPopup && setPopup(!openPopup)
                setPopups && popupName && setPopups((prev) => ({ ...prev, [popupName]: false }))
              }}
              variant={submitBtnLabel === 'Confirm' ? 'outlined' : 'contained'}
              label={submitBtnLabel}
            />
          </DialogActions>
        )}
      </Dialog>
    </Box>
  )
}
