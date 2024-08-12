"use client"

import React, { useState,useEffect } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import axios from 'axios'


function MeditationTimeConfigTable(props) {

 

  // const [editableId, setEditableId] = useState(null);

  return (
    <div className="w-full mt-10 overflow-scroll h-[90%]">
      <p className='text-black font-medium mt-4'>Meditation Time & Video Details By Country</p>
      <table className="table rounded-3xl mt-4">
        <thead
          className="w-full h-[50px] bg-[#005DB8] text-white sticky top-0 gap-x-20 text-[0.9rem]"
          style={{ borderRadius: "11px" }}
        >
          <tr className="rounded-3xl">
            <th className="text-left w-[10%]">Sl.No.</th>
            <th className="text-left w-[20%]">Country</th>
            <th className="text-left w-[25%]">General Video</th>
            <th className="text-left w-[10%]">Morning Meditation Video</th>
            <th className="text-left w-[25%]">From</th>
            <th className="text-left w-[25%]">To</th>
            <th className="text-left w-[10%]">Evening Meditation Video</th>
            <th className="text-left w-[25%]">From</th>
            <th className="text-left w-[25%]">To</th>
            <th className="text-left w-[25%]">Edit</th>



          </tr>
        </thead>
        <tbody className="my-10 font-medium text-xs  border-b-2 border-[#C1C6D4]">

         
          
          {
                        props.meditationTime[0] ? (
                          props.meditationTime.map((meditationTime, index) => {
                                return (
                                    <tr 
                                        key={index}
                                        className='h-12 text-black border-b-[1px] border-[#eeeeee]' 
                                    >
                                        <td className='ps-2'>{ index + 1 }</td>
                                        <td>{ meditationTime.country }</td>
                                        <td className='text-[#7698ef] hover:text-[#005DB8]'>
                                        <a href={ meditationTime.general_video } target="_blank">{ meditationTime.general_video }</a>
                                        </td>
                                        <td className='text-[#7698ef] hover:text-[#005DB8]'>
                                          <a href={ meditationTime.morning_video } target="_blank">{ meditationTime.morning_video }</a>
                                        </td>
                                        <td>{ meditationTime.morning_time_from }</td>
                                        <td>{ meditationTime.morning_time_to }</td>
                                        <td className='text-[#7698ef] hover:text-[#005DB8]'>
                                          <a href={ meditationTime.evening_video } target="_blank">{ meditationTime.evening_video }</a>
                                        </td>
                                        <td>{ meditationTime.evening_time_from }</td>
                                        <td>{ meditationTime.evening_time_to }</td>
                                        <td><MdOutlineEdit className='text-2xl cursor-pointer hover:text-blue-500'
                                                  onClick={() => {
                                                         props.setEditMeditationTimePopUp(true)
                                                         props.setMeditationTimeId(meditationTime.id)
                                                      }}
                                        /></td>
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

export default MeditationTimeConfigTable