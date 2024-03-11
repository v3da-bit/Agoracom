import { getUnseenMsg } from '@/requests/Home'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function UnseenMessage() {
  const [msg, setMsg] = useState(0);

  const { loggedIn, currentUser } = useSelector((state: any) => {
    return {
      loggedIn: state.auth.loggedIn,
      currentUser: state.auth.currentUser
    };
  });
  useEffect(() => {
    getMsg()
  }, [])
  const getMsg = async () => {
    if (loggedIn && currentUser) {
      const response = await getUnseenMsg(currentUser)
      if (response.status === 200) {
        setMsg(response.data.count)
      }
    }
  }
  return (
    <div className="px-2">
      <button className=' bg-red-500 rounded-md hover:bg-red-600 border border-red-700 text-white text-center h-6 w-6'><h1 className=' font-bold'>{msg}</h1></button>
    </div>
  )
}

export default UnseenMessage