import { Box, Grid } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { Toast } from 'components/common/Toast/Toast'
import React from 'react'
import { useSelector } from 'react-redux'
import { commonStyles } from 'styles'
import { ApiCall } from 'utils'
import { Controls as common } from '../../components/common'

function Bio() {
  const User = useSelector((state) => state?.dashboard?.currentUser ?? [])
  const classes = commonStyles()

  const updateBioMutation = useMutation({
    mutationFn: async (formData) => {
      const updateBio = await ApiCall(`profile/${User?.user?.id}/`, null, 'PATCH', formData)

      return updateBio
    },
    onSuccess: () => {
      Toast(`Profile Updated Successfully`)
    },
    onError: (error) => {
      console.log('error', error)
    },
    mutationKey: 'profile'
  })

  const updateBioSubmit = async (values) => {
    updateBioMutation.mutate(values)
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <common.Form
        onSubmit={updateBioSubmit}
        type="actions"
        leftBtnLabel="View Profile"
        leftBtnHandler={() => alert(1)}
        defaultValues={{
          company_name: User?.company_name ?? '',
          position: User?.position ?? '',
          location: User?.location ?? '',
          position: User?.position ?? '',
          position: User?.position ?? '',
          position: User?.position ?? '',
          position: User?.position ?? '',
          position: User?.position ?? ''
        }}
      >
        {({ errors, control, getValues }) => (
          <Grid>
            <Box className="row-between">
              <common.ControlledInput name="position" placeholder="Job Title" control={control} errors={errors} className="child" />
              <common.ControlledInput name="location" placeholder="Location" control={control} errors={errors} className="child" />
            </Box>
            <common.ControlledInput name="company_name" placeholder="Company Name" control={control} errors={errors} />
          </Grid>
        )}
      </common.Form>
    </Box>
  )
}

export { Bio }
