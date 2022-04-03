import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
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
    console.log(isEdited)
    setIsEdited(!isEdited)
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
        <p className="flex w-full justify-between space-x-2 bg-red-50 pr-3">
          Caption: {caption}{' '}
          <span>
            <AiFillEdit
              onClick={handleEditPost}
              className="btn h-[30px] w-[30px]"
            />
          </span>
        </p>

        <div className="h-full w-full flex-1 overflow-y-scroll bg-white">
          {comments.length > 0 && (
            <div>
              {comments.map((c) => (
                <p
                  key={c.id}
                  className="relative ml-3 mt-3 mb-6 flex h-full flex-1 items-center overflow-hidden text-sm"
                >
                  <span className="mr-2 font-bold">{c.data().username}</span>
                  {c.data().comment}
                  <GrFormClose
                    onClick={() => handleDeleteComment(c.id)}
                    className="absolute right-5 cursor-pointer rounded-full bg-red-500 font-normal transition ease-out hover:scale-125"
                    rounded-full
                  />
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPost
