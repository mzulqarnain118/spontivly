import { Grid } from '@mui/material'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Toast } from 'components/common/Toast/Toast'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ApiCall, encodeParams, reduceArrayByKeys } from 'utils'
import { Controls as common } from '../../components/common'

function AddMember({ popups, setPopups,managePopups, addMemberChannelId }) {
  const { isModerator, userId } = useSelector((state) => state?.dashboard)
  const params = useParams()
  const channelId = addMemberChannelId ?? params?.channelId

  const [selectedMembers, setSelectedMembers] = useState([])
  const [searchMemberText, setSearchMemberText] = useState('')

  const { data: members } = useQuery({ queryKey: ['isMemberExist'], queryFn: () => isMemberExist() })
  const {
    data: membersList,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
      managePopups('member')
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
        openPopup={popups.member}
        popupName="member"
        setPopups={setPopups}
        width={'sm'}
        title={'Add Members'}
        subTitle={'Add members from Directory to your Channel or invite them from outside the directory.'}
      >
        <Grid item xs={12} sx={{ mt: 5 }}>
          <common.InfiniteQueryWrapper
            isSuccess={isSuccess}
            isError={isError}
            data={membersList}
            error={error}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          >
            {(membersList) =>
              membersList?.[0]?.members?.map((member) => (
                <Grid container key={member?.id} item justifyContent="space-between" alignItems="center">
                  <Grid item xs={10.8}>
                    <common.Input disabled value={member?.first_name + ' ' + member?.last_name} />
                  </Grid>
                  <Grid item xs={1}>
                    {member?.id !== userId && isModerator && (
                      <common.MuiIcon name="Delete" color="secondary" onClick={managePopups('removeMember')} />
                    )}
                    {popups.removeMember && (
                      <common.Popup
                        openPopup={popups.removeMember}
                        popupName="removeMember"
                        setPopups={setPopups}
                        width={'sm'}
                        submitBtnLabel="Confirm"
                        submitHandler={() => handleDeleteMember(member?.id)}
                      ></common.Popup>
                    )}
                  </Grid>
                </Grid>
              ))
            }
          </common.InfiniteQueryWrapper>
        </Grid>
        <common.Form onSubmit={postMember} submitLabel="Send Invite">
          {({ errors, control }) => (
            <>
              <common.ControlledInput
                name="members"
                control={control}
                errors={errors}
                component={
                  <common.Autocomplete
                    placeholder="Members"
                    variant="outlined"
                    value={selectedMembers}
                    onChange={handleMemberChange}
                    options={members ?? []}
                    inputValue={searchMemberText}
                    setInputValue={setSearchMemberText}
                  />
                }
              />
            </>
          )}
        </common.Form>
      </common.Popup>
    </>
  )
}

export { AddMember }
