import { Toast } from '../../components/common/Toast/Toast'
import { ApiCall } from '../../utils'
import { Controls as common } from '../../components/common'

const CreateChannel = ({ setPopups, refetchUser, editChannelData = null, setEditChannelData }) => {
  const addChannel = async (values) => {
    try {
      const createdChannel = await ApiCall(
        editChannelData ? `channels/${editChannelData.id}/` : 'channels/',
        null,
        editChannelData ? 'PATCH' : 'POST',
        { ...values }
      )

      if (createdChannel) {
        Toast(`Channel ${editChannelData ? 'Updated' : 'Added'} Successfully`)
        setEditChannelData && setEditChannelData(null)

        setPopups((prev) => ({ ...prev, ['channel']: false }))
        refetchUser()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <common.Form
      onSubmit={addChannel}
      submitLabel={`${editChannelData ? 'Update' : 'Create'} Channel`}
      defaultValues={
        editChannelData && {
          name: editChannelData?.name,
          description: editChannelData?.description ?? '',
          is_private: editChannelData?.is_private ?? false
        }
      }
    >
      {({ register, errors, control, getValues }) => (
        <>
          <common.ControlledInput name="name" control={control} errors={errors} placeholder="Channel Name" validation={{ maxLength: 20 }} />
          <common.Input register={register('description')} multiline placeholder="Channel Description (Optional)" />
          <common.Checkbox
            label="Private Channel"
            register={register('is_private')}
            checked={editChannelData && editChannelData?.is_private}
            disabled={editChannelData && editChannelData?.is_private}
          />
        </>
      )}
    </common.Form>
  )
}

export { CreateChannel }
