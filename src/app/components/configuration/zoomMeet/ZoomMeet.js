"use client";

import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
// import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ZoomMeet(props) {

    const [zoomMeetData, setZoomMeetData] = useState([]);

    useEffect(() => {
        const fetchData = async () => { 
          
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-zoomclass`);
                console.log(response);
                setZoomMeetData(response.data);
                
            } catch (error) {
                toast.error('Error loading zoom meeting data.');
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, [props.zoomTableRenderToggle]);


  return (
    <div className='w-full h-full mt-4 overflow-y-auto'>
            <table className='w-full sticky top-0'>
                <thead className='w-full h-12 bg-[#C5D8FF] text-black '>
                    <tr>
                        <th className='w-[] text-start ps-2'>Sl No.</th>
                        <th className='w-[] text-start'>Date</th>
                        <th className='w-[] text-start'>From</th>

                        <th className='w-[] text-start'>To</th>
                        <th className='w-[] text-start'>URL</th>

                        <th className='w-[] px-2 text-start'>Delete</th>
                    </tr>
                </thead>
                <tbody className='w-full bg-[#F9F9FF] border-b-2 border-[#C1C6D4] text-black'>

                    {
                        zoomMeetData[0] ? (
                            zoomMeetData.map((zoomMeet, index) => {
                                return (
                                    <tr 
                                        key={index}
                                        className='h-12 border-b-[1px] border-[#eeeeee]' 
                                    >
                                        <td className='ps-2'>{ index + 1 }</td>
                                        <td>{ zoomMeet.zoomdate }</td>
                                        <td>{ zoomMeet.zoomStartTime }</td>
                                        <td>{ zoomMeet.zoomStopTime }</td>
                                        <td className='text-[#7698ef] hover:text-[#005DB8]'>
                                            <a href={ zoomMeet.zoomLink } target="_blank">{ zoomMeet.zoomLink }</a>
                                        </td>
                                        <td className=''>
                                            <RiDeleteBin6Line className='text-2xl cursor-pointer hover:text-red-500'
                                                onClick={() => {
                                                    props.setZoomMeetId(zoomMeet.id);
                                                    props.setIsZoomMeetPopUp(true)
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })

                        ) : (
                            <tr className='h-12'>
                                <td>No data to display</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )
                        
                    }
                    
                </tbody>
                
            </table>

         </div>
  )
}

export default ZoomMeet