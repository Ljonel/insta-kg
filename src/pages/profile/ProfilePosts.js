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
import { db } from '../../../firebase'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { BiCommentDetail } from 'react-icons/bi'

function ProfilePosts({ id, image }) {
  const [likes, setLikes] = useState()
  const [comments, setComments] = useState()

  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    )
  }, [])
  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) =>
      setComments(snapshot.docs)
    )
  }, [])
  return (
    <div
      key={id}
      className="relative mx-1 my-1 h-[300px] w-[300px] min-w-[300px] border bg-red-200 "
    >
      <img src={image} className="h-full w-full overflow-hidden object-cover" />
      <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center space-x-9 bg-[rgba(0,0,0,0.5)] text-2xl text-white opacity-0  transition-all ease-out hover:opacity-100">
        <p className="flex w-14 items-center justify-evenly ">
          <BsFillSuitHeartFill />
          {likes?.length}
        </p>
        <p className="flex w-14 items-center justify-evenly  ">
          <BiCommentDetail />
          {comments?.length}
        </p>
      </div>
    </div>
  )
}

export default ProfilePosts
