import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'
import Story from './Story'

function Stories() {
  const [suggestions, setSuggestions] = useState([])

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
      {suggestions.map((p) => (
        <Story key={p.id} username={p.username} img={p.avatar} />
      ))}
    </div>
  )
}

export default Stories
