import React, { useEffect, useCallback, useState } from 'react'
import faker from '@faker-js/faker'
import { useSession } from 'next-auth/react'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Suggestion from './Suggestion'

const Suggestions = ({ registeredUsers }) => {
  const { data: session } = useSession()
  return (
    <>
      <div className="mt-2 max-h-[300px] overflow-y-auto px-4 xl:mt-4 xl:ml-10 xl:p-0">
        <div className="mb-5 flex justify-between text-sm">
          <h3 className="text-sm font-bold text-gray-400">
            Suggestions for you
          </h3>
        </div>
        {registeredUsers.map((p) =>
          session.user.uid !== p.id ? (
            <Suggestion
              key={p.id}
              id={p.id}
              username={p.username}
              image={p.image}
            />
          ) : null
        )}
      </div>
    </>
  )
}

export default Suggestions
