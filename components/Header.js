import Image from 'next/image'
import React from 'react'
import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'
const Header = () => {
  return (
    <div className="sticky z-50 border-b shadow-md ">
      <div className=" flex max-w-6xl justify-between  pl-5 pr-5 lg:mx-auto">
        {/* Logo */}
        <div className="relative hidden w-24 cursor-pointer lg:inline-grid">
          <h1
            id="insta-logo"
            className=" flex h-full w-full items-center justify-center"
          >
            InstaKilo
          </h1>
        </div>

        <div className="relative w-10 flex-shrink-0 cursor-pointer lg:hidden">
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
              className=" focus:ring-none block w-full rounded-md border-gray-400 bg-gray-100  p-1 pl-10 focus:border-gray-900 focus:bg-gray-300 focus:ring-black "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center justify-end  md:space-x-4">
          <HomeIcon className="navIcon" />
          <div className="navIcon relative">
            <PaperAirplaneIcon className="navIcon" />
            <div className=" absolute -right-2 -top-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-400 text-white">
              3
            </div>
          </div>
          {/* <MenuIcon className="h-10 cursor-pointer md:hidden" /> */}
          <PlusCircleIcon className="navIcon" />
          <UserGroupIcon className="navIcon" />
          <HeartIcon className="navIcon" />
          <img
            src="https://bit.ly/3LuYuRJ"
            alt="profile-picture"
            className="h-10 cursor-pointer rounded-full transition-all ease-out hover:scale-110"
          />
        </div>
      </div>
    </div>
  )
}

export default Header
