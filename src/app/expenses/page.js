"use client"
import { React, useEffect } from "react"
import { useRouter } from 'next/navigation'

function Expenses() {
	const router = useRouter()
	useEffect(() => {
	  router.push('/expenses/add-expense')
	
	  return () => {
		return;
	  }
	}, [])
	return (
    	<div >
			
		</div>
  	)
}

export default Expenses