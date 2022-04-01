import React from 'react'
import Stories from './Stories'
function Story({ username, img }) {
  return (
    <div className="">
      <img
        className="h-14 w-14 rounded-full border-2 border-red-500 object-contain p-[2px] transition ease-out hover:scale-110"
        src={img}
      />
      <p className="w-14 truncate text-center text-xs "> {username}</p>
    </div>
  )
}

export default Story
