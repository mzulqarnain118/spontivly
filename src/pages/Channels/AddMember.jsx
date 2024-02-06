import { Grid } from '@mui/material'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { Toast } from '../../components/common/Toast/Toast'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AL, ApiCall, encodeParams, reduceArrayByKeys } from '../../utils'
import { Controls as common } from '../../components/common'

function AddMember({ popups, setPopups, managePopups, addMemberChannelId }) {
  const { isModerator, userId } = useSelector((state) => state?.dashboard)
  const [searchMemberText, setSearchMemberText] = useState('')
  const [removeMemberId, setRemoveMemberId] = useState('')
  const membersListFunc = async ({ pageParam = 1 }) => {
    const queryParams = {
      page: pageParam
    }
    const encodedParams = encodeParams(queryParams)
    const apiUrl = `channels/${addMemberChannelId}?${encodedParams}`
    const membersList = await ApiCall(apiUrl)

    return membersList
  }
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
    queryKey: ['membersList'], // Dynamic query key
    queryFn: membersListFunc,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.next,
    enabled: !!addMemberChannelId
  })

  const postMember = async (values) => {
    const memberIds = reduceArrayByKeys(values?.members, ['id'], 'user')
    const payload = {
      channel: addMemberChannelId,
      member: memberIds
    }
    const addedMember = await ApiCall('channels/members/', null, 'POST', payload)

    if (addedMember) {
      Toast('Members Added Successfully.')
      refetch()
      managePopups('member')
    }
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

  const handleDeleteMember = async () => {
    const apiUrl = `channels/members/${addMemberChannelId}/${removeMemberId}`
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
                      <common.MuiIcon
                        name="Delete"
                        color="secondary"
                        onClick={() => {
                          managePopups('removeMember')
                          setRemoveMemberId(member?.id)
                        }}
                      />
                    )}
                    {popups.removeMember && (
                      <common.Popup
                        openPopup={popups.removeMember}
                        popupName="removeMember"
                        setPopups={setPopups}
                        width={'sm'}
                        submitBtnLabel="Confirm"
                        submitHandler={handleDeleteMember}
                      />
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
                    addNewOption={false}
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
