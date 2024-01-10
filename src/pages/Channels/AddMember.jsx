import { Grid } from '@mui/material'
import { Toast } from 'components/common/Toast/Toast'
import React, {  useState } from 'react'
import { useQuery } from 'react-query'
import { ApiCall, encodeParams, reduceArrayByKeys } from 'utils'
import { Controls as common } from '../../components/common'

function AddMember({ memberPopup, setMemberPopup, channelId }) {
  const [selectedMembers, setSelectedMembers] = useState([])
  const [searchMemberText, setSearchMemberText] = useState('')

  const { data: members } = useQuery(['isMemberExist', searchMemberText], () => isMemberExist())
  const { data: membersList } = useQuery('channels/', () => membersListFunc())

  const postMember = async () => {
    const memberIds = reduceArrayByKeys(selectedMembers, ['id'], 'user')

    const payload = {
      channel: channelId,
      member: memberIds
    }
    const addedMember = await ApiCall('channels/members/', null, 'POST', payload)

    if (addedMember) {
      Toast('Members Added Successfully.')
      refetch()
    }
  }

  const membersListFunc = async () => {
    const apiUrl = `channels/${channelId}`
    const membersList = await ApiCall(apiUrl)

    return membersList
  }
  const isMemberExist = async () => {
    const queryParams = {
      email: searchMemberText
    }
    const encodedIsMemberParams = encodeParams(queryParams)
    const apiUrl = `profile/?${encodedIsMemberParams}`
    const existEmail = await ApiCall(apiUrl)

    return existEmail.results
  }
  const handleMemberChange = async (selectedValues) => {
    setSelectedMembers(selectedValues)
  }
  const handleDeleteMember = (memberId) => {
    console.log('🚀 ~ file: AddMember.jsx:54 ~ handleDeleteMember ~ member:', memberId)
  }

  return (
    <>
      <common.Popup
        openPopup={memberPopup}
        setPopup={setMemberPopup}
        width={'sm'}
        title={'Manage Members'}
        submitBtnLabel="Send Invite"
        subTitle={'Invite members to your Directory.'}
        submitHandler={postMember}
      >
        {/* <Grid item xs={12}>
          {membersList?.members?.map((member) => (
            <Grid container key={member?.id} item justifyContent="space-between" alignItems="center">
              <Grid item xs={10.8}>
                <common.Input disabled value={member?.email} />
              </Grid>
              <Grid item xs={1}>
                <common.MuiIcon name="Delete" color="secondary" onClick={() => handleDeleteMember(member?.id)} />
              </Grid>
            </Grid>
          ))}
        </Grid> */}
        <common.Autocomplete
          placeholder="Members"
          variant="outlined"
          value={selectedMembers}
          onChange={handleMemberChange}
          options={members ?? []}
          inputValue={searchMemberText}
          setInputValue={setSearchMemberText}
          required
        />
      </common.Popup>
    </>
  )
}

export { AddMember }
