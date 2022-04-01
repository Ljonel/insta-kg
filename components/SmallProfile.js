import React from 'react'
import { signOut, useSession } from 'next-auth/react'
function SmallProfile() {
  const { data: session } = useSession()
  return (
    <div className="mt-14 ml-10 flex items-center justify-between ">
      <img
        className="h-16 w-16 rounded-full border p-[2px]"
        src="https://bit.ly/3LuYuRJ"
        alt=""
      />

      <div className="mx-4 flex-1">
        <h2 className="font-bold">ASDF</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instakilo</h3>
      </div>

      <button onClick={signOut} className="text-sm font-semibold text-blue-400">
        Sign out
      </button>
    </div>
  )
}

export default SmallProfile
