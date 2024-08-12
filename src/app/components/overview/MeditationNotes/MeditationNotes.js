"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function MeditationNotes() {

    const [impNotes, setImpNotes] = useState([]);
    console.log(impNotes);

    useEffect(() => {

        const fetchData = async () => {
            try {
    
              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/impNotes`);
            //   console.log(response,"imp message");
              setImpNotes(response.data);
    
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
        <>
            {
                impNotes[0] ? (

                    impNotes.map((note, index) => {
                        return(
                            <div
                                // className={(index % 2 === 0) ? "w-full min-h-[80px] bg-red-400 mb-2 rounded flex" : "w-full min-h-[80px] bg-blue-400 mb-2 rounded flex"}
                                className="w-full min-h-[80px] bg-gray-300 mb-2 rounded flex border-gray-400 border-[0.1px]"
                            >
                                <div className="w-full">
                                    <div className="flex justify-between ps-2 pt-2">
                                        <div className="text-[14px] p-1 font-medium text-blue-700 bg-blue-gray-100 rounded">{note.userName}</div>
                                        <div className="pe-2 text-[10px] font-normal text-black">{note.messageDate}, {note.messageTime}</div>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-xs text-black">{ note.message }</p>
                                    </div>
                                </div>
                            </div>

                        );
                    })
                    
                ) : (
                    <div className='w-full h-full text-white bg-red-300 flex justify-center items-center'>
                        No priority messages to display
                    </div>
                ) 
            }



        </>
    )
}

export default MeditationNotes