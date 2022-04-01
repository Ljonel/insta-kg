import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Section from '../components/Section'
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Instakilo</title>
        <link rel="icon" href="" />
      </Head>
      <Header />
      <Section />
    </div>
  )
}

export default Home
