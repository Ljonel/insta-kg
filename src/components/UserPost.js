import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { BsFillTrashFill } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'
import { AiFillEdit } from 'react-icons/ai'
import { HeartIcon } from '@heroicons/react/outline'

const UserPost = ({ id, username, img, caption }) => {
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
    <div className="relative m-4 h-[500px] w-[90%] overflow-hidden rounded-lg border border-gray-500 bg-white shadow-lg sm:w-[400px]">
      <BsFillTrashFill
        onClick={handleDeletePost}
        className="btn absolute right-5 top-5 rounded-full bg-white"
      />
      <div className="h-[50%] w-full items-center ">
        <img className="h-full w-full" src={img} />
      </div>
      <div className="h-[50%] w-full ">
        {
          <p className="flex  border-y pl-4">
            {likes.length === 0 ? '0' : likes.length}{' '}
            <HeartIcon className=" btn cursor-default text-xs hover:scale-100" />{' '}
          </p>
        }
        <div className="flex h-[30%] w-full items-center space-x-2 border-b px-3">
          {isEdited ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="bg-0 border-blue h-full w-full border-b-4 border-t-0 border-l-0 border-r-0 pl-4 transition-all ease-out focus:border-[rgb(239,205,153)] focus:ring-0"
            />
          ) : (
            <p
              className="relative max-h-full w-full overflow-y-auto "
              style={{ wordWrap: 'break-word', whiteSpace: 'initial' }}
            >
              {caption}
            </p>
          )}{' '}
          <span>
            <AiFillEdit
              onClick={handleEditPost}
              className="btn asbolute right-0 top-0 h-[30px] w-[30px]"
            />
          </span>
        </div>

        <div className="h-[50%] w-full flex-1 overflow-y-auto overflow-x-hidden">
          {comments.length > 0 ? (
            <div>
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="relative ml-3 mt-3 mb-6 flex h-full w-full overflow-hidden pt-2 text-sm"
                  style={{ wordWrap: 'break-word', whiteSpace: 'initial' }}
                >
                  <span className="mr-2 font-bold">{c.data().username}</span>
                  <div className="w-[60%]">{c.data().comment}</div>
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
