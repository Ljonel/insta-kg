import React, { useEffect } from 'react'
import {
  getProviders,
  getSession,
  signIn as signInProvider,
} from 'next-auth/react'
import Header from '../../components/Header'
import Head from 'next/head'
import { db } from '../../firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  onSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { route } from 'next/dist/server/router'
import { useRouter } from 'next/router'
//Running on the browser
//https://next-auth.js.org/configuration/pages
function signIn({ providers, session }) {
  const router = useRouter()

  //add users to firebase
  if (session) {
    const docRef = doc(db, 'users', session.user.uid)
    onSnapshot(docRef, (d) => {
      if (d.data()) {
        // console.log('istnieje nie mozna dodac')
        return false
      } else {
        // console.log(d.id)
        setDoc(doc(db, 'users', d.id), {
          username: session.user.username,
          email: session.user.email,
          image: session.user.image,
          name: session.user.name,
        })
      }
    })
  }
  console.log()
  return (
    <>
      <Head>
        <title>Instakilo</title>
        <link rel="icon" href="" />
      </Head>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center ">
        <h1 className=" text-5xl font-medium">Instakilo</h1>
        <p className="font-xs mt-4 ">
          This app is built for learn NextJS and Firebase
        </p>

        <div className="mt-40 flex w-full items-center justify-center ">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {session ? (
                <button
                  onClick={() => router.push('/')}
                  className="rounded-lg bg-red-300 p-3 text-white transition-all ease-out hover:bg-red-400"
                >
                  Return to home page
                </button>
              ) : (
                <button
                  className="rounded-lg bg-blue-500 p-3 text-white"
                  onClick={() => {
                    //  signInProvider(provider.id, { callbackUrl: '/' })
                    signInProvider(provider.id)
                  }}
                >
                  Sign in with {provider.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

//nextjs function rendering on the server side
export async function getServerSideProps(context) {
  const session = await getSession(context)

  const providers = await getProviders()
  return {
    props: {
      providers,
      session,
    },
  }
}
export default signIn
