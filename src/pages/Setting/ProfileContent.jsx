import { Box, Grid, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import uploadIcon from 'assets/icons/upload.png'
import defaultProfile from 'assets/images/defaultProfile.png'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { commonStyles } from 'styles'
import { ApiCall, readFile } from 'utils'
import { Controls as common } from '../../components/common'

export const ProfileContent = () => {
  const User = useSelector((state) => state?.dashboard?.currentUser ?? [])
  const [userProfileData, setUserProfileData] = useState({})
  const [uploadFile, setUploadFile] = useState()

  const classes = commonStyles()
  const handleUploadPhoto = (event) => {
    const file = event.target.files?.[0]

    if (!file) return
    readFile(file, (uploadedImage) => {
      setUploadFile({ profile_pic: uploadedImage, filePayload: file })
    })
  }

  useEffect(() => {
    console.log(User?.user?.email)
    setUploadFile({ profile_pic: User?.profile_pic })
    setUserProfileData(() => ({
      fullName: User?.user?.first_name ?? '' + User?.user?.last_name ?? '',
      email: User?.user?.email
    }))
  }, [])
  const updateProfileMutation = useMutation({
    mutationFn: async (formData) => {
      const profileUpdated = await ApiCall(`profile/${User?.user?.id}/`, null, 'PATCH', formData)

      return profileUpdated
    },
    onSuccess: () => {
      setUploadFile({})
      Toast(`Profile Updated Successfully`)
    },
    onError: (error) => {
      console.log('error', error)
    },
    mutationKey: 'profile'
  })

  const updateProfileSubmit = async (values, uploadFile) => {
    const combinedFormData = new FormData()
    const payload = {
      ...values
    }

    if (uploadFile?.filePayload) {
      combinedFormData.append('file', uploadFile.filePayload)
      combinedFormData.append('data', JSON.stringify(payload))
    } else {
      combinedFormData.append('data', JSON.stringify(payload))
    }

    updateProfileMutation.mutate(uploadFile?.filePayload ? combinedFormData : { data: JSON.stringify(payload) })
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" align="left">
        Photo
      </Typography>
      <Grid container display={'flex'} alignItems="center">
        <Grid item md={2}>
          <common.Img src={uploadFile?.profile_pic ?? defaultProfile} className={classes.settingsProfileImage} />
        </Grid>
        <Grid item md={3}>
          <common.FileUploadButton
            handleUploadPhoto={handleUploadPhoto}
            label={'Upload Photo'}
            accept="image/*"
            size="large"
            startIcon={<common.Img src={uploadIcon} />}
          />
        </Grid>
      </Grid>
      <common.Form onSubmit={updateProfileSubmit} submitLabel="Update" defaultValues={{ ...userProfileData }}>
        {({ errors, control, getValues }) => (
          <>
            {console.log(getValues(), 'getValues')}
            <common.ControlledInput name="fullName" placeholder="Full name" control={control} errors={errors} />
            <common.ControlledInput name="email" placeholder="Email" type="email" control={control} errors={errors} />
          </>
        )}
      </common.Form>
    </Box>
  )
}
