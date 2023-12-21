import React from 'react'
import { CreatePostCard } from '../../components/common/CreatePostCard'
import { PostsCard } from '../../components/common/PostsCard'

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
  return (
    <>
      <CreatePostCard />
      {data.map((post, index) => (
        <PostsCard key={index} post={post} />
      ))}
    </>
  )
}

export { General }
