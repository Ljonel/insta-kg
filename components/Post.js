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
import { HeartIcon as HeartIconLiked } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [isLike, setIsLike] = useState(false)

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
  }, [db, id])

  useEffect(() => {
    return onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
      setLikes(snapshot.docs)
    )
  }, [])
  useEffect(() => {
    setIsLike(likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
      [likes]
  })
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
  const likePost = async () => {
    if (isLike) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

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
            {isLike ? (
              <HeartIconLiked onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className={`btn overflow-hidden`} />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkAltIcon className="btn" />
        </div>
      )}

      {/* DESCRIPTION */}
      <p className="truncate p-5">
        <span className="text-xs font-bold">
          {' '}
          {likes.length > 0 && <p>{likes.length} Likes </p>}
        </span>
        <span className="mr-3 font-bold">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="ml-10 mr-10 h-20 overflow-y-scroll">
          {comments.map((c) => (
            <div key={c.id} className="mb-3 flex items-center space-x-2 ">
              <img
                className=" h-8 rounded-full"
                src={c.data().userImage}
                alt=""
              />
              <p className="flex-1 text-sm">
                <span className="mr-2  font-bold">{c.data().username}</span>
                {c.data().comment}
              </p>
              <Moment fromNow className="text-xs text-gray-500">
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
            // disable={!comment.trim()}
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
