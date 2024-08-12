"use client"
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { useLoginStore } from "@/app/loginstate/loginState";


function LogoutPopUp(props) {

    const state = useLoginStore(function(state) { {
    	return state
  		}	
	})
    
    const pathname = usePathname()
	const router = useRouter()

  return (
    <div className="w-screen h-screen px-2 md:px-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center z-20">
    <div className='w-full md:w-[700px] h-[30vh] md:h-[300px] bg-white rounded hover:bg-[#cfcdcc]'>
        <div className='w-full h-[50%] flex justify-center items-center'>
            <p className='textsm md:text-lg font-medium text-black'>Are you sure you want to logout?</p>
        </div>
        <div className='w-full h-[50%] flex justify-evenly items-center'>
            <button 
                className='w-[120px] h-[40px] bg-amber-700 hover:bg-amber-800 text-white rounded'
                onClick={()=>{
                    localStorage.removeItem('userdata')
                    state.setIsloggedin(false)
                    router.push('/login');
                }}
            >Yes</button>
            <button 
                className='w-[120px] h-[40px] bg-blue-500 hover:bg-blue-600 text-white rounded'
                onClick={() => {
                    props.setIsLogoutPopUp(false);
                }}
            >No</button>
        </div>
    </div>
</div>
  )
}

export default LogoutPopUp