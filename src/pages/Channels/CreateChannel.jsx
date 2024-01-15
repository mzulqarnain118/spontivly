import { Toast } from 'components/common/Toast/Toast'
import { ApiCall } from 'utils'
import { Controls as common } from '../../components/common'

const CreateChannel = ({ setPopup, setRefetchUser }) => {
  const addChannel = async (values) => {
    try {
      const createdChannel = await ApiCall('channels/', null, 'POST', { ...values })

      if (createdChannel) {
        Toast('Channel Created Successfully')
        setRefetchUser((old) => !old)
      }
    } catch (error) {
      console.log('error', error)
    }

    setPopup(false)
  }

  return (
    <common.Form onSubmit={addChannel} submitLabel="Create Channel">
      {({ register, errors, control }) => (
        <>
          <common.ControlledInput name="name" control={control} errors={errors} placeholder="Channel Name" />
          <common.Input register={register('description', { required: true })} multiline placeholder="Channel Description (Optional)" />
          <common.Checkbox label="Private Channel" register={register('is_private')} />
        </>
      )}
    </common.Form>
  )
}

export { CreateChannel }
