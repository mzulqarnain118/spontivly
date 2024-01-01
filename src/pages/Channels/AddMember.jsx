import { InviteMember } from 'pages/Dashboard/InviteMember'
import React from 'react'
import { Controls as common } from '../../components/common'

function AddMember({ memberPopup, setMemberPopup }) {
  return (
    <>
      <common.Popup
        openPopup={memberPopup}
        setPopup={setMemberPopup}
        width={'sm'}
        title={'Manage Members'}
        submitBtnLabel="Send Invite"
        subTitle={'Invite members to your Directory.'}
      >
        <InviteMember />
      </common.Popup>
    </>
  )
}

export { AddMember }
