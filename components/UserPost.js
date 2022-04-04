import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { BsFillTrashFill } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import { AiFillEdit } from 'react-icons/ai'
import { HeartIcon } from '@heroicons/react/outline'
function UserPost({ id, username, img, caption }) {
  const [likes, setLikes] = useState([])
  const { data: session } = useSession()
  const [comments, setComments] = useState([])
  const [isEdited, setIsEdited] = useState(false)
  const [editedText, setEditedText] = useState(caption)
  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
      setLikes(snapshot.docs)
    })
  }, [db, id])

  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => {
      setComments(snapshot.docs)
    })
  }, [db, id])

  const handleEditPost = () => {
    setIsEdited(!isEdited)
    const docRef = doc(db, 'posts', id)
    updateDoc(docRef, {
      caption: editedText,
    })
  }
  const handleDeletePost = () => {
    deleteDoc(doc(db, 'posts', id))
  }
  const handleDeleteComment = (i) => {
    deleteDoc(doc(db, 'posts', id, 'comments', i))
  }
  return (
    <div className="relative flex h-[500px] flex-col overflow-hidden rounded-lg border-2 border-gray-500 bg-white p-2 md:w-[400px]">
      <BsFillTrashFill
        onClick={handleDeletePost}
        className="btn absolute right-5 top-5 rounded-full bg-white"
      />
      <img className="h-[60%] w-full" src={img} />
      <div className="h-[40%] w-full flex-row">
        {
          <p className="flex">
            {likes.length === 0 ? '0' : likes.length}{' '}
            <HeartIcon className=" btn cursor-default text-xs hover:scale-100" />{' '}
          </p>
        }
        <div className="flex h-10 w-full items-center justify-between space-x-2  pr-3">
          {isEdited ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="bg-0 border-blue w-full border-b-4 border-t-0 border-l-0 border-r-0 pl-4 transition-all ease-out focus:border-[rgb(239,205,153)] focus:ring-0"
            />
          ) : (
            <p className="pl-4">{caption}</p>
          )}{' '}
          <span>
            <AiFillEdit
              onClick={handleEditPost}
              className="btn h-[30px] w-[30px]"
            />
          </span>
        </div>

        <div className="h-full w-full flex-1 overflow-y-scroll bg-white">
          {comments.length > 0 ? (
            <div>
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="relative ml-3 mt-3 mb-6 flex h-full flex-1 items-center overflow-hidden text-sm"
                >
                  <span className="mr-2 font-bold">{c.data().username}</span>
                  {c.data().comment}
                  <GrFormClose
                    onClick={() => handleDeleteComment(c.id)}
                    className="absolute right-5 cursor-pointer rounded-full bg-red-500 font-normal transition ease-out hover:scale-125"
                  />
                </div>
              ))}
            </div>
          ) : (
            <span>No comments</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPost
