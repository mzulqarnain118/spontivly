import { Box, Grid,  Typography } from '@mui/material'
import uploadIcon from 'assets/icons/upload.png'
import defaultProfile from 'assets/images/defaultProfile.png'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commonStyles } from 'styles'
import { readFile } from 'utils'
import { Controls as common } from '../../components/common'
import { setPhotoURL } from '../../redux/onBoardingSlice'


export const ProfileContent = () => {
  const dispatch = useDispatch()
  const profilePic = useSelector((state) => state.onBoarding.profilePic)
  const classes = commonStyles()
  const handleUploadPhoto = (event) => {
    const file = event.target.files?.[0]

    // Check if a file is selected
    if (!file) {
      console.error('No file selected')

      return
    }

    readFile(file, (uploadedImage) => {
      dispatch(setPhotoURL({ profilePic: uploadedImage, profilePicPayload: file }))
    })
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" align="left">
        Photo
      </Typography>
      <Grid container display={'flex'} alignItems="center">
        <Grid item md={2}>
          <common.Img src={profilePic ?? defaultProfile} className={classes.settingsProfileImage} />
        </Grid>
        <Grid item md={3}>
          <common.MuiButton
            handleUploadPhoto={handleUploadPhoto}
            label={'Upload Photo'}
            size="large"
            startIcon={<common.Img src={uploadIcon} />}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
