import React, { useState } from 'react'
import { ReactMultiEmail } from 'react-multi-email'
import 'react-multi-email/dist/style.css'

const InviteMember = () => {
  const [emails, setEmails] = useState([])
  const [focused, setFocused] = useState(false)

  return (
    <ReactMultiEmail
      placeholder="Input your email"
      emails={emails}
      onChange={(_emails) => {
        setEmails(_emails)
      }}
      autoFocus={true}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      getLabel={(email, index, removeEmail) => {
        return (
          <div data-tag key={email}>
            <div data-tag-item>{email}</div>
            <span data-tag-handle onClick={() => removeEmail(index)}>
              ×
            </span>
          </div>
        )
      }}
    />
  )
}

export { InviteMember }
