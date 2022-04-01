import React from 'react'
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

function Post({ id, username, userImg, img, caption }) {
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
      <div className="flex justify-between px-3 py-2">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkAltIcon className="btn" />
      </div>

      {/* DESCRIPTION */}
      <p className="truncate p-5">
        <span className="mr-3 font-bold">{username}</span>
        {caption}
      </p>

      {/* Comments */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="btn" />
        <input
          className="flex-1 border-none focus:ring-0 "
          placeholder="Add a comment..."
          type="text"
        />
        <button className="font-semibold text-blue-500">Post</button>
      </form>
    </div>
  )
}

export default Post
