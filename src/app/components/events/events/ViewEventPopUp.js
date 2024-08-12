"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled, MdLocationPin } from "react-icons/md";

function ViewEventPopUp(props) {

    const [eventData, setEventData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {

                const eventId = props.eventId;

              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-event/${eventId}`);
              console.log(response.data.user);

              setEventData(response.data.user);

            } catch (error) {
              console.error("Error fetching data:", error);
            }
      
        };
      
        fetchData();
    
        return () => {
            return;
        }
    }, []);
    


  return (
    <div className="w-screen min-h-screen md:h-screen px-2 py-10 md:p-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
      <div className='w-full md:w-[1000px] md:h-[550px] bg-[#D9D9D9] rounded'>

        <div className='w-full h-16 md:h-[10%] px-5 md:px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
          <h1 className='text-sm md:text-xl text-white font-bold'>{ eventData.event_name }</h1>
          <button 
            className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
            onClick={() => {
              props.setIsViewEvent(false);
            }}
          >X</button>
        </div>

        <div className='w-full md:h-[90%] py-3 md:p-10 rounded-b flex flex-col md:flex-row'>

            <div className='w-full md:w-[40%] h-full px-5'>
                <img
                    className='w-full h-[200px] object-cover rounded drop-shadow-md' 
                    src={ eventData.image ? eventData.image : "/admin/profile_dummy.jpeg" }
                    alt='Event Image'
                />

                <div className='w-full mt-5 flex flex-col md:flex-row'>
                    <div className='w-full md:w-[50%]'>
                        <p className='flex items-center mb-2 text-blue-600'>
                            <BsCalendarDateFill className='me-2 text-xl'/>
                            { eventData.date }
                        </p>
                        <p className='flex items-center mb-2 text-blue-600'>
                            <MdAccessTimeFilled className='me-2 text-xl'/>
                            { eventData.event_time }
                        </p>
                    </div>
                    <div className='w-full md:w-[50%]'>
                        <p className='w-full flex items-center md:justify-end text-blue-600'>
                            <MdLocationPin className='me-2 text-2xl md:text-4xl'/>
                            { eventData.place }
                        </p>
                    </div>
                </div>
            </div>

            <div className='w-full md:w-[60%] mt-2 md:mt-0 h-full overflow-y-auto'>
                <p className='w-full px-5 md:px-0 md:ps-10 text-black'>{ eventData.event_description }</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEventPopUp
