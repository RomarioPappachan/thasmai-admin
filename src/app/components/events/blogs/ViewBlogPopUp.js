"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BsCalendarDateFill } from "react-icons/bs";
import { MdAccessTimeFilled, MdLocationPin } from "react-icons/md";

function ViewBlogPopUp(props) {

    const [blogData, setBlogData] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {

                const blogId = props.blogId;

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-blog/${blogId}`);
                console.log(response);
                setBlogData(response.data.user);

            } catch (error) {
              console.error("Error fetching data:", error);
            }
      
        };
      
        fetchData();
    
        return () => {
            return;
        }
    }, []);


    // Formatting date for display
    // Given date string in ISO format
    const isoDateString = blogData.createdAt;

    // Create a Date object from the ISO string
    const date = new Date(isoDateString);

    // Function to format the date and time as required
    function formatDate(date) {
        // Get individual date components
        const day = String(date.getUTCDate()).padStart(2, '0');
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getUTCMonth()]; // Get month name
        const year = date.getUTCFullYear();

        // Get individual time components
        let hours = date.getUTCHours();
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');

        // Determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Format time part
        const formattedTime = `${hours}:${minutes} ${ampm}`;

        // Format date part
        const formattedDate = `${day} ${month} ${year}`;

        // Combine the formatted date and time
        return `${formattedDate}, ${formattedTime}`;
    }

    // Get the formatted date string
    const formattedDateString = formatDate(date);
    console.log(formattedDateString); // Output: "13 June 2024, 5:28, AM"

    


    return (
        <div className="w-screen h-screen p-5 flex flex-col justify-center items-center absolute top-0 left-0 bg-[#000000d2] backdrop-blur-[1px]">
            <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    props.setIsViewBlog(false);
                }}
            >+</button>

            
            <div className='w-[80%] h-full pt-5 bg-white overflow-scroll'>
                <div className='w-full h-[20%] p-4 px-6 border-l-8 border-[#f1bb00]'>
                    <h1 className='w-full text-4xl font-bold text-black'>{ blogData.blog_name }</h1>
                    <p className='mt-2'><i>{ formattedDateString }</i></p>
                </div>
                <div className='w-full h-[50%] mt-5 flex justify-center items-center'>
                    <img 
                        className="max-w-[85%] h-full object-cover border-2 border-white"
                        src={ blogData.image } alt="Blog Image" 
                    />
                </div>
                <div className='w-full mt-5 px-16 py-10 bg-[#fffcf0] border-b-2 border-[#f1bb00]'>
                    <p className='text-black'>{ blogData.blog_description }</p>
                </div>

            </div>


            
            
            
            {/* <div className="w-full h-[15%] p-5 flex justify-center items-center text-white overflow-scroll">
                <p className="w-full h-full text-center font-bold">
                    { data.Date }, { data.expenseType }, ₹ { data.amount }, <span className="font-light">{ data.description }</span>
                </p>
            </div> */}
    
        </div>
    )
}

export default ViewBlogPopUp