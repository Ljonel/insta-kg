import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Section from '../components/Section'
import Modal from '../components/Modal'
import { useState } from 'react'
const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState('')

  return (
    <div className=" bg-gray-100">
      <Head>
        <title>Instakilo</title>
        <link rel="icon" href="" />
      </Head>
      <Header setSearchInput={setSearchInput} />
      <Section searchInput={searchInput} />
      <Modal />
    </div>
  )
}

export default Home
