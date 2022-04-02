import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import {
  DotsHorizontalIcon,
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  ChatIcon,
  UserGroupIcon,
  BookmarkAltIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(snapshot.docs)
      }
    )
  }, [db])

  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  console.log(comments)
  return (
    <div className="my-7 rounded-sm border bg-white">
      <div className="flex items-center justify-between p-3">
        <img
          src={userImg}
          className="mr-3 h-12 w-12 rounded-full object-contain p-1"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/*IMG  */}
      <img src={img} className="w-full " alt="" />

      {/* BTNS */}
      {session && (
        <div className="flex justify-between px-3 py-2">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkAltIcon className="btn" />
        </div>
      )}
      {/* DESCRIPTION */}
      <p className="truncate p-5">
        <span className="mr-3 font-bold">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 mr-10 h-20 overflow-y-scroll">
          {comments.map((c) => (
            <div key={c.id} className="mb-3 flex items-center space-x-2 ">
              <img
                className="h-8 rounded-full"
                src={c.data().userImage}
                alt=""
              />
              <p className="flex-1 text-sm">
                <span className=" font-bold">{c.data().username}</span>
                {c.data().comment}
              </p>
              <Moment fromNow className="text-sm text-gray-500">
                {c.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Comments */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="btn" />
          <input
            className="flex-1 border-none focus:ring-0 "
            placeholder="Add a comment..."
            value={comment}
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disable={!comment.trim()}
            type="submit"
            onClick={sendComment}
            className="font-semibold text-blue-500"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
