"use client"


import React from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";

function DeleteEventPopUp(props) {




    const handleDelete = async () => {
        
        const eventId = props.eventId;

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/delete-events/${eventId}`);
            console.log(response);
            toast.success("Successfully deleted the blog.");
            props.setIsDeleteEvent(false);
            props.setFilterToggle(prevValue => !prevValue);
        } catch (error) {
                 console.error('Error fetching data:', error);
                toast.error("Error while deleting blog.");
        }
        
    };



    return (
        <div className="w-screen h-screen px-2 md:px-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
            <div className='w-full md:w-[450px] h-[200px] bg-white rounded hover:bg-[#cfcdcc]'>

                <div className='w-full h-[50%] flex justify-center items-center'>
                    <p className='text-sm md:text-lg font-medium text-black'>Are you sure you want to delete this blog?</p>
                </div>
                <div className='w-full h-[50%] flex justify-evenly items-center'>
                    <button 
                        className='w-[120px] h-[40px] bg-amber-700 hover:bg-amber-800 text-white rounded'
                        onClick={() => {
                            handleDelete();
                        }}
                    >Yes</button>
                    <button 
                        className='w-[120px] h-[40px] bg-blue-500 hover:bg-blue-600 text-white rounded'
                        onClick={() => {
                            props.setIsDeleteEvent(false);
                        }}
                    >No</button>
                </div>
            </div>
        </div>
    )       
    
}

export default DeleteEventPopUp