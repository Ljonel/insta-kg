import React from 'react'
import Post from './Post'

const posts = [
  {
    id: '1',
    username: 'asd',
    userImg: 'https://bit.ly/3LuYuRJ',
    img: 'https://bit.ly/3LuYuRJ',
    caption: 'ESSA BYQ',
  },
  {
    id: '2',
    username: 'asd',
    userImg: 'https://bit.ly/3LuYuRJ',
    img: 'https://bit.ly/3LuYuRJ',
    caption: 'ESSA BYQ',
  },
]
function Posts() {
  return (
    <div>
      {posts.map((p) => (
        <Post
          key={p.id}
          id={p.id}
          username={p.username}
          userImg={p.userImg}
          img={p.img}
          caption={p.caption}
        />
      ))}
    </div>
  )
}

export default Posts
