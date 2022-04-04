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
function Section() {
  const { data: session } = useSession()
  // useEffect(() => {
  //   if (session) {
  //     const docRef = doc(db, 'users', session?.user.uid)
  //     if (docRef) {
  //       onSnapshot(docRef, (doc) => {
  //         if (doc.data()) {
  //           console.log('istnieje nie mozna dodac')
  //         } else {
  //           console.log('nie istnieje wiec dodaje')
  //           // addDoc(collection(db, 'users'), {
  //           //   username: session.user.username,
  //           //   email: session.user.email,
  //           //   image: session.user.image,
  //           //   name: session.user.name,
  //           // })
  //         }
  //       })
  //     } else {
  //       return false
  //     }
  //   }
  // }, [db])

  return (
    <main
      className={`mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${
        !session && '!max-w-3xl !grid-cols-1'
      }`}
    >
      <section className="col-span-2">
        {/* Stories and posts */}
        <Stories />
        <Posts />
      </section>

      {session ? (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div className="fixed top-10">
            <SmallProfile />
            <Suggestions />
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </main>
  )
}

export default Section
