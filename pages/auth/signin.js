import React from 'react'
import { getProviders, signIn as signInProvider } from 'next-auth/react'
import Header from '../../components/Header'
//Running on the browser
//https://next-auth.js.org/configuration/pages
function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center ">
        <h1 className=" text-5xl font-medium">Instakilo</h1>
        <p className="font-xs mt-4 ">This app is built for learn NextJS</p>

        <div className="mt-40 flex w-full items-center justify-center ">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="rounded-lg bg-blue-500 p-3 text-white"
                onClick={() =>
                  signInProvider(provider.id, { callbackUrl: '/' })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

//nextjs function rendering on the server side
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
export default signIn
