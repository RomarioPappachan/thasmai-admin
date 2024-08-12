"use client"
import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';

function EditVideoPopUp(props) {

    const [videoData, setVideoData] = useState({
        videoHeading: "",
        videoLink: ""
    });
    console.log(videoData);
    const playlistId = props.selectedPlaylistId;
    console.log(playlistId);

    const {head,category,videoArray,index} = props.selectedPlaylistData;
    

    const videoHeadArray = videoArray.map((i,ind)=> {
        return i.video_heading
    })
   

    const videoLinkArray = videoArray.map((i,ind)=> {
        return i.video_link
    })


    useEffect(() => {

          const initialHead = videoHeadArray.filter((i,ind)=>{
            return index === ind
          }).map((i,ind)=>{
            return i
          })

          const initialLink = videoLinkArray.filter((i,ind)=>{
            return index === ind
          }).map((i,ind)=>{
            return i
          })
           setVideoData({
            videoHeading : initialHead[0],
            videoLink :initialLink[0]
           })
  
        
      }, []);
    

    const handleVideoDataChange = (e) => {
        const { name, value } = e.target;
        setVideoData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };

    const handleUpdateVideo = async (e) => {
        const {videoHeading,videoLink} = videoData
        const newHeadArray = videoHeadArray.map((i,ind)=> {
            if(index === ind){
                return videoHeading
            } else{
                return i
            }
        })
        // console.log(newVideoArray);
        const newLinkArray = videoLinkArray.map((i,ind)=> {
            if(index === ind){
                return videoLink
            } else{
                return i
            }
        })

        const formData = new FormData();
        formData.append('Video_heading', JSON.stringify(newHeadArray));
        formData.append('videoLink', JSON.stringify(newLinkArray));
        formData.append('playList_heading', head);
        formData.append('category', category);
        console.log(formData);

try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-video/${playlistId}`,formData);
   
    console.log(response);
    props.setRenderPlaylistToggle(prevValue => !prevValue);
    toast.success("Successfully updated video details.");
    props.setIsEditVideoPopup(false);
} catch (error) {
         // console.error('Error fetching data:', error);
        toast.error("Error while updating Video.");
}


    }

    

    return (
    
        <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
 
            <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    props.setIsEditVideoPopup(false);
                }}
            
            >+</button>
            <div className='w-[800px] h-[400px] absolute  bg-[#C5D8FF] rounded-xl'>
                 <p className='text-[#00193B] font-medium text-2xl p-4'>Add Video</p>
                 <input
                  className='w-[80%] h-16 mx-16 mt-4 ps-5 rounded-md border-[1px] bg-white text-black border-black placeholder:text-xl placeholder:text-[#44474E]'
                  placeholder='Video Heading' 
                  type='text'
                  name='videoHeading'
                  value={videoData.videoHeading}
                  onChange={handleVideoDataChange}
                 />
                 <input
                  className='w-[80%] h-16 mx-16 mt-10 ps-5 rounded-md border-[1px] bg-white text-black border-black placeholder:text-xl placeholder:text-[#44474E]'
                  placeholder='Video URL' 
                  type='text'
                  name='videoLink'
                  value={videoData.videoLink}
                  onChange={handleVideoDataChange}
                 />
                 <div className='w-[80%] mt-16 mx-16 flex justify-end'>
                    <button 
                        className='w-[320px] h-[60px]  bg-[#00193B] text-white text-xl rounded-2xl hover:bg-[#00193bcc]'
                        onClick={handleUpdateVideo}
                    >
                        Update
                    </button>
                 </div>
            </div>

        </div>
  )
}

export default EditVideoPopUp