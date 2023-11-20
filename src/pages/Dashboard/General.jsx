import React from 'react'
import CreatePostCard from '../../components/common/CreatePostCard';
import PostsCard from '../../components/common/PostsCard';

function General() {
    const data = [
        {
          name: "Tony Stark",
          companyName: "Stark Industries",
          title: "Business & Entrepreneurship",
          description: "We are going to teach you how to build a React app that uses the Stark reactor to power the backend. It will be cool.",
        },
        {
          name: "John Doe",
          companyName: "Acme Inc.",
          title: "Software Engineer",
          description: "Experienced software engineer with a passion for coding.",
        },
        {
          name: "Jane Smith",
          companyName: "Tech Solutions",
          title: "Product Manager",
          description: "Product manager specializing in software development.",
        },
        {
          name: "Bob Johnson",
          companyName: "Innovate Corp",
          title: "Designer",
          description: "Creative designer with a knack for user interfaces.",
        },
        {
          name: "Alice Brown",
          companyName: "Startup Co.",
          title: "Marketing Specialist",
          description: "Marketing specialist helping startups grow their brand.",
        },
        {
          name: "Charlie Wilson",
          companyName: "Data Analytics Ltd.",
          title: "Data Scientist",
          description: "Data scientist analyzing data to extract insights.",
        }
      ];
  return (
    <>
      <CreatePostCard />
              {data.map((post, index) => (
                <PostsCard key={index} post={post} />
              ))}
    </>
  )
}

export default General
