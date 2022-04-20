import React, { useEffect, useState } from 'react'
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useSession } from 'next-auth/react'

const useGetUserPosts = () => {
  console.log()
  const [users, setUsers] = useState([])
  const { data: session } = useSession()
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setUsers(snapshot.docs)
      }
    )
  }, [db])

  useEffect(() => {
    const colRef = query(collectionGroup(db, 'posts'))
    getDocs(colRef).then((snapshot) => {
      const arr = []
      snapshot.docs.forEach((doc) => {
        if (doc.data().userId === session?.user.uid) {
          arr.push({ ...doc.data(), id: doc.id })
        }
      })
      setUserPosts(arr)
    })
  }, [db, users])

  return userPosts
}

export default useGetUserPosts
