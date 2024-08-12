"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios';


function ViewBroadcastMessage(props) {

    const [messageData, setMessageData] = useState({});

    useEffect(() => {
    	const fetchData = async () => {
      		try {
          		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/get-notificationbyid/${props.selectedMessageId}`);
                    console.log(response);
                    setMessageData(response.data.notification);					
      		} catch (error) {
        		console.error('Error fetching data:', error);
      		}
    	};

    	fetchData();
  	}, []);

  return (
    <div className="w-screen h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px]">
        <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    props.setViewBroadcastMessage(false);
                }}
        >+</button>

                            {/* Message Details */}

        <div className='w-full md:w-[750px] min-h-[90vh] md:min-h-0 md:h-[600px] bg-white'>
            <div className='w-full h-[10%] px-8 bg-[#005DB8] text-white flex items-center'>
                <p className='font-medium text-xl'>Broadcast sent : {messageData.title}</p>
            </div>
            <div className='w-full h-[90%] p-8'>
                <p className='text-black'>Date of broadcast : &nbsp; &nbsp; &nbsp; &nbsp;  <span className='font-medium'>{messageData.Date}</span></p>
                <p className='mt-5 text-black'>Message</p>
                <div className='w-full h-[80%] mt-2 p-4 bg-[#E0E2EC] text-black rounded-xl overflow-y-auto'>
                    <p className='w-full'>{ messageData.message }</p>
                </div>

            </div>
        </div>

</div>
  )
}

export default ViewBroadcastMessage