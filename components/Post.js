import React, { useEffect, useRef, useState } from 'react'
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
import { GrFormClose } from 'react-icons/gr'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [isLike, setIsLike] = useState(false)
  const chatRefPicker = useRef(null)

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
    if (comment == '') {
      alert('Comment can not be empty')
      return false
    }
    setComment('')

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
      userId: session.user.uid,
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
  const handleDeleteComment = (i) => {
    console.log(id, i)
    deleteDoc(doc(db, 'posts', id, 'comments', i))
  }
  return (
    <div className=" my-7 w-full rounded-sm border bg-white">
      <div className="flex items-center justify-between p-3">
        <img
          src={userImg}
          className="mr-3 h-12 w-12 rounded-full object-contain p-1"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
      </div>

      {/*IMG  */}
      <div className=" flex h-[500px] w-full justify-center">
        <img src={img} className="" alt="" />
      </div>
      {/* BTNS */}
      {session && (
        <div className="flex justify-between px-3 py-2">
          <div className="flex space-x-4">
            {isLike ? (
              <HeartIconLiked onClick={likePost} className="btn text-red-500" />
            ) : (
              <HeartIcon onClick={likePost} className={`btn overflow-hidden`} />
            )}

            <ChatIcon
              onClick={() => chatRefPicker.current.focus()}
              className="btn"
            />
          </div>
        </div>
      )}

      {/* DESCRIPTION */}
      <p
        className="max-h-[300px] w-full overflow-y-auto   p-5"
        style={{ wordWrap: 'break-word', whiteSpace: 'initial' }}
      >
        <span className="text-xs font-bold">
          {' '}
          {likes.length > 0 && <p>{likes.length} Likes </p>}
        </span>
        <span className="mr-3 font-bold">{username}</span>
        <span>{caption}</span>
      </p>

      {comments.length > 0 && (
        <div className="min-h-20 mt-2 mr-10 flex max-h-40 w-full flex-col items-center overflow-y-auto  overflow-x-hidden ">
          {comments.map((c) => (
            <div
              key={c.id}
              className="min-h-20 relative mb-4 flex w-full items-center space-x-4 px-4  "
              style={{ wordWrap: 'break-word' }}
            >
              <img
                className=" h-8 rounded-full"
                src={c.data().userImage}
                alt=""
              />
              {/* <p
                className=" flex w-full flex-1 text-sm"
                style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
              > */}
              <span className="mr-2 w-32 font-bold">{c.data().username}</span>
              {
                <div className=" h-full w-[55%] overflow-y-auto ">
                  {c.data().comment}
                </div>
              }
              {session?.user.uid === c.data().userId ? (
                <GrFormClose
                  onClick={() => handleDeleteComment(c.id)}
                  className="btn absolute right-2 h-4 w-4 max-w-[10%] items-center rounded-full bg-red-500"
                />
              ) : null}
              <Moment fromNow className="min-w-24 text-xs text-gray-500">
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
            ref={chatRefPicker}
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
