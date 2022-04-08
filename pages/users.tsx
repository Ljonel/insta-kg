import React, { useEffect } from 'react'
import UserPosts from '../components/UserPosts'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Modal from '../components/Modal'
function users() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    session?.user ? true : router.push('/')
  }, [])

  return (
    <div>
      <UserPosts />
      <Modal />
    </div>
  )
}

export default users
