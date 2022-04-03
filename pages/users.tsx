import React, { useEffect } from 'react'
import UserPosts from '../components/UserPosts'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function users() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    session?.user ? true : router.push('/')
  }, [])
  return (
    <div>
      <UserPosts />
    </div>
  )
}

export default users
