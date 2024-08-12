"use client"
import { React, useEffect } from "react"
import { useRouter } from 'next/navigation'


export default function Users(){
     const router = useRouter()
      useEffect(() => {
    router.push('/users/meditatorlist')
  
    return () => {
      return;
    }
  }, [])

    return (
       <>
       </>
    )
}