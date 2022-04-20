import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'

const WatchedUser = ({ id, username, image }) => {
  const { data: session } = useSession()
  const [watchedUsers, setWatchedUsers] = useState([])
  const [isFollow, setIsFollow] = useState(false)

  useEffect(() => {
    return onSnapshot(collection(db, 'users', id, 'followers'), (snapshot) =>
      setWatchedUsers(snapshot.docs)
    )
  }, [])
  useEffect(() => {
    setIsFollow(
      watchedUsers.findIndex((us) => us.id === session?.user?.uid) !== -1
    ),
      [watchedUsers]
  })

  const handleDeleteFollow = (i) => {
    deleteDoc(doc(db, 'users', i, 'followers', session?.user.uid))
  }
  return (
    <div>
      {isFollow && (
        <div
          key={id}
          className="my-2 flex h-10 w-full items-center border-b pb-2"
        >
          <div className="ml-2 flex h-full w-[80%] items-center space-x-4 ">
            <img src={image} className="h-8 w-8 rounded-full" />
            <h3 className="font-bold">{username}</h3>
          </div>
          <button
            onClick={() => {
              handleDeleteFollow(id)
            }}
          >
            Unfollow
          </button>
        </div>
      )}
    </div>
  )
}

export default WatchedUser
