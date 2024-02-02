import { Box } from '@mui/material'
import React from 'react'
import { Controls as common } from '../../components/common'
import { Toast } from '../../components/common/Toast/Toast'
import { ApiCall } from '../../utils'
import { YupDefaultSchema } from '../../utils/YupDefaultSchema'

function UpdatePassword() {
  const updatePasswordSubmit = async (values) => {
    delete values.confirmPassword
    const updatePassword = await ApiCall(`auth/reset-password`, null, 'POST', values)

    if (updatePassword) {
      Toast(`Password Updated Successfully`)
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <common.Form onSubmit={updatePasswordSubmit} submitLabel="Update" validationsSchema={YupDefaultSchema}>
        {({ errors, control }) => (
          <>
            <common.ControlledInput name="password" type="password" label="Current Password" control={control} errors={errors} />
            <common.ControlledInput name="new_password" label="New Password" type="password" control={control} errors={errors} />
            <common.ControlledInput name="confirmPassword" label="Confirm New Password" type="password" control={control} errors={errors} />
          </>
        )}
      </common.Form>
    </Box>
  )
}

export { UpdatePassword }
