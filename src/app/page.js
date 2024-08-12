"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    router.push('/overview')
  
    return () => {
      return;
    }
  }, [])
  
  return (
    <div></div>
  )
}

