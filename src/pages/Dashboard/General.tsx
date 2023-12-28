import React from 'react'
import { useSelector } from 'react-redux'
import { CreatePostCard } from '../Channels/CreatePostCard'
import { PostsCard } from '../Channels/PostsCard'

const data = [
  {
    name: 'Tony Stark',
    companyName: 'Stark Industries',
    title: 'Business & Entrepreneurship',
    description: 'We are going to teach you how to build a React app that uses the Stark reactor to power the backend. It will be cool.'
  },
  {
    name: 'John Doe',
    companyName: 'Acme Inc.',
    title: 'Software Engineer',
    description: 'Experienced software engineer with a passion for coding.'
  }
]

function General() {
  const currentUser = useSelector((state: any) => state?.dashboard?.currentUser)
  const role = currentUser?.user?.groups?.[0]?.name ?? ''

  return (
    <>
      {role === 'Moderator' && <CreatePostCard />}
      {data.map((post, index) => (
        <PostsCard key={index} post={post} />
      ))}
    </>
  )
}

export { General }
