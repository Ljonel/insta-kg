import React, { useEffect, useCallback, useState } from 'react'
import faker from '@faker-js/faker'
import { useSession } from 'next-auth/react'

function Suggestions({ registeredUsers }) {
  const [suggestions, setSuggestions] = useState([])
  const [users, setUsers] = useState()
  const { data: session } = useSession()

  // users.filter((u) => {
  //   if (session?.user.uid !== u.id) {
  //     arr.push(u)
  //   }
  // })
  // }, [registeredUsers])
  // useEffect(() => {
  //   const suggestions = [...Array(5)].map((_, i) => ({
  //     ...faker.helpers.contextualCard(),
  //     id: i,
  //   }))

  //   setSuggestions(suggestions)
  // }, [])

  return (
    <div className="mt-2 max-h-[300px] overflow-y-auto px-2 xl:mt-4 xl:ml-10 xl:p-0">
      <div className="mb-5 flex justify-between text-sm">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
      </div>

      {registeredUsers.map((p) =>
        session.user.uid !== p.id ? (
          <div className="mt-3 flex items-center justify-between" key={p.id}>
            <img className="h-10 w-10 rounded-full " src={p.image} alt="" />
            <div className="ml-4 flex-1">
              <h2 className="text-sm font-semibold">{p.username}</h2>
            </div>
            <button
              className="text-xs text-blue-400"
              onClick={() => console.log(p.id)}
            >
              Follow
            </button>
          </div>
        ) : (
          <span></span>
        )
      )}
    </div>
  )
}

export default Suggestions
