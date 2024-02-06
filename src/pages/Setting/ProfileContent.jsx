import { Box, Grid, Typography, Avatar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import uploadIcon from '../../assets/icons/upload.png'
import { Controls as common } from '../../components/common'
import { Toast } from '../../components/common/Toast/Toast'
import { commonStyles } from '../../styles'
import { ApiCall, readFile } from '../../utils'

export const ProfileContent = ({ refetchUser }) => {
  const User = useSelector((state) => state?.dashboard?.currentUser ?? null)
  const [uploadFile, setUploadFile] = useState()
  const [confirmPopup, setConfirmPopup] = useState()
  const [defaultValues, setDefaultValues] = useState()

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
      setUploadFile({ profile_pic: `${User?.profile_pic}?fileKey=${Math.random()}` })

      setDefaultValues({
        fullName: `${User?.user?.first_name ?? ''} ${User?.user?.last_name ?? ''}`,
        email: User?.user?.email ?? ''
      })
    }
  }, [User])

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
          {/* <common.Img src={uploadFile?.profile_pic ?? defaultProfile} className={classes.settingsProfileImage} /> */}
          <Avatar src={uploadFile?.profile_pic} className={classes.settingsProfileImage} />
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
      {defaultValues && (
        <common.Form
          onSubmit={updateProfileSubmit}
          submitLabel="Update"
          // type="actions"
          // leftBtnLabel="Delete Account"
          // leftBtnHandler={() => setConfirmPopup(true)}
          defaultValues={defaultValues}
          disableReset={true}
        >
          {({ errors, control }) => (
            <>
              <common.ControlledInput name="fullName" placeholder="Full name" control={control} errors={errors} />
              <common.ControlledInput name="email" placeholder="Email" type="email" control={control} errors={errors} disabled={true} />
            </>
          )}
        </common.Form>
      )}
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
