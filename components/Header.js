import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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

const Header = ({ setSearchInput }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useRecoilState(modalState)
  const [avatarMenuOpen, setavatarMenuOpen] = useState(false)

  const inputSearchHandler = (e) => {
    setSearchInput(e.target.value)
  }
  return (
    <div
      className={`sticky top-0 z-50 ${
        router.pathname === '/users' ? ' min-h-[60px]  justify-center' : ''
      } border-b bg-white shadow-md `}
    >
      <div className=" flex h-[60px]  max-w-6xl justify-between  lg:mx-auto">
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
            {router.pathname !== '/users' ? (
              <div>
                <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
                  <SearchIcon className="h-6 w-6 text-gray-500 " />
                </div>

                <input
                  className=" focus:ring-none block w-full rounded-md border-gray-400 bg-gray-100  p-1 pl-10 focus:border-gray-900 focus:bg-gray-300 focus:ring-0 "
                  type="text"
                  placeholder="Search"
                  onChange={inputSearchHandler}
                />
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>

        {/* Icons */}

        {session ? (
          <div className="flex w-full items-center justify-end space-x-4 md:w-auto md:space-x-4">
            <HomeIcon onClick={() => router.push('/')} className="navIcon" />
            <PlusCircleIcon onClick={() => setOpen(true)} className="navIcon" />
            <UserGroupIcon
              onClick={() => router.push('/users')}
              className="navIcon"
            />
            <div className="relative">
              <img
                src={session.user.image}
                alt="profile-picture"
                onClick={() => setavatarMenuOpen(!avatarMenuOpen)}
                className="relative h-10 cursor-pointer rounded-full transition-all ease-out hover:scale-110"
              />

              {avatarMenuOpen && (
                <div className="absolute right-[-20px] mr-[50%] mt-3 flex w-[100px] flex-col space-y-3 bg-white p-3">
                  <button
                    onClick={signOut}
                    className=" h-[30px] w-full  rounded-md text-center hover:bg-blue-300 "
                  >
                    {' '}
                    Sign out
                  </button>

                  <button
                    className="h-[30px] w-full rounded-md text-center hover:bg-blue-300"
                    onClick={() => router.push('/users')}
                  >
                    {' '}
                    My posts
                  </button>
                </div>
              )}
            </div>
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
