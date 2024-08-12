"use client"

import React, { useState, useEffect } from 'react';
import { useEventFilterStore } from "@/app/events/events/filterstate";
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";


function EventDetailsTable(props) {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const filterState = useEventFilterStore((state) => {
    return state;
  });


  useEffect(() => {
    const fetchData = async () => {
    
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/events?page=${props.pageNo}`);
      		  filterState.setEventsData(response.data.events);
      		props.setTotalPages(response.data.totalPages);
      		props.setIsFilteredData(false);
      		props.setFilteredPageNo(1);
			    console.log(response);

        } catch (error) {
            // console.error('Error fetching data:', error);
      		toast.error("Error fetching data.");
        }
    };

    fetchData();
}, [props.pageNo, props.filterToggle]);


  
  return (
  
   
      <table className="table">
        <thead className="bg-[#5799FD] sticky top-0">
          <tr className="min-w-full h-12 text-[10px] md:text-sm text-left bg-[#5799FD] text-white">
            <th className="text-center">Date</th>
            <th className="text-center">Event Name</th>
            <th className="text-center">Location</th>
            <th className="text-center">Time</th>
            <th className="text-center">Priority</th>
            <th className="text-center"></th>
            <th className="text-center"></th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody className="my-10 text-black">
          {
            filterState.eventsData.map(event => (
            <tr key={event.id} className='text-[10px] md:text-xs border-b-[1px] border-[#eeeeee]'>
              <td className="text-center">{event.date}</td>
              <td 
                title="View event details"
                className="text-center font-semibold cursor-pointer hover:text-[#5799FD] hover:scale-105"
                onClick={() => {
                  props.setEventId(event.id);
                  props.setIsViewEvent(true);
                }}
              >
                {event.event_name}
              </td>
              <td className="text-center">{event.place}</td>
              <td className="text-center">{event.event_time}</td>
              <td className="text-center">{event.priority}</td>
              <td className="text-center" title="Edit event">
                <button onClick={() => {
                  props.setEventId(event.id);
                  props.setEditEvent(true);
                }}>
                  <TbEdit className='text-2xl text-blue-600 hover:bg-slate-200 hover:scale-110'/>
                </button>
              </td>
              <td className="text-center" title="Delete event">
                <button onClick={() => {
                  props.setEventId(event.id); 
                  props.setIsDeleteEvent(true);
                }}>
                  <RiDeleteBin6Fill className='text-2xl text-red-600 hover:text-red-700 hover:bg-slate-200 hover:scale-110'/>
                </button>
              </td>
              <td className="text-center">
                <button 
                  title="View event details"
                  className='w-28 h-8 bg-[#5799FD] text-white rounded-xl hover:scale-105'
                  onClick={() => {
                    props.setEventId(event.id);
                    props.setIsViewEvent(true);
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    

    



  );
}

export default EventDetailsTable;

