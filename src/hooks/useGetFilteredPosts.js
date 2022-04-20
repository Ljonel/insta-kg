import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'

const useGetFilteredPosts = (searchInput) => {
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

  return postsFiltered
}

export default useGetFilteredPosts
