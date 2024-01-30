import { Box, Grid, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import uploadIcon from 'assets/icons/upload.png'
import defaultProfile from 'assets/images/defaultProfile.png'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { commonStyles } from 'styles'
import { AL, ApiCall, readFile } from 'utils'
import { Controls as common } from '../../components/common'

export const ProfileContent = ({ refetchUser }) => {
  const User = useSelector((state) => state?.dashboard?.currentUser ?? [])
  const [uploadFile, setUploadFile] = useState()
  const [confirmPopup, setConfirmPopup] = useState()
  const [fullName, setFullName] = useState()

  console.log('🚀 ~ ProfileContent ~ fullName:', fullName)

  const classes = commonStyles()
  const handleUploadPhoto = (event) => {
    const file = event.target.files?.[0]

    if (!file) return
    readFile(file, (uploadedImage) => {
      setUploadFile({ profile_pic: uploadedImage, filePayload: file })
    })
  }

  useEffect(() => {
    if (User) {
      setUploadFile({ profile_pic: User?.profile_pic })
      setFullName(`${User?.user?.first_name} ${User?.user?.last_name}`)
    }
  }, [User, User?.user?.last_name])

  const updateProfileSubmit = async (values) => {
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

    const profileUpdated = await ApiCall(`profile/${User?.user?.id}/`, null, 'PATCH', combinedFormData)

    if (profileUpdated) {
      setUploadFile({})
      Toast(`Profile Updated Successfully`)
      refetchUser()
    }
  }
  const DeleteAccount = () => {
    Toast(`Account Deleted Successfully`)
    localStorage.clear()
    window.location.href = '/auth'
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
      <common.Form
        onSubmit={updateProfileSubmit}
        submitLabel="Update"
        type="actions"
        leftBtnLabel="Delete Account"
        leftBtnHandler={() => setConfirmPopup(true)}
        defaultValues={{
          fullName: fullName ?? `${User?.user?.first_name} ${User?.user?.last_name}`,
          email: User?.user?.email
        }}
      >
        {({ errors, control }) => (
          <>
            <common.ControlledInput name="fullName" placeholder="Full name" control={control} errors={errors} />
            <common.ControlledInput name="email" placeholder="Email" type="email" control={control} errors={errors} disabled={true} />
          </>
        )}
      </common.Form>
      <common.Popup
        openPopup={confirmPopup}
        setPopup={setConfirmPopup}
        width={'sm'}
        submitBtnLabel="Confirm"
        submitHandler={DeleteAccount}
      />
    </Box>
  )
}
