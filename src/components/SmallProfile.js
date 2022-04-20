import React from 'react'
import { signOut, useSession } from 'next-auth/react'
const SmallProfile = () => {
  const { data: session } = useSession()

  return (
    <div className="mt-4 flex items-center justify-between px-5 xl:mt-14 xl:ml-10 xl:p-0 ">
      <img
        className="h-16 w-16 rounded-full border p-[2px]"
        src={session.user.image}
        alt=""
      />

      <div className="mx-4 flex-1">
        <h2 className="font-bold">{session?.user.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instakilo</h3>
      </div>

      <button onClick={signOut} className="text-sm font-semibold text-blue-400">
        Sign out
      </button>
    </div>
  )
}

export default SmallProfile
