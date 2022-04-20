import React from 'react'
import Post from './Post'
import useGetFilteredPosts from '../hooks/useGetFilteredPosts'
const Posts = ({ searchInput }) => {
  const postsFiltered = useGetFilteredPosts(searchInput)
  return (
    <div>
      {postsFiltered.map((p) => (
        <Post
          key={p.id}
          id={p.id}
          userId={p.data().userId}
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
