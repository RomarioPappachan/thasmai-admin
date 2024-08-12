"use client"


import React from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

function BanUserPopup(props) {
console.log(props)


    return (
        <div className="w-screen h-screen px-2 md:px-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
            <div className='w-full md:w-[450px] h-[200px] bg-white rounded hover:bg-[#cfcdcc]'>

                <div className='w-full h-[50%] flex justify-center items-center'>
                    <p className='text-sm md:text-lg font-medium text-black'>Are you sure that you want to ban this user?</p>
                </div>
                <div className='w-full h-[50%] flex justify-evenly items-center'>
                    <button 
                        className='w-[120px] h-[40px] bg-amber-700 hover:bg-amber-800 text-white rounded'
                        onClick={() => {
                            (async function() {
                                try{
                                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/closeuser`, {
                                    UId: props.userId
                                });
                                // filterState.setBanToggle(!filterState.banToggle)
                                
                                // toast.success(response.data.data)
                                toast.success("User Banned Successfully")

                                
                                props.setBanToggle(false)
                            }
                            catch(err){
                    console.log(err);
                                // filterState.setToastData(true,err.response.data.message)
                                // <></>
                                toast.error(err.response.data.message)
                                props.setBanToggle(false)

                            }
                            })()
                        }}
                    >Yes</button>
                    <button 
                        className='w-[120px] h-[40px] bg-blue-500 hover:bg-blue-600 text-white rounded'
                        onClick={() => {
                            // props.setIsDeleteEvent(false);
                            props.setBanToggle(false)

                        }}
                    >No</button>
                </div>
            </div>
        </div>
    )       
    
}

export default BanUserPopup