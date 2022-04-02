import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './Story'
import { useSession } from 'next-auth/react'

function Stories() {
  const [suggestions, setSuggestions] = useState([])

  const { data: session } = useSession()
  useEffect(() => {
    const results = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setSuggestions(results)
    console.log(results)
  }, [])
  return (
    <div className="mt-8 flex h-[100px] space-x-2 overflow-x-scroll rounded-sm border border-gray-200 bg-white">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((p) => (
        <Story key={p.id} username={p.username} img={p.avatar} />
      ))}
    </div>
  )
}

export default Stories
