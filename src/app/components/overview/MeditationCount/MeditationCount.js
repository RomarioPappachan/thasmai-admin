"use client"

import React, { useState, useEffect} from 'react'
import Link from "next/link";
import axios from "axios";


function MeditationCount() {
    const [role, setRole] = useState('');

    const [newJoineesCount, setNewJoineesCount] = useState(0);
    const [beneficiariesCount, setBeneficiariesCount] = useState(0);
    const [totalMeditatorsCount, setTotalMeditatorsCount] = useState(0);
    const [waitingListCount, setWaitingListCount] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
                setRole('')
                let role_text = localStorage.getItem('userdata');
                console.log("Role from local storage:", role_text); // Log the role_text to check if it's retrieved correctly
                if (role_text) {
                  const parsedRole = JSON.parse(role_text).role; // Parse the role from the stored userdata
                  console.log("Parsed role:", parsedRole); // Log the parsed role to check its value
                  setRole(parsedRole); // Set the role state
                }
        
            try {
                const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/this-month`);
                // console.log(response1);
                setNewJoineesCount(response1.data.count);   
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }


            try {
                const response2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/beneficiaries`);
                // console.log(response2);
                setBeneficiariesCount(response2.data.list);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const response3 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/meditation`);
                // console.log(response3);
                setTotalMeditatorsCount(response3.data.count);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const response4 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/waiting-list`);
                // console.log(response4.data.list);
                setWaitingListCount(response4.data.list);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
    
        fetchData();
    }, []);
    

  return (
    <>
        <div className="w-full md:w-[22%] md:h-[80%] px-10 py-5 md:p-2 mb-2 md:m-0 flex items-center bg-white rounded-xl shadow-md">
            <Link 
                href={(role === 'operator' || role === "Operator") ? "/overview" : "/waitinglist/newJoinees"} 
                className="w-full flex items-center"
            >
                <div className="w-[25%] p-3 rounded-full bg-[#A2BCFF]">
                    <img className="w-full rounded-full" src="/admin/new-joinees.png" alt="" />       
                </div>
                <div className="w-[75%] ps-2">
                    <h3 className="text-[32px] md:text-[28px] text-black font-medium">{ newJoineesCount }</h3>
                    <p className="text-[20px] md:text-[16px] text-gray-400 font-medium">New Joinees</p>
                </div>
            </Link>
        </div>

        <div className="w-full md:w-[22%] md:h-[80%] px-10 py-5 md:p-2 mb-2 md:m-0 flex items-center bg-white rounded-xl shadow-md">
            <Link 
                href={(role === 'operator' || role === "Operator") ? "/overview" : "/waitinglist/beneficiaries"} 
                className="w-full flex items-center"
            >
                <div className="rounded-full bg-[#A2BCFF] w-[25%] p-3">
                    <img className="w-full" src="/admin/beneficiary.png" alt="" />

                </div>
                <div className="w-[75%] ps-2">
                    <h3 className="text-[32px] md:text-[28px] text-black font-medium">{ beneficiariesCount }</h3>
                    <p className="text-[20px] md:text-[16px] text-gray-400 font-medium">Beneficiaries</p>
                </div>
            </Link>
        </div>

        <div className="w-full md:w-[22%] md:h-[80%] px-10 py-5 md:p-2 mb-2 md:m-0 flex justify- items-center bg-white rounded-xl shadow-md">
            <Link 
                href={(role === 'operator' || role === "Operator") ? "/overview" : "/users/meditatorlist"} 
                className="w-full flex items-center"
            >
                <div className="rounded-full bg-[#A2BCFF] w-[25%] p-3">
                    <img className="w-[100%]" src="/admin/total-meditators.png" alt="" />   
                </div>
                <div className="w-[75%] ps-2">
                    <h3 className="text-[32px] md:text-[28px] text-black font-medium">{ totalMeditatorsCount }</h3>
                    <p className="text-[20px] md:text-[16px] text-gray-400 font-medium">Total Meditators</p>
                </div>
            </Link>
        </div>
        
        <div className="w-full md:w-[22%] md:h-[80%] px-10 py-5 md:p-2 mb-2 md:m-0 flex justify- items-center bg-white rounded-xl shadow-md">
            <Link 
                href={(role === 'operator' || role === "Operator") ? "/overview" : "/waitinglist/waitinglist"} 
                className="w-full flex items-center"
            >
                <div className="rounded-full bg-[#A2BCFF] w-[25%] p-3">
                    <img className="w-[100%]" src="/admin/waiting-list.png" alt="" />    
                </div>
                <div className="w-[75%] ps-2">
                    <h3 className="text-[32px] md:text-[28px] text-black font-medium">{ waitingListCount }</h3>
                    <p className="text-[20px] md:text-[16px] text-gray-400 font-medium">Waiting List</p>
                </div>
            </Link>
        </div>    
    </>
  )
}

export default MeditationCount