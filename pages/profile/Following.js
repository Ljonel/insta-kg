import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase'
function Following({
  id,
  username,
  image,
  setIsFollowingOpen,
  following,
  setFollowing,
}) {
  const { data: session } = useSession()
  const router = useRouter()

  const followingDeleteHandler = async (i) => {
    await deleteDoc(doc(db, 'users', id, 'followers', session?.user.uid))
    await setFollowing(following.filter((f) => f.id !== i))
  }
  return (
    <div key={id} className="my-2 flex h-10 w-full items-center border-b pb-2">
      <div
        className="ml-2 flex h-full w-[80%] cursor-pointer items-center space-x-4"
        onClick={() => {
          router.push('/profile/' + id)
          setIsFollowingOpen(false)
        }}
      >
        <img src={image} className="h-8 w-8 rounded-full" />
        <h3 className="font-bold">{username}</h3>
      </div>
      {session && router.query.profile === session.user.uid ? (
        <button
          className="rounded-lg border border-blue-400 p-1 transition ease-out hover:bg-blue-300"
          onClick={() => followingDeleteHandler(id)}
        >
          Unfollow
        </button>
      ) : null}
    </div>
  )
}

export default Following
