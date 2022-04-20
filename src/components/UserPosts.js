import React from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import UserPost from './UserPost'

import useGetUserPosts from '../hooks/useGetUserPosts'
const UserPosts = () => {
  const userPosts = useGetUserPosts()
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Instakilo</title>
        <link rel="icon" href="" />
      </Head>
      <Header />
      <h1 className="mt-5 w-full text-center text-2xl">
        Hi, here are your posts
      </h1>
      <div className="flex min-h-screen w-screen flex-col flex-wrap items-center justify-center overflow-x-hidden md:flex-row ">
        {userPosts.map((x) => (
          <UserPost
            key={x.id}
            id={x.id}
            username={x.username}
            img={x.image}
            caption={x.caption}
          />
        ))}
      </div>
    </div>
  )
}

export default UserPosts
