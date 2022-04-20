import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'

const useGetRegisteredUsers = () => {
  const [registeredUsers, setRegisteredUsers] = useState([])
  useEffect(() => {
    const colRef = collection(db, 'users')
    onSnapshot(colRef, (snapshot) => {
      const arr = []
      snapshot.forEach((s) => {
        arr.push({ ...s.data(), id: s.id })
      })
      setRegisteredUsers(arr)
    })
  }, [db])

  return registeredUsers
}

export default useGetRegisteredUsers
