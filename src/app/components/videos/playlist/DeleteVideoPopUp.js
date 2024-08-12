"use client"
import React from 'react'
import axios from 'axios';
import { toast } from "react-hot-toast";

function DeleteVideoPopUp(props) {
     
    const playlistId = props.selectedPlaylistId;
    const {head,category,videoArray,index} = props.selectedPlaylistData;
    


    const videoHeadArray = videoArray.filter((i,ind)=>{
        return ind !== index 
    }).map((i,ind)=> {
        return i.video_heading
    })
   

    const videoLinkArray = videoArray.filter((i,ind)=>{
        return ind !== index 
    }).map((i,ind)=> {
        return i.video_link
    })
    


    const handleDelete = async () => {
        
                const formData = new FormData();
                formData.append('Video_heading', JSON.stringify(videoHeadArray));
                formData.append('videoLink', JSON.stringify(videoLinkArray));
                formData.append('playList_heading', head);
                formData.append('category', category);
                console.log(formData);
        
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-video/${playlistId}`,formData);
           
            console.log(response);
            props.setRenderPlaylistToggle(prevValue => !prevValue);
            toast.success("Successfully deleted the Video.");
            props.setIsDeleteVideoPopup(false);
        } catch (error) {
                 // console.error('Error fetching data:', error);
                toast.error("Error while deleting Video.");
        }
        
    };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
            <div className='w-[700px] h-[300px] bg-white rounded hover:bg-[#cfcdcc]'>
                <div className='w-full h-[50%] flex justify-center items-center'>
                    <p className='text-lg font-medium text-black'>Are you sure you want to delete this video?</p>
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
                            props.setIsDeleteVideoPopup(false);
                        }}
                    >No</button>
                </div>
            </div>
        </div>
  )
}

export default DeleteVideoPopUp