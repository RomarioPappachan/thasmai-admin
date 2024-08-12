"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useApplicationFeedbackStore } from '@/app/feedback/applicationFeedback/ApplicationFeedbackState';


function ApplicationFeedbackView() {

    const feedbackState = useApplicationFeedbackStore((state) => {
        return state;
    });
    
    const [data, setData] = useState([]);
    console.log(data);
    console.log(feedbackState.id);
    
    useEffect(() => {
        
        const fetchData = async () => {
          try {
              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/app-feedback-by-id/${feedbackState.id}`);
            console.log(response);
              setData(response.data.feedbackWithUsernames);
            
  
          } catch (error) {
            console('Error fetching data:', error);
            toast(error.response.data.message);
          }
        };
    
        fetchData();

        return () => {
            return;
        }

      }, []);


    
  return (
    <div className="w-[100vw] h-[100vh] px-2 md:p-0 absolute top-0 left-0 bg-[#00000096] backdrop-blur-sm flex justify-center items-center">
        
        <div className="w-full h-[80vh] md:w-[800px] md:h-[600px] relative rounded-xl">
            <button 
                className="w-8 h-8 text-white text-2xl font-bold hover:bg-white hover:text-[#005DB8] absolute top-[15px] right-[15px]"
                onClick={() => {
                    feedbackState.setFeedbackViewToggle(false, undefined);
                }}
            >X</button>

            <div className="w-full h-[15%] ps-10 text-[#d4d8e3] bg-[#005DB8] text-lg font-thin flex items-center">
                Feedback from:
                <h1 className="text-xl text-[#ffffff] font-bold ms-5"> { data[0] && data[0].username }</h1>
            </div>

            <div className="w-full h-[85%] p-10 bg-white shadow-md overflow-y-auto">
                {/* <div className='w-[220px] h-[10%] flex'>
                    <p className='w-[50%] text-[#44474E]'>Date</p>
                    <p className='w-[50%] font-medium'>: { data.check_out }</p>
                </div> */}
                <div className='w-[220px] h-[10%] flex'>
                    <p className='w-[50%] text-[#44474E]'>Rating</p>
                    <p className='w-[50%] text-black font-medium'>: {data[0] && data[0].rating }</p>
                </div>
                <div className='h-[80%]'>
                    <p className='w-[50%] h-[10%] text-[#44474E]'>Message :</p>
                    <div className='h-[90%] p-4 bg-[#E0E2EC] rounded-[10px] overflow-y-auto'>
                        <p className="text-black">{data[0] && data[0].feedback }</p>
                    </div>
                </div>
            </div>

        </div>


    </div>
  )
}

export default ApplicationFeedbackView