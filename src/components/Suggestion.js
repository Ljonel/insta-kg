import React, { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useGetFollowers from '../hooks/useGetFollowers'
const Suggestion = ({ id, username, image }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const followers = useGetFollowers(id)
  const followUser = () => {
    if (!followers.isFollowed) {
      setDoc(doc(db, 'users', id, 'followers', session.user.uid), {
        username: session.user.username,
        id: session.user.uid,
        image: session.user.image,
      })
    } else {
      deleteDoc(doc(db, 'users', id, 'followers', session.user.uid))
    }
  }
  //EACH USER HAS FOLLOWERS
  return (
    <>
      {followers.isFollowed ? null : (
        <div
          className={
            'mt-3 flex items-center justify-between transition ease-out'
          }
          key={id}
        >
          <div
            className={`relative flex h-full w-full cursor-pointer transition `}
            onClick={() => router.push('profile/' + id)}
          >
            <img className="h-10 w-10 rounded-full " src={image} alt="" />
            <div className="ml-4 flex flex-1 items-center">
              <h2 className="text-sm font-semibold">{username}</h2>
            </div>
          </div>
          <button onClick={followUser} className="text-xs text-blue-400">
            {followers.isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      )}{' '}
    </>
  )
}

export default Suggestion
