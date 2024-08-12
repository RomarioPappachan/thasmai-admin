"use client"

import { React, useEffect } from "react"
import { useRouter } from 'next/navigation'




export default function Financial(){
    const router = useRouter()
    useEffect(() => {
      router.push('/financial/distribution')
    
      return () => {
        return;
      }
    }, [])
  

    return (
        <div>
           <div></div>

           {/* <h1> Financial </h1> */}
        </div>
    )
}