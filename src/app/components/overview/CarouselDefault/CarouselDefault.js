"use client"

import React, {useState, useEffect } from 'react';
import Link from "next/link";
import axios from 'axios';
import { Carousel } from "@material-tailwind/react";
 
export default function CarouselDefault() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/listevents`);
            console.log(response.data.events);
            setEvents(response.data.events);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);




  return (
    <Carousel className="rounded w-full h-[85%]" autoplay="true" autoplayDelay="3000" loop="true"
        settings={{
            navigationType: "buttons", // Ensure that navigationType is set to "buttons"
            prevButtonClasses: "bg-blue-500 text-white", // Customize the style of the previous button
            nextButtonClasses: "bg-green-500 text-white", // Customize the style of the next button
        }}
 
    >

        {
            events[0] ? (
                events.map((i, index) => {
                    return (
                        <Link href="/events/events" className="w-full h-full">
    
                            <div className="h-full flex justify-center items-center bg-gray-300">
                                <div className="w-[35%] h-full flex justify-end items-center pe-5">
                                    <img className="w-[90px] h-[90px] md:w-32 md:h-32 object-cover" src={i.image} alt="" />
                                </div>
                                <div className="w-[65%] h-full text-left text-[14px] font-bold flex flex-col justify-center">
                                    <div className="flex justify-start h-8 pe-1">
                                        <h3 className='text-black text-sm md:text-base text-nowrap overflow-hidden'>{i.event_name}</h3>
                                        <div className="w-20 h-5 ms-3 px-2 text-sm md:text-base bg-[#FF7979] text-white font-normal rounded-xl  flex justify-center items-center">{i.priority}</div>
                                    </div>
                                    <p className="text-[#A4A4A4] text-xs md:text-base">{i.event_description.substring(0,30) + "..." }</p>
                                    <p className="text-[#1A69A6] text-xs md:text-base">{i.place}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })

            ) : (
                <div className='w-full h-full bg-blue-gray-400 flex justify-center items-center'>
                    No events to display
                </div>
            )
			



        }

        

    </Carousel>
  );
}