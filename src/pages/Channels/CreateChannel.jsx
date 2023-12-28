import { Toast } from 'components/common/Toast/Toast'
import { ApiCall } from 'utils'
import { Controls as common } from '../../components/common'

const CreateChannel = ({ setPopup }) => {
  const addChannel = async (values) => {
    try {
      const createdChannel = await ApiCall('channels/', null, 'POST', { ...values })

      if (createdChannel) {
        Toast('Channel Created Successfully')
      }
    } catch (error) {
      console.log('error', error)
    }

    setPopup(false)
  }

  return (
    <common.Form onSubmit={addChannel} submitLabel="Create Channel">
      {({ register }) => (
        <>
          <common.Input register={register('name', { required: true })} placeholder="Channel Name" />
          <common.Input register={register('description', { required: true })} multiline placeholder="Channel Description" />
          <common.Checkbox label="Private Channel" register={register('is_private')} />
        </>
      )}
    </common.Form>
  )
}

export { CreateChannel }
