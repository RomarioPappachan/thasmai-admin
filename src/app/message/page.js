"use client"

import { React, useEffect } from "react"
import { useRouter } from 'next/navigation'



function Message() {
    const router = useRouter()
    useEffect(() => {
      router.push('/message/test-global')
    
      return () => {
        return;
      }
    }, [])

  return (
    <div></div>
  )
}

export default Message