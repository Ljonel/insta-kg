import React, { useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import modalState from '../atoms/modalAtom'
import { CameraIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
function Modal() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const closeRef = useRef(null)
  const filePickerRef = useRef(null)
  const enterCaptionRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleClickOutside(event) {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const uploadPost = async () => {
    if (loading) return
    setLoading(true)

    //Create post & add to firestore posts
    const documentRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: enterCaptionRef.current.value,
      profileImg: session.user.image,
      userId: session.user.uid,
      timestamp: serverTimestamp(),
    })
    //get post id for new post
    console.log('ADD NEW DOC', documentRef.id)

    //upload image to firebase storage with ID
    const imageRef = ref(storage, `posts/${documentRef.id}/image`)

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)

        //get download url from firebase and update origina post with image
        await updateDoc(doc(db, 'posts', documentRef.id), {
          image: downloadURL,
        })
      }
    )

    setOpen(false)
    setLoading(false)
    setSelectedFile(null)
  }

  return (
    <>
      {open && (
        <div
          className={`${
            open && 'flex'
          } fixed top-0  min-h-[800px] w-full items-center justify-center bg-[rgba(0,0,0,0.5)]`}
        >
          <div
            ref={closeRef}
            className="relative flex h-[400px] w-[400px] flex-col items-center justify-evenly rounded-lg bg-white shadow-sm "
          >
            {selectedFile ? (
              <img
                src={selectedFile}
                onClick={() => {
                  setSelectedFile(null)
                  setOpen(false)
                }}
                className="h-[30%] w-full"
              />
            ) : (
              <div className="btn flex h-[70px] w-[70px] items-center justify-center rounded-full bg-red-200/50">
                <CameraIcon
                  onClick={() => filePickerRef.current.click()}
                  className=" h-[80%] w-[80%]"
                  type="file"
                />
              </div>
            )}

            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />

            <input
              type="text"
              placeholder="Enter a caption"
              ref={enterCaptionRef}
              className="w-[80%]  border-x-0 border-t-0 border-b-4 border-red-200 pl-10 transition ease-out focus:border-b-red-400 focus:ring-0"
            />
            <button
              onClick={uploadPost}
              type="button"
              disabled={!selectedFile}
              className="h-[50px] w-[90%] rounded-lg bg-red-200 transition-all ease-out hover:bg-red-400"
            >
              {loading ? 'Uploading' : 'Upload post'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
