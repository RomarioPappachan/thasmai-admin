"use client"
import { React, useEffect } from "react"
import { useRouter } from 'next/navigation'




export default function Operator(){
    const router = useRouter()
    useEffect(() => {
      router.push('/operator/operator-creation')
    
      return () => {
        return;
      }
    }, [])

    return (
       <></>
    )
    
}