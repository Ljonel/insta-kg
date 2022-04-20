import React, { useRef, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import modalState from '../atoms/modalAtom'
import { CameraIcon } from '@heroicons/react/outline'
import { db, storage } from '../../firebase'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
const Modal = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const closeRef = useRef(null)
  const filePickerRef = useRef(null)
  const enterCaptionRef = useRef(null)
  const [modalFileState, setModalFileState] = useState({
    loading: false,
    selectedFile: null,
  })
  function handleClickOutside(event) {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside(), true)
    }
  }, [])

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setModalFileState((prev) => ({
        ...prev,
        selectedFile: readerEvent.target.result,
      }))
    }
  }

  const uploadPost = async () => {
    if (modalFileState.loading) return
    setModalFileState((prev) => ({ ...prev, loading: true }))

    //Create post & add to firestore posts
    const documentRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: enterCaptionRef.current.value,
      profileImg: session.user.image,
      userId: session.user.uid,
      timestamp: serverTimestamp(),
    })

    //upload image to firebase storage with ID
    const imageRef = ref(storage, `posts/${documentRef.id}/image`)

    await uploadString(imageRef, modalFileState.selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)

        //get download url from firebase and update origina post with image
        await updateDoc(doc(db, 'posts', documentRef.id), {
          image: downloadURL,
        })
      }
    )

    setOpen(false)
    setModalFileState((prev) => ({
      ...prev,
      loading: false,
      selectedFile: null,
    }))
  }

  return (
    <>
      {open && (
        <div
          className={`${
            open && 'flex'
          } fixed top-0  h-full min-h-[800px] w-full items-center justify-center overflow-x-hidden bg-[rgba(0,0,0,0.5)]`}
        >
          <div
            ref={closeRef}
            className="relative flex h-[400px] w-[400px] flex-col items-center justify-evenly rounded-lg bg-white shadow-sm "
          >
            <div className="flex h-[60%] min-w-full justify-center ">
              {modalFileState.selectedFile ? (
                <img
                  src={modalFileState.selectedFile}
                  onClick={() => {
                    setModalFileState((prev) => ({
                      ...prev,
                      selectedFile: null,
                    }))
                    setOpen(false)
                  }}
                  className="max-h-full  max-w-full object-cover"
                />
              ) : (
                <div className=" flex h-full w-full items-center justify-center">
                  <CameraIcon
                    onClick={() => filePickerRef.current.click()}
                    className=" btn h-[90px] w-[90px] rounded-full bg-red-200/50 p-4"
                    type="file"
                  />
                </div>
              )}
            </div>
            <input
              type="file"
              hidden
              ref={filePickerRef}
              onChange={addImageToPost}
            />
            <div className="flex h-[40%] w-full flex-col items-center justify-evenly ">
              <input
                type="text"
                placeholder="Enter a caption"
                ref={enterCaptionRef}
                className="w-[80%]  border-x-0 border-t-0 border-b-4 border-red-200 pl-10 transition ease-out focus:border-b-red-400 focus:ring-0"
              />
              <button
                onClick={uploadPost}
                type="button"
                disabled={!modalFileState.selectedFile}
                className="h-[50px] w-[90%] rounded-lg bg-red-200 transition-all ease-out hover:bg-red-400"
              >
                {modalFileState.loading ? 'Uploading' : 'Upload post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
