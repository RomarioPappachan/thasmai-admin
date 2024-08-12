// "use client"
// import { useEffect, useState } from 'react'
// import React from 'react'
// import NavLink from '../../navlink/navlink'
// import NavLinkApp from '../NavlinkApp/navlinkApp'
// import { BsImage } from "react-icons/bs";
// import ZoomMeet from '@/app/components/configTable/ZoomMeet'


// function page() {

//   const [isFocusedZoomFrom, setIsFocusedZoomFrom] = useState(false);
//   const [isFocusedZoomTo, setIsFocusedZoomTo] = useState(false);
  

//   return (
    
//       <div className="w-full h-[85vh] px-7 overflow-y-auto">
//         <div className="w-[60%] flex items-center justify-between ">
//           <NavLink />
//         </div>
//         <div className='w-[80%]'>
//           <NavLinkApp />
//         </div>
//         <div className='w-full h-[85%] mt-4 p-4 bg-white rounded-[8px] shadow drop-shadow-md overflow-y-auto'>
//         <div className='w-full h-[20%] bg-[#E1E2EB] rounded-md '>
              
//               <p className='text-black font-medium px-2 pt-1'>Create Playlist Heading</p>
                
//                <div className='w-full h-full flex'>
//                  <div className='w-[80%] h-full pt-4 flex'>
//                   <input
//                      className='w-40 h-10 ms-8 p-2 rounded border-[1px] border-black'
//                       type='date'
//                    />

//                     <input
//                      className='w-32 h-10 ms-8 p-2 rounded border-[1px] border-black'
//                       placeholder='From'
//                       type={!isFocusedZoomFrom ? 'text' : 'time'}
//                       onFocus={() => setIsFocusedZoomFrom(true)}
//                       onBlur={() => setIsFocusedZoomFrom(false)}
//                    />
//                    <input
//                      className='w-32 h-10 ms-8 p-2 rounded border-[1px] border-black'
//                       placeholder='To'
//                       type={!isFocusedZoomTo ? 'text' : 'time'}
//                       onFocus={() => setIsFocusedZoomTo(true)}
//                       onBlur={() => setIsFocusedZoomTo(false)}
//                    />

                   
//                     <input
//                      className='w-[300px] h-10 ms-8 p-2 rounded border-[1px] border-black'
//                      placeholder='Zoom URL'
//                      type='text'
//                     />
                    
//                  </div>
//                      <div className= 'w-[20%] h-full'>
//                        <button className='w-[150px] h-12 ms-8 mt-2 bg-[#6EA5FF] text-white rounded-2xl hover:scale-105 hover:bg-[#629bf7]'>
//                          + Add Meeting
//                        </button>
//                     </div>
//                </div>
//            </div>
//            <ZoomMeet/>
//         </div>
//       </div>
    
//   )
// }

// export default page
"use client"
import { useEffect, useState } from 'react';
import React from 'react';
import NavLink from '../../navlink/navlink';
import NavLinkApp from '../NavlinkApp/navlinkApp';
import { BsImage } from 'react-icons/bs';
import ZoomMeet from '@/app/components/configuration/zoomMeet/ZoomMeet';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DeleteZoomMeetPopUp from '@/app/components/configuration/zoomMeet/DeleteZoomMeetPopUp';

function Page() {

  const [zoomMeetId, setZoomMeetId] = useState("")
  const [ isZoomMeetPopUp, setIsZoomMeetPopUp ] = useState(false)
  const [formData, setFormData] = useState({
    zoomdate: '',
    zoomStartTime: '',
    zoomStopTime: '',
    zoomLink: ''
  });

  const [isFocusedZoomFrom, setIsFocusedZoomFrom] = useState(false);
  const [isFocusedZoomTo, setIsFocusedZoomTo] = useState(false);
  const [zoomTableRenderToggle, setZoomTableRenderToggle] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!formData.zoomdate || !formData.zoomStartTime || !formData.zoomStopTime || !formData.zoomLink) {
      toast.error('Please fill all the required fields.');
      return;
    }

    // Format the date to YYYY-MM-DD
    const formattedData = {
      ...formData,
      zoomdate: new Date(formData.zoomdate).toISOString().split('T')[0],
      zoomStartTime: convertTo12HourFormat(formData.zoomStartTime),
      zoomStopTime: convertTo12HourFormat(formData.zoomStopTime)
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/zoom`, formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setFormData({
        zoomdate: '',
        zoomStartTime: '',
        zoomStopTime: '',
        zoomLink: ''
      });
      setZoomTableRenderToggle(prevValue => !prevValue);

      toast.success(response.data.message);
      console.log(response.data);
    } catch (error) {
      toast.error('Failed to add meeting. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto">
      <div className="w-full flex items-center justify-between ">
        <NavLink />
      </div>
      <div className='w-full'>
        <NavLinkApp />
      </div>
      <div className='w-full h-[85%] mt-4 p-4 bg-white rounded-[8px] shadow drop-shadow-md overflow-y-auto'>
        <div className='w-full h-[20%] bg-[#E1E2EB] rounded-md'>
          <p className='text-black font-medium px-2 pt-1'>Create Zoom Meet Link</p>
          <div className='w-full h-full flex'>
            <div className='w-[80%] h-full pt-4 flex'>
              <input
                name="zoomdate"
                className='w-40 h-10 ms-8 p-2 rounded border-[1px] bg-white text-black border-black'
                type='date'
                value={formData.zoomdate}
                onChange={handleChange}
              />
              <input
                name="zoomStartTime"
                className='w-32 h-10 ms-8 p-2 rounded border-[1px] bg-white text-black border-black'
                placeholder='From'
                type={!isFocusedZoomFrom ? 'text' : 'time'}
                onFocus={() => setIsFocusedZoomFrom(true)}
                onBlur={() => setIsFocusedZoomFrom(false)}
                value={formData.zoomStartTime}
                onChange={handleChange}
              />
              <input
                name="zoomStopTime"
                className='w-32 h-10 ms-8 p-2 rounded border-[1px] bg-white text-black border-black'
                placeholder='To'
                type={!isFocusedZoomTo ? 'text' : 'time'}
                onFocus={() => setIsFocusedZoomTo(true)}
                onBlur={() => setIsFocusedZoomTo(false)}
                value={formData.zoomStopTime}
                onChange={handleChange}
              />
              <input
                name="zoomLink"
                className='w-[300px] h-10 ms-8 p-2 rounded border-[1px] bg-white text-black  border-black'
                placeholder='Zoom URL'
                type='text'
                value={formData.zoomLink}
                onChange={handleChange}
              />
            </div>
            <div className='w-[20%] h-full'>
              <button
                onClick={handleSubmit}
                className='w-[150px] h-12 ms-8 mt-2 bg-[#6EA5FF] text-white rounded-2xl hover:scale-105 hover:bg-[#629bf7]'
              >
                + Add Meeting
              </button>
            </div>
          </div>
        </div>
        <ZoomMeet  setZoomMeetId={setZoomMeetId} zoomTableRenderToggle={zoomTableRenderToggle} setIsZoomMeetPopUp={setIsZoomMeetPopUp} />

      </div>
      {
        isZoomMeetPopUp && 
          <DeleteZoomMeetPopUp 
            zoomMeetId={zoomMeetId}  
            setIsZoomMeetPopUp={setIsZoomMeetPopUp}
            zoomTableRenderToggle={zoomTableRenderToggle} 
            setZoomTableRenderToggle={setZoomTableRenderToggle} 
          />
      }
    </div>
  ); 
}

export default Page;
