import React, { useEffect, useCallback, useState } from 'react'

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'
import { Router, useRouter } from 'next/router'

function Suggestion({ id, username, image }) {
  const [isFollowed, setIsFollowed] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    return onSnapshot(collection(db, 'users', id, 'followers'), (snapshot) =>
      setFollowers(snapshot.docs)
    )
  }, [])
  useEffect(() => {
    setIsFollowed(
      followers.findIndex((follow) => follow.id === session?.user?.uid) !== -1
    ),
      [followers]
  })
  const followUser = async () => {
    if (!isFollowed) {
      await setDoc(doc(db, 'users', id, 'followers', session.user.uid), {
        username: session.user.username,
        id: session.user.uid,
        image: session.user.image,
      })
    } else {
      await deleteDoc(doc(db, 'users', id, 'followers', session.user.uid))
    }
  }
  //EACH USER HAS FOLLOWERS
  return (
    <>
      {isFollowed ? null : (
        <div className="mt-3 flex items-center justify-between" key={id}>
          <div
            className="relative flex h-full w-full cursor-pointer"
            onClick={() => router.push('profile/' + id)}
          >
            <img className="h-10 w-10 rounded-full " src={image} alt="" />
            <div className="ml-4 flex flex-1 items-center">
              <h2 className="text-sm font-semibold">{username}</h2>
            </div>
          </div>
          <button onClick={followUser} className="text-xs text-blue-400">
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      )}
    </>
  )
}

export default Suggestion
