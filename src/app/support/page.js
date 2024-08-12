"use client"

import React, { useState, useEffect } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavbarTextStore } from '../state/navbar-state';


export default function Users() {

	const [developers, setDevelepors] = useState([]);
	console.log(developers);

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Support & Contact");

  	useEffect(() => {
    
    	const fetchData = async () => {
     		try {
        		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/support`);
        		// console.log(response);
        		setDevelepors(response.data.support);
      		} catch (error) {
        		console.error("Error fetching data:", error);
				toast.error("Error fetching data.");
      		}
    	};

    	fetchData();

  	}, []);
    

    return (
        <div className="w-full h-[85vh] md:px-7 overflow-y-auto">

      		<div className='w-full h-[95%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>

          		<div className=' w-full h-[15%] ps-10 flex items-center bg-blue-400 bg-gradient-to-r from-[#a5e1e282] to-[#d5ccc798]'>
            		<h1 className='font-semibold text-2xl text-white '>Get Support</h1>
          		</div>
          		<div className='w-full h-[85%] p-5 md:p-10 flex flex-wrap justify-evenly bg-gradient-to-r from-[#a5e1e282] to-[#d5ccc798] overflow-y-auto'>

					{
						developers[0] && 
						developers.map((dev, index) => {
							return (
								<div className='w-80 h-32 p-4 mb-2 bg-[#ffffff8b] rounded drop-shadow-lg'>
                	        		<h1 className='font-medium text-black text-xl'>{ dev.Name }</h1>
                	        		<p className='mt-2 text-black text-2xl'>{ dev.PhoneNo }</p>
                	        		<p className='text-[#959595]'>{ dev.Role }</p>
                				</div>
							);
						})
					}

          		</div>
      		</div>
    	</div>
    );

}