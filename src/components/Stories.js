import React from 'react'
import Story from './Story'
const Stories = ({ registeredUsers }) => {
  return (
    <div className="flex flex-col  ">
      <h3 className="flex h-full p-2">Registered Users</h3>
      <div className="flex min-h-[100px] items-center space-x-2 overflow-x-auto rounded-sm border border-gray-200 bg-white pl-2">
        {registeredUsers.map((u) => (
          <Story key={u.id} id={u.id} img={u.image} username={u.username} />
        ))}
      </div>
    </div>
  )
}

export default Stories
