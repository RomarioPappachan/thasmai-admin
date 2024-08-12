"use client"
import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';



function MessageDeletePopUp(props) {
    console.log(props.selectedMessageId);


    const handleDelete = async () => {
        
        const selectedMessageId = props.selectedMessageId;

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/global-Delete/${selectedMessageId}`);
            console.log(response);
            toast.success("Message deleted sucessfully");
            props.setIsDeleteMessageToggle(false)
            props.setIsDropDownToggle(false)
            props.setSelectedMessageId("")
            props.setRenderMessageToggle(prevValue => !prevValue)


            
        } catch (error) {
                 console.error('Error fetching data:', error);
                toast.error("Error deleting message");
        }
        
    };

    

  return (
    <div className="w-screen h-screen px-2 md:px-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center z-20">
    <div className='w-full md:w-[700px] h-[30vh] md:h-[300px] bg-white rounded hover:bg-[#cfcdcc]'>
        <div className='w-full h-[50%] flex justify-center items-center'>
            <p className='textsm md:text-lg font-medium text-black'>Are you sure you want to delete this message?</p>
        </div>
        <div className='w-full h-[50%] flex justify-evenly items-center'>
            <button 
                className='w-[120px] h-[40px] bg-amber-700 hover:bg-amber-800 text-white rounded'
                onClick={()=>{
                    handleDelete()
                }}
            >Yes</button>
            <button 
                className='w-[120px] h-[40px] bg-blue-500 hover:bg-blue-600 text-white rounded'
                onClick={() => {
                    props.setIsDeleteMessageToggle(false)
                    props.setSelectedMessageId("")
                    props.setIsDropDownToggle(false)
                }}
            >No</button>
        </div>
    </div>
</div>
  )
}

export default MessageDeletePopUp