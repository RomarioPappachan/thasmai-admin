"use client";
 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMahadhanamFilterStore } from "@/app/users/maha/filterstate";
import RefPopTable from "./RefPopTable";
import toast from "react-hot-toast";
 
 
const RefPop = ({ refUserId }) => {
 
    const[refdetails, setRefDetails] = useState([])
 
    const filterState = useMahadhanamFilterStore((state) => {
        return state;
    });
 
 
    useEffect(() => {
 
        (async function() {
 
            try {
                const response= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/findrefs`, {
                    UserId: refUserId
                })
 
                setRefDetails([...response.data.refs])
 
            } catch (error) {
                // toast.error("Error loading data.")
                console.log("Error", error);
            }
 
 
        })()
    }, []);
 
 
 
    return (
        <div className="w-screen h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px]">
            <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    filterState.setRefPopData(false);
                }}
            >+</button>
 
            <RefPopTable data={refdetails} filterState={filterState}/>
        </div>
    );
 
};
 
export default RefPop;