import React, { useEffect, useState } from 'react'
import Stories from './Stories'
import Posts from './Posts'
import SmallProfile from './SmallProfile'
import Suggestions from './Suggestions'
import { useSession } from 'next-auth/react'
import { db, storage } from '../firebase'

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  onSnapshot,
  getDoc,
} from 'firebase/firestore'
function Section({ searchInput }) {
  const { data: session } = useSession()
  const [registeredUsers, setRegisteredUsers] = useState([])

  useEffect(() => {
    const colRef = collection(db, 'users')
    onSnapshot(colRef, (snapshot) => {
      const arr = []
      snapshot.forEach((s) => {
        // if (s.data().email !== session?.user.email) {
        arr.push({ ...s.data(), id: s.id })
        // }
      })
      setRegisteredUsers(arr)
    })
  }, [db])

  return (
    <main
      className={` mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${
        !session && '!max-w-3xl !grid-cols-1'
      }`}
    >
      <section className="col-span-2">
        {/* Stories and posts */}
        <Stories registeredUsers={registeredUsers} />
        {session ? (
          <section className="order-[-1] m-0 flex w-full items-center   xl:hidden ">
            <div className="top-10 w-full xl:fixed">
              <SmallProfile />
              <Suggestions registeredUsers={registeredUsers} />
            </div>
          </section>
        ) : null}
        <Posts searchInput={searchInput} />
      </section>

      {session ? (
        // <section className="hidden md:col-span-1 xl:inline-grid">
        <section className="order-[-1] hidden md:order-1 marker:md:col-span-1 xl:inline-grid">
          <div className="top-10 xl:fixed">
            <SmallProfile />
            <Suggestions registeredUsers={registeredUsers} />
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </main>
  )
}

export default Section
