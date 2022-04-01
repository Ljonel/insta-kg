import React, { useEffect, useState } from 'react'
import faker from '@faker-js/faker'

function Suggestions() {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setSuggestions(suggestions)
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="font-semibold text-gray-600">See all</button>
      </div>

      {suggestions.map((p) => (
        <div className="mt-3 flex items-center justify-between" key={p.id}>
          <img className="h-10 w-10 rounded-full " src={p.avatar} alt="" />
          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">{p.username}</h2>
            <h3 className="text-xs text-gray-400">Works at {p.company.name}</h3>
          </div>
          <button className="text-xs text-blue-400">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
