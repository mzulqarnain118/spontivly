import { Grid } from '@mui/material'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ApiCall, encodeParams, reduceArrayByKeys } from 'utils'
import { Controls as common } from '../../components/common'

function AddMember({ memberPopup, setMemberPopup, selectedChannelId }) {
  const params = useParams()
  const channelId = params?.channelId ?? selectedChannelId

  const [selectedMembers, setSelectedMembers] = useState([])
  const [confirmModal, setConfirmModal] = useState(false)
  const [searchMemberText, setSearchMemberText] = useState('')

  const { data: members } = useQuery({ queryKey: ['isMemberExist'], queryFn: () => isMemberExist() })
  const {
    data: membersList,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    isError
  } = useInfiniteQuery({
    queryKey: ['channels', channelId], // Dynamic query key
    queryFn: ({ pageParam = 1 }) => membersListFunc({ pageParam }),
    getNextPageParam: (lastPage) => lastPage?.next
  })

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
        <Grid item xs={12} sx={{ mt: 5 }}>
          <common.InfiniteQueryWrapper
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
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
                    {/* setConfirmModal(true) */}
                    <common.MuiIcon name="Delete" color="secondary" onClick={() => handleDeleteMember(member?.id)} />
                    <common.Popup
                      openPopup={confirmModal}
                      setPopup={setConfirmModal}
                      width={'sm'}
                      submitBtnLabel="Confirm"
                      handlePopupCancel={() => setConfirmModal(false)}
                      // submitHandler={handleDeleteMember(member?.id)}
                    ></common.Popup>
                  </Grid>
                </Grid>
              ))
            }
          </common.InfiniteQueryWrapper>
        </Grid>
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
