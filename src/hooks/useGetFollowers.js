import React, { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useSession } from 'next-auth/react'

const useGetFollowers = (id) => {
  const [followersModal, setFollowersModal] = useState({
    followers: [],
    isFollowed: false,
  })
  const { data: session } = useSession()

  useEffect(() => {
    return onSnapshot(collection(db, 'users', id, 'followers'), (snapshot) =>
      setFollowersModal((prev) => ({ ...prev, followers: snapshot.docs }))
    )
  }, [db])

  useEffect(() => {
    const query =
      followersModal.followers.findIndex(
        (follow) => follow.id === session?.user?.uid
      ) !== -1
    setFollowersModal((prev) => ({ ...prev, isFollowed: query }))
  }, [followersModal.followers])

  return followersModal
}
export default useGetFollowers
