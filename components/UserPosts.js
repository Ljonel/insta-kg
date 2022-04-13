import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import Head from 'next/head'
import UserPost from './UserPost'
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
import { db, storage } from '../firebase'

function UserPosts() {
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
