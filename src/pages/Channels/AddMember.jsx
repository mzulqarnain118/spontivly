import { Grid } from '@mui/material'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import { ApiCall, encodeParams, reduceArrayByKeys } from 'utils'
import { Controls as common } from '../../components/common'

function AddMember({ memberPopup, setMemberPopup, channelId }) {
  const [selectedMembers, setSelectedMembers] = useState([])
  const [searchMemberText, setSearchMemberText] = useState('')

  const { data: members } = useQuery(['isMemberExist'], () => isMemberExist())
  const {
    data: membersList,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(
    ['channels', channelId], // Dynamic query key
    ({ pageParam = 1 }) => membersListFunc({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage?.next
    }
  )

  const postMember = async () => {
    const memberIds = reduceArrayByKeys(selectedMembers, ['id'], 'user')

    const payload = {
      channel: channelId,
      member: memberIds
    }
    const addedMember = await ApiCall('channels/members/', null, 'POST', payload)

    if (addedMember) {
      Toast('Members Added Successfully.')
      setSelectedMembers([])
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
  const handleDeleteMember = async (memberId) => {
    const apiUrl = `channels/members/${channelId}/${memberId}`
    const memberDeleted = await ApiCall(apiUrl, null, 'DELETE')

    if (memberDeleted) {
      Toast('Members Removed from Channel Successfully.')
      refetch()
    }
  }

  return (
    <common.Popup
      openPopup={memberPopup}
      setPopup={setMemberPopup}
      width={'sm'}
      title={'Manage Members'}
      submitBtnLabel="Send Invite"
      subTitle={'Invite members to your Directory.'}
      submitHandler={postMember}
    >
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
      <Grid item xs={12} sx={{ mt: 5 }}>
        <common.InfiniteQueryWrapper
          status={status}
          data={membersList}
          error={error}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isFetching={isFetching}
        >
          {(membersList) =>
            membersList?.[0]?.members?.map((member) => (
              <Grid container key={member?.id} item justifyContent="space-between" alignItems="center">
                <Grid item xs={10.8}>
                  <common.Input disabled value={member?.first_name + ' ' + member?.last_name} />
                </Grid>
                <Grid item xs={1}>
                  <common.MuiIcon name="Delete" color="secondary" onClick={() => handleDeleteMember(member?.id)} />
                </Grid>
              </Grid>
            ))
          }
        </common.InfiniteQueryWrapper>
      </Grid>
    </common.Popup>
  )
}

export { AddMember }
