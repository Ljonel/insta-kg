import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db, storage } from '../firebase'

function users() {
  const [users, setUsers] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setUsers(snapshot.docs)
      }
    )
  }, [db])

  const [userPosts, setUserPosts] = useState([])

  useEffect(async () => {
    const que = query(collectionGroup(db, 'posts'))
    const querySnapshot = await getDocs(que)

    querySnapshot.forEach((d) => {
      if (d.data().userId === session?.user.uid) {
        onSnapshot(doc(db, 'posts', d.id), (snapshot) =>
          setUserPosts((prev) => [...prev, snapshot.data()])
        )
      }
    })
  }, [users, db])

  //   console.log(userPosts)
  return (
    <>
      <Header />
      <h1>User posts</h1>
      {console.log(userPosts)}
      {userPosts.map((x) => (
        <div>
          <p>{x.username}</p>
          <p>{x.caption}</p>
        </div>
      ))}
    </>
  )
}

export default users
