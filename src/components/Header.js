import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { PlusCircleIcon, SearchIcon } from '@heroicons/react/outline'
import modalState from '../atoms/modalAtom'
import { CgHome, CgNotes } from 'react-icons/cg'
import { AiOutlineHome, AiOutlinePlusCircle } from 'react-icons/ai'
import Link from 'next/link'
//

export async function getStaticProps() {
  return {
    props: {
      id: session.user.uid,
      username: session.user.username,
      email: session.user.email,
    }, // will be passed to the page component as props
  }
}

const Header = ({ setSearchInput }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [open, setOpen] = useRecoilState(modalState)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)

  const handleRouteChange = (path) => router.push(path)
  const inputSearchHandler = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div
      className={`sticky top-0 z-50 flex items-center justify-center  ${
        router.pathname === '/users' ? ' min-h-[60px]  justify-center' : ''
      } border-b bg-white shadow-md `}
    >
      <div className=" flex h-[60px] w-full max-w-6xl justify-between px-4 xl:px-0">
        {/* Logo */}
        <div
          onClick={() => handleRouteChange('/')}
          className="relative hidden w-24 cursor-pointer lg:inline-grid"
        >
          <h1
            id="insta-logo"
            className=" flex h-full w-full items-center justify-center md:justify-start"
          >
            InstaKilo
          </h1>
        </div>

        <div
          onClick={() => handleRouteChange('/')}
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
            {router.pathname === '/' ? (
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
            <AiOutlineHome
              title="Home"
              onClick={() => handleRouteChange('/')}
              className="navIcon"
            />
            <AiOutlinePlusCircle
              title="Add Post"
              onClick={() => setOpen(true)}
              className="navIcon"
            />
            <CgNotes
              title="My Posts"
              onClick={() => handleRouteChange('/users')}
              className="navIcon"
            />

            <div className="relative">
              <img
                src={session.user.image}
                alt="profile-picture"
                onClick={() => setAvatarMenuOpen((prev) => !prev)}
                className="relative h-10 cursor-pointer rounded-full transition-all ease-out hover:scale-110"
              />

              {avatarMenuOpen && (
                <div className="absolute right-[-20px] mr-[50%] mt-3 flex w-[100px] flex-col space-y-3 border bg-white p-3">
                  <button
                    onClick={() =>
                      handleRouteChange('/profile/' + session.user.uid)
                    }
                    className=" h-[30px] w-full  rounded-md text-center hover:bg-blue-300 "
                  >
                    {' '}
                    Profile
                  </button>

                  <button
                    className="h-[30px] w-full rounded-md text-center hover:bg-blue-300"
                    onClick={() => handleRouteChange('/users')}
                  >
                    {' '}
                    My posts
                  </button>
                  <button
                    onClick={signOut}
                    className=" h-[30px] w-full  rounded-md text-center hover:bg-red-300 "
                  >
                    {' '}
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end  md:space-x-4">
            <AiOutlineHome title="Home" className="navIcon" />

            <button onClick={signIn}> SignIn</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
