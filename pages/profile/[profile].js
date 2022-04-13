import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { useSession } from 'next-auth/react'
import Modal from '../../components/Modal'
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { GrClose } from 'react-icons/gr'
import Following from './Following'
import ProfilePosts from './ProfilePosts'
function UserProfile() {
  const { data: session } = useSession()
  const router = useRouter()
  const id = router.query.profile
  const [user, setUser] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [isFollowersOpen, setIsFollowersOpen] = useState(false)
  const [isFollowingOpen, setIsFollowingOpen] = useState(false)
  const [checkIfIsFollowedByLoggedUser, setCheckIfIsFollowedByLoggedUser] =
    useState(false)
  //get user data
  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snapshot) => {
      const arr = []
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id })
        if (doc.id === id) {
          setUser({ ...doc.data() })
        }
      })

      setAllUsers(arr)
    })
  }, [db, id])
  //get user posts
  useEffect(async () => {
    return onSnapshot(collection(db, 'posts'), (snapshot) => {
      const arr = []
      snapshot.docs.forEach((doc) => {
        if (doc?.data()?.userId === id) {
          arr.push({ ...doc.data(), id: doc.id })
        }
      })
      setUserPosts(arr)
    })
  }, [following])

  // get user followers
  useEffect(async () => {
    return onSnapshot(collection(db, 'users', id, 'followers'), (snapshot) => {
      const arr = []
      snapshot.docs.forEach((doc) => {
        if (doc.data().id) {
          arr.push({ ...doc.data() })
        }
      })
      setFollowers(arr)
    })
  }, [id, db, following])
  //get user following
  useEffect(() => {
    const arr = []
    allUsers.map((user) => {
      onSnapshot(collection(db, 'users', user.id, 'followers'), (snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.id === id) {
            arr.push(user)
          }
        })
      })
    })
    setFollowing(arr)
  }, [id, db, allUsers])

  const followerDeleteHandler = (i) => {
    deleteDoc(doc(db, 'users', session?.user.uid, 'followers', i))
  }

  useEffect(async () => {
    checkFollow()
  }, [db, id, checkIfIsFollowedByLoggedUser])
  const checkFollow = async () => {
    onSnapshot(collection(db, 'users', id, 'followers'), (snapshot) => {
      const decision = false
      snapshot.docs.forEach((doc) => {
        if (doc.id === session?.user.uid) {
          decision = true
        }
        setCheckIfIsFollowedByLoggedUser(decision)
      })
    })
  }

  const followHandler = async () => {
    if (checkIfIsFollowedByLoggedUser) {
      deleteDoc(doc(db, 'users', id, 'followers', session.user.uid))
    } else {
      setDoc(doc(db, 'users', id, 'followers', session.user.uid), {
        username: session.user.username,
        id: session.user.uid,
        image: session.user.image,
      })
    }
  }

  return (
    <div>
      <Header />
      <Modal />
      <div className=" z-0 h-full overflow-x-hidden">
        <div className=" flex  flex-col items-center ">
          <div className="h-full w-full max-w-6xl ">
            <div className=" my-5 flex h-[300px] flex-col items-center sm:h-[200px] sm:flex-row">
              <div className="min-h-24 sm:min-h-96 flex w-full items-center  justify-center  py-2 sm:h-full  ">
                <img
                  src={user.image}
                  className="rounded-full border-2 p-1 sm:h-full sm:w-auto "
                />
              </div>
              <div className="flex h-full w-full flex-col justify-evenly ">
                <p className="flex h-[40%] w-full items-center justify-center text-center text-xl font-bold sm:justify-start sm:px-5 sm:text-left">
                  {user.username}
                  {session && session.user.uid !== router.query.profile ? (
                    <button
                      className="ml-5 space-x-4 rounded-lg border bg-blue-300 px-2"
                      onClick={() => followHandler()}
                    >
                      {checkIfIsFollowedByLoggedUser ? 'Unfollow' : 'Follow'}
                    </button>
                  ) : null}
                </p>

                <div className="flex h-[30%] flex-row justify-center space-x-10 px-5  sm:h-[60%] md:justify-start">
                  <p className="max-h-8  bg-white">
                    Posts:
                    <span className="ml-1 font-bold">{userPosts.length}</span>
                  </p>
                  <p
                    onClick={() => setIsFollowersOpen(true)}
                    className="max-h-8 max-w-[150px] cursor-pointer bg-white  transition ease-out hover:text-blue-300 "
                  >
                    Followers:
                    <span className="ml-1 font-bold">{followers.length}</span>
                  </p>
                  <p
                    className="max-h-8 max-w-[150px] cursor-pointer bg-white transition ease-out hover:text-blue-300"
                    onClick={() => setIsFollowingOpen(true)}
                  >
                    Following:
                    <span className="ml-1 font-bold">{following.length}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap justify-center border-t-2 ">
              <div className=" flex w-[925px] flex-wrap justify-center  pt-4 xd:justify-start">
                {userPosts.map((post) => (
                  <ProfilePosts
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    image={post.image}
                  />
                ))}
              </div>
            </div>
          </div>

          {isFollowersOpen ? (
            <div className=" fixed top-0 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
              <div className="relative h-[400px] w-[400px] overflow-y-auto rounded-lg border-4 bg-white">
                <h3 className="flex h-10 items-center justify-center border-b font-bold ">
                  Followers
                  <GrClose
                    onClick={() => setIsFollowersOpen(false)}
                    className="btn absolute right-4"
                  />
                </h3>
                {followers.map((follower) => (
                  <div
                    key={follower.id}
                    className="my-2 flex h-10 w-full items-center border-b pb-2"
                  >
                    <div
                      className="ml-2 flex h-full w-[80%] cursor-pointer items-center space-x-4 "
                      onClick={() => {
                        router.push('/profile/' + follower.id)
                        setIsFollowersOpen(false)
                      }}
                    >
                      <img
                        src={follower.image}
                        className="h-8 w-8 rounded-full"
                      />
                      <h3 className="font-bold">{follower.username}</h3>
                    </div>
                    {session && router.query.profile === session.user.uid ? (
                      <button
                        className="rounded-lg border border-blue-400 p-1 transition ease-out hover:bg-blue-300"
                        onClick={() => followerDeleteHandler(follower.id)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {isFollowingOpen ? (
            <div className=" fixed top-0 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
              <div className="relative h-[400px] w-[400px] overflow-y-auto rounded-lg border-4 bg-white">
                <h3 className="flex h-10 items-center justify-center border-b font-bold ">
                  Following
                  <GrClose
                    onClick={() => setIsFollowingOpen(false)}
                    className="btn absolute right-4"
                  />
                </h3>
                {following &&
                  following.map((follower) => (
                    <Following
                      id={follower.id}
                      username={follower.username}
                      image={follower.image}
                      key={follower.id}
                      setIsFollowingOpen={setIsFollowingOpen}
                      following={following}
                      setFollowing={setFollowing}
                    />
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
