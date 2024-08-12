"use client"
import { React, useEffect } from "react"
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter()
  useEffect(() => {
    router.push('/events/events')
  
    return () => {
      return;
    }
  }, [])
  return (
    <div></div>
  )
}

export default page