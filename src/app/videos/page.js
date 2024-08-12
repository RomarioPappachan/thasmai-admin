"use client"

import React, { useState } from 'react'

import { useNavbarTextStore } from '@/app/state/navbar-state'
import { BsImage } from "react-icons/bs";
import Playlist from '@/app/components/videos/playlist/Playlist'
import AddVideoPopUp from '@/app/components/videos/playlist/AddVideoPopUp'
import axios from 'axios';
import { toast } from "react-hot-toast";
import DeletePlaylistPopUp from '@/app/components/videos/playlist/DeletePlaylistPopUp'
import DeleteVideoPopUp from '@/app/components/videos/playlist/DeleteVideoPopUp'
import EditVideoPopUp from '@/app/components/videos/playlist/EditVideoPopUp'
import NavLink from './navlink/navlink';


function MeditationVideo() {
   
    const [addVideoPopUp , setAddVideoPopUp] = useState(false);
    const [playlistData, setPlaylistData] = useState({
        playlistHeading: "",
        playlistImage: ""
    });

    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [selectedPlaylistData, setSelectedPlaylistData] = useState({
      head : "",
      category : "",
      videoArray : [],
      index : ""    
    })

    const [isDeletePlaylistPopup, setIsDeletePlaylistPopup] = useState(false)
    const [isDeleteVideoPopup, setIsDeleteVideoPopup] = useState(false)
    const [isEditVideoPopup, setIsEditVideoPopup] = useState(false)
    const [renderPlaylistToggle, setRenderPlaylistToggle] =useState(false)
    

    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Videos");

    const handlePlaylistDataChange = (e) => {
        const { name, value } = e.target;
        setPlaylistData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

    const handlePlaylistImageChange = (e) => {
        const file = e.target.files[0];
        setPlaylistData({
            ...playlistData,
            playlistImage: file,
        });
    };




    //handleAddPlaylist

    const handleAddPlaylist = async (e) => {
        e.preventDefault();
                
        const { playlistHeading, playlistImage } = playlistData

        
        
        // console.log('Submitting playlist form:',form);

        if(playlistHeading && playlistImage ) {

                const formData = new FormData();
                formData.append('playList_heading', playlistHeading);
                formData.append('playList_image', playlistImage);
                // form.append('category', playlistHeading);
                console.log(formData);

            try {

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-video`, formData);
                console.log(response);
                setRenderPlaylistToggle(prevValue => !prevValue);
                toast.success('Playlist created successfully');
                // Clear form fields after successful submission
                setPlaylistData({
                    playlistHeading: "",
                    playlistImage: "",
                });

            } catch (error) {
                console.error('Error creating playlist:', error);
                toast.error('Error while creating playlist.');
            }

        } else {
            toast("Please enter playlist heading and image.");
        }
    };




  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto ">
      <div className="w-full flex items-center justify-between ">
        <NavLink/>
      </div>
      
      <div className='w-full h-[90%] mt-4 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
          
          <div className='w-full h-[20%] bg-[#E1E2EB] rounded-md'>
              
                <p className='text-black font-medium px-2 pt-1'>Create Playlist Heading</p>
                  
                 <div className='w-full flex'>
                   <div className='w-[80%] h-full pt-4 flex'>
                      <input
                       className='w-[300px] h-10 ms-8 p-2 rounded border-[1px] text-black bg-white border-black'
                       name='playlistHeading'
                       value={playlistData.playlistHeading}
                       placeholder='Playlist Heading'
                       type='text'
                       onChange={handlePlaylistDataChange}
                      />

                      <label htmlFor="playlistImage"
                            className='w-[200px] h-10 ms-8'
                      >
                        <input 
                            id='playlistImage'
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handlePlaylistImageChange}
                        />
                      
                            <span className='w-[200px] h-10 bg-[#495F85] text-white flex justify-center items-center rounded-2xl hover:bg-[#495f85d1]'>
                                <BsImage className='me-3'/> Upload Image
                            </span>
                      </label>

                        <span className={`text-gray-400  flex items-center ps-2 ${playlistData.playlistImage ? 'text-gray-800' : ''}`}>
                            { playlistData.playlistImage ? playlistData.playlistImage.name : 'Select an image'}
                         </span>
                    
                      
                   </div>
                       <div className= 'w-[20%] h-full'>
                         <button 
                          className='w-[150px] h-12 ms-8 mt-2 bg-[#6EA5FF] text-white rounded-2xl hover:scale-105 hover:bg-[#629bf7]'
                          onClick={(e) => {
                            handleAddPlaylist(e);
                          }}
                         >
                           + Add Playlist
                         </button>
                      </div>
                 </div>

          </div>
          <div className='w-full h-[80%] overflow-y-auto'>
            <Playlist 
              setAddVideoPopUp ={setAddVideoPopUp} 
              setSelectedPlaylistId={setSelectedPlaylistId} 
              setSelectedPlaylistData={setSelectedPlaylistData} 
              renderPlaylistToggle={renderPlaylistToggle}
              setIsDeletePlaylistPopup={setIsDeletePlaylistPopup}
              setIsDeleteVideoPopup={setIsDeleteVideoPopup} 
              setIsEditVideoPopup={setIsEditVideoPopup}

            />

          </div>


      </div>
      { 
        addVideoPopUp  &&  
        <AddVideoPopUp
           setAddVideoPopUp={setAddVideoPopUp} 
           selectedPlaylistId={selectedPlaylistId} 
           setSelectedPlaylistId={setSelectedPlaylistId} 
           setSelectedPlaylistData={setSelectedPlaylistData} 
           selectedPlaylistData={selectedPlaylistData} 
           setRenderPlaylistToggle={setRenderPlaylistToggle}
        /> 
      }

      {
        isDeletePlaylistPopup &&
        <DeletePlaylistPopUp 
         selectedPlaylistId={selectedPlaylistId}  
         setIsDeletePlaylistPopup={setIsDeletePlaylistPopup} 
         setRenderPlaylistToggle={setRenderPlaylistToggle}
        />
      }

      {
        isDeleteVideoPopup &&
        <DeleteVideoPopUp 
         selectedPlaylistId={selectedPlaylistId}  
         setIsDeleteVideoPopup={setIsDeleteVideoPopup}
         selectedPlaylistData={selectedPlaylistData}  
         setRenderPlaylistToggle={setRenderPlaylistToggle}

        />
      }

      {
        isEditVideoPopup &&
        < EditVideoPopUp
         selectedPlaylistId={selectedPlaylistId}  
         setIsEditVideoPopup={setIsEditVideoPopup}
         selectedPlaylistData={selectedPlaylistData}  
         setRenderPlaylistToggle={setRenderPlaylistToggle}

        />
      }



    </div>
  )
}

export default MeditationVideo