import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

// const posts = [
//   {
//     id: '1',
//     username: 'asd',
//     userImg: 'https://bit.ly/3LuYuRJ',
//     img: 'https://bit.ly/3LuYuRJ',
//     caption: 'ESSA BYQ',
//   },
//   {
//     id: '2',
//     username: 'asd',
//     userImg: 'https://bit.ly/3LuYuRJ',
//     img: 'https://bit.ly/3LuYuRJ',
//     caption: 'ESSA BYQ',
//   },
// ]

function Posts({ searchInput }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs)
      }
    )
  }, [db])

  const postsFiltered = posts.filter(
    (p) =>
      p.data().username.includes(searchInput) ||
      p.data().caption.includes(searchInput)
  )

  return (
    <div>
      {postsFiltered.map((p) => (
        <Post
          key={p.id}
          id={p.id}
          username={p.data().username}
          userImg={p.data().profileImg}
          img={p.data().image}
          caption={p.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
