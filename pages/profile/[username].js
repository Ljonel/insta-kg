import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { useSession } from 'next-auth/react'
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import Modal from '../../components/Modal'
import UserPost from '../../components/UserPost'
import { GrClose } from 'react-icons/gr'
function LoggedUser() {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState({
    id: 0,
    username: 'defaultName',
    email: 'defaultName@test.com',
    image: '',
  })
  const [userPosts, setUserPosts] = useState([])
  const [myFollowers, setMyFollowers] = useState([])
  const [watchedUsers, setWatchedUsers] = useState([])
  const [openMyFollowers, setOpenMyFollowers] = useState(false)
  const [openWatchedUsers, setOpenWatchedUsers] = useState(false)
  const [usersId, setUsersId] = useState([])
  //#region
  useEffect(() => {
    session?.user ? true : router.push('/')
  }, [router])

  //Get information about loggin user
  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snapshot) => {
      snapshot.forEach((p) => {
        if (p.id === session?.user.uid) {
          setUser((prev) => ({
            ...prev,
            id: p.id,
            username: p.data().username,
            email: p.data().email,
            image: p.data().image,
          }))
        }
      })
    })
  }, [db])

  //Get posts of actually loggin user
  useEffect(() => {
    const colRef = query(collectionGroup(db, 'posts'))
    getDocs(colRef).then((snapshot) => {
      const arr = []
      snapshot.docs.forEach((doc) => {
        if (doc.data().userId === session?.user.uid) {
          arr.push({ ...doc.data(), id: doc.id })
        }
      })
      setUserPosts(arr)
    })
  }, [])

  // Get users who are followed actuall loggin user
  useEffect(() => {
    if (session) {
      return onSnapshot(
        collection(db, 'users', session.user.uid, 'followers'),
        (snapshot) => {
          const arr = []
          snapshot.docs.forEach((doc) => {
            arr.push({ ...doc.data() })
          })
          setMyFollowers(arr)
        }
      )
    }
  }, [])

  //Get users who are watched by actually log user
  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snapshot) => {
      const arr = []
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id })
      })
      setUsersId(arr)
    })
  }, [])

  useEffect(() => {
    const arr2 = []
    usersId.map((u) => {
      return onSnapshot(
        collection(db, 'users', u.id, 'followers'),
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            if (doc.id === session?.user.uid) {
              arr2.push({ ...u, id: u.id })
            }
          })
          setWatchedUsers(arr2)
        }
      )
    })
  }, [db, usersId])

  //#endregion
  const handleDeleteMyFollower = async (i) => {
    await deleteDoc(doc(db, 'users', session?.user.uid, 'followers', i))
  }

  const handleDeleteFollow = async (i) => {
    await deleteDoc(doc(db, 'users', i, 'followers', session?.user.uid))
  }

  return (
    <div className="relative">
      {session && (
        <div>
          <Header />
          <Modal />
          <div className=" flex h-screen w-screen flex-col items-center ">
            <div className="h-full w-full  sm:w-[75%]">
              <div className="flex h-[300px] flex-col items-center border-b-2  sm:h-[200px] sm:flex-row">
                <div className="min-h-24 sm:min-h-96 flex w-full  items-center justify-center  py-2 sm:h-full  ">
                  <img
                    src={user.image}
                    className="rounded-full border-2 p-1 sm:h-full sm:w-auto "
                  />
                </div>
                <div className="flex h-full w-full flex-col justify-evenly  ">
                  <p className="text-center text-xl font-bold sm:px-5 sm:text-left">
                    {user.username}
                  </p>
                  <p className="text-center text-xl font-bold sm:px-5 sm:text-left"></p>
                  <div className="flex flex-col justify-evenly px-5">
                    <p>
                      Posts:
                      <button className="ml-1 font-bold">
                        {' '}
                        {userPosts.length}
                      </button>
                    </p>
                    <p
                      onClick={() => setOpenMyFollowers(true)}
                      className="max-w-[100px] cursor-pointer "
                    >
                      Followers:
                      <span className="ml-1 w-auto font-bold">
                        {myFollowers.length}
                      </span>
                    </p>
                    <p
                      onClick={() => setOpenWatchedUsers(true)}
                      className="max-w-[100px] cursor-pointer"
                    >
                      Following:
                      <button className="ml-1 font-bold">
                        {watchedUsers.length}
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className=" mt-5 flex h-[70%] flex-wrap items-center justify-center  ">
                {userPosts.length > 0
                  ? userPosts.map((p) => (
                      <div
                        key={p.id}
                        className="my-2 mx-2 h-[300px] w-[300px] min-w-[300px] border bg-red-200 "
                      >
                        <img
                          src={p.image}
                          className="h-full w-full overflow-hidden"
                        />
                      </div>
                    ))
                  : "You don't have any posts yet"}
                {openMyFollowers ? (
                  <div className="absolute  top-0 flex min-h-full w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
                    <div className="relative h-[400px] w-[400px] overflow-y-auto rounded-lg border-4 bg-white">
                      <h3 className="flex h-10 items-center justify-center border-b font-bold ">
                        My Followers
                        <GrClose
                          onClick={() => setOpenMyFollowers(false)}
                          className="btn absolute right-4"
                        />
                      </h3>
                      {myFollowers.map((follower) => (
                        <div
                          key={follower.id}
                          className="my-2 flex h-10 w-full items-center border-b pb-2"
                        >
                          <div className="ml-2 flex h-full w-[80%] items-center space-x-4 ">
                            <img
                              src={follower.image}
                              className="h-8 w-8 rounded-full"
                            />
                            <h3 className="font-bold">{follower.username}</h3>
                          </div>
                          <button
                            onClick={() => handleDeleteMyFollower(follower.id)}
                            className="h-[90%] max-w-[20%] rounded-lg border px-2"
                          >
                            delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {openWatchedUsers ? (
                  <div className=" fixed top-0 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
                    <div className="relative h-[400px] w-[400px] overflow-y-auto rounded-lg border-4 bg-white">
                      <h3 className="flex h-10 items-center justify-center border-b font-bold ">
                        Following
                        <GrClose
                          onClick={() => setOpenWatchedUsers(false)}
                          className="btn absolute right-4"
                        />
                      </h3>
                      {watchedUsers &&
                        watchedUsers.map((watch) => (
                          <div
                            key={watch.id}
                            className="my-2 flex h-10 w-full items-center border-b pb-2"
                          >
                            <div className="ml-2 flex h-full w-[80%] items-center space-x-4 ">
                              <img
                                src={watch.image}
                                className="h-8 w-8 rounded-full"
                              />
                              <h3 className="font-bold">{watch.username}</h3>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoggedUser
