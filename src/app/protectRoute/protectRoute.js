"use client"
import React, { useEffect , useState} from 'react'
import { usePathname,useRouter } from 'next/navigation';
// import Login from '../components/login/login';
import { useLoginStore } from '../loginstate/loginState';

function ProtectedRoutes({children}) {

  const state = useLoginStore(function (state){
    return state
  })
  const route = usePathname()
    const router = useRouter()

    useEffect (()=>{
        const username = localStorage.getItem('userdata')
        console.log(username);
        if (!username){
            // state.setIsloggedin(false)
            return router.push('/login');
        }


        // else {
        //   // if (!state.isloggedin){
        //     state.setIsloggedin(true)
            
        //   // }
            
        // }
        
    },[])
  return (
    // <div>{state.isloggedin ? children : <Login loginToggle = {state.setIsloggedin}/> }</div>
    <div className='w-full h-full m-0'> { children }</div>
    

  )
}

export default ProtectedRoutes