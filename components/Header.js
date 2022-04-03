import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
import modalState from '../atoms/modalAtom'

//

const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useRecoilState(modalState)

  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-md ">
      <div className=" flex max-w-6xl justify-between  pl-5 pr-5 lg:mx-auto">
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          className="relative hidden w-24 cursor-pointer lg:inline-grid"
        >
          <h1
            id="insta-logo"
            className=" flex h-full w-full items-center justify-center"
          >
            InstaKilo
          </h1>
        </div>

        <div
          onClick={() => router.push('/')}
          className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Search input */}
        <div className="max-w-xs">
          <div className="relative mt-1 flex rounded-md p-3">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-6 w-6 text-gray-500 " />
            </div>
            <input
              className=" focus:ring-none block w-full rounded-md border-gray-400 bg-gray-100  p-1 pl-10 focus:border-gray-900 focus:bg-gray-300 focus:ring-0 "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Icons */}

        {session ? (
          <div className="flex items-center justify-end  md:space-x-4">
            <HomeIcon onClick={() => router.push('/')} className="navIcon" />
            <PlusCircleIcon onClick={() => setOpen(true)} className="navIcon" />
            <UserGroupIcon
              onClick={() => router.push('/users')}
              className="navIcon"
            />
            <img
              src={session.user.image}
              alt="profile-picture"
              className="h-10 cursor-pointer rounded-full transition-all ease-out hover:scale-110"
            />
          </div>
        ) : (
          <div className="flex items-center justify-end  md:space-x-4">
            <HomeIcon className="navIcon" />

            <button onClick={signIn}> SignIn</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
