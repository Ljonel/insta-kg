import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'
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

//
function Stories({ registeredUsers }) {
  const { data: session } = useSession()
  // useEffect(() => {
  //   const colRef = collection(db, 'users')
  //   onSnapshot(colRef, (snapshot) => {
  //     const arr = []
  //     snapshot.forEach((s) => {
  //       // if (s.data().email !== session?.user.email) {
  //       arr.push({ ...s.data(), id: s.id })
  //       // }
  //     })
  //     setRegisteredUsers(arr)
  //   })
  // }, [db])

  return (
    <div className="flex flex-col  ">
      <h3 className="flex h-full p-2">Registered Users</h3>
      <div className="flex min-h-[100px] items-center space-x-2 overflow-x-auto rounded-sm border border-gray-200 bg-white pl-2">
        {registeredUsers.map((u) => (
          <Story key={u.id} img={u.image} username={u.username} />
        ))}
      </div>
    </div>
  )
}

export default Stories
