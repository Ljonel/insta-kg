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

function Suggestion({ id, username, image }) {
  const [followers, setFollowers] = useState([])
  const [isFollowed, setIsFollowed] = useState(false)

  const { data: session } = useSession()

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
      {/* {isFollowed ? null : ( */}
      <div className="mt-3 flex items-center justify-between" key={id}>
        <img className="h-10 w-10 rounded-full " src={image} alt="" />
        <div className="ml-4 flex-1">
          <h2 className="text-sm font-semibold">{username}</h2>
        </div>
        <button onClick={followUser} className="text-xs text-blue-400">
          {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
      {/* )} */}
    </>
  )
}

export default Suggestion
