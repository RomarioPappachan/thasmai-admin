"use client"
import React,  { useEffect } from 'react'
import { useRouter } from "next/navigation"


function Appointments() {
  const router = useRouter()
  useEffect(() => {
    router.push('/appointments/appointments')
  
    return () => {
      return;
    }
  }, [])
  return (
    <div className='w-full h-full'></div>
  )
}

export default Appointments