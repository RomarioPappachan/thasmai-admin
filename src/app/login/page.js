"use client"

import React, { useRef,useState } from 'react'
import { useLoginStore } from '@/app/loginstate/loginState'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { IoEye ,IoEyeOff} from "react-icons/io5";

function Login() {

  	const userRef = useRef("")
  	const passRef = useRef("")
  	const [data,setData] = useState({})
	const [passtogg,setPassTogg] = useState(false)

  	const loginState = useLoginStore(function(state){
  	  return state
  	});


  	const router = useRouter()

  	async function handleLogin(username,password) {
    	try	{
    		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/login`,{
      			userName:username,
      			password:password
  			});
  
  			let userData = response.data.user
			
			loginState.setEmployeeId(userData.emp_Id);  // set emplyee id for using at expense creation
			console.log(userData,"dfghjkl;lkjhg")
 
  			localStorage.setItem('userdata', JSON.stringify(userData))

  			if (userData.role === 'operator'){
			
  			 
				return location.href ='/admin/overview'

			
  			}
		
  			 else if (userData.role === 'admin') {
			
				return location.href ='/admin/overview'

			
  			}
  			// else{
  			//   loginToggle(true)
  			// }

    	}	catch (err) {
    			console.log("error occurred",err)
   				if(err.response.data.message){
   				 return alert(err.response.data.message)
   				}
    
  		}
  	}

  	return (
    	<div className='w-full h-screen bg-white absolute z-50 left-0 top-0 overflow-hidden'>
      		<div className='w-full h-[60px] bg-[#5799FD]'></div>

        	<div className='w-full h-[85%] flex justify-center items-center '>
         		<div className='w-[90%] h-[80%] md:w-[35rem] md:h-[28rem] shadow-xl flex flex-col rounded-2xl  items-center bg-white box-shadow-custom'>
          			<h1 className='my-10 font-semibold text-2xl text-black'>Login</h1>
          			<input 
						ref = {userRef} 
						className='w-[90%] md:w-[60%] h-[50px] px-10 py-2 mt-10 rounded bg-white text-black outline-black border-black border-2 placeholder:text-gray-500'
          				placeholder='Username'
           				type='text'
					/>
           			<span className='relative w-[90%] md:w-[60%] h-[50px]'>
           				<input 
							ref = {passRef} 
							className='w-full h-full px-10 py-2 my-3 rounded bg-white text-black outline-black border-black border-2 placeholder:text-gray-500'
           					placeholder='Password'
           					type={passtogg ? "text" : "password"}
						/>
        				{
							!passtogg ?  
								<IoEyeOff 
									className='absolute top-6 right-5 text-black text-2xl cursor-pointer' 
									onClick = {() => {
            								setPassTogg(!passtogg)
          								}
									}
								/> 
								: 
								<IoEye 
									className='absolute top-6 right-5 text-black text-2xl cursor-pointer' 
									onClick = {() => {
            								setPassTogg(!passtogg)
          								}
        							}
								/>
						}
          			</span>

           			<button 
						className='w-[90%] md:w-[60%] h-[50px] px-[8rem] py-2 mt-10 bg-[#5799FD] text-white text-lg border-rad hover:bg-[#4f8ae2]' 
						onClick={(e) => {
            				console.log('login')
            				handleLogin(userRef.current.value, passRef.current.value)
						}}
					>
              			Login
					</button>
         		</div>
        
   			</div>
   		</div>
  	)
}

export default Login