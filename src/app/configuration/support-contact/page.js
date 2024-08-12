"use client"

import React, { useState, useEffect } from 'react'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state'
import SupportContactConfigTable from '@/app/components/configTable/configSupportContact'
import axios from "axios";
import toast from "react-hot-toast";
import dummyData from './dummy';


function SupportContact() {

	const [createSupport, setCreateSupport] = useState({
		Name : "",
		Role : "",
		PhoneNo : "",
	});
	const [renderTableToggle, setRenderTableToggle] = useState(false);
	console.log(createSupport);

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Configuration parameters");


	function  handleCreateSupport(event) {
		const { name, value } = event.target;
		setCreateSupport(prevValue => (
			{
				...prevValue,
				[name] : value
			}
		))
	}

	async function handleSubmit() {
		if(createSupport.Name && createSupport.Role && createSupport.PhoneNo) {
			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/addSupport`, {
					Name : createSupport.Name,
					Role : createSupport.Role,
					PhoneNo : createSupport.PhoneNo
				});
				// console.log(response);
				toast.success("Successfully added personnel for development support.");
				setCreateSupport({
					Name : "",
					Role : "",
					PhoneNo : ""
				})
				setRenderTableToggle(!renderTableToggle);
				
			} catch (error) {
				// console.error("Error fetching data:", error);
				toast.error("Error adding personnel for development support.")
			}	
		} else {
			toast("Enter the required fields.");
		}
		
	}


  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto">

      <div className="w-full flex items-center justify-between ">
        <NavLink />
      </div>
      <div className='w-full h-[90%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
        <div className='flex w-full h-[10%]'>
          <input 
          	type='text'
            className='h-[80%] px-2 bg-[#aeaeae89] rounded-lg text-black placeholder:text-black focus:outline-none'
			placeholder='Name'
			name="Name"
			value={createSupport.Name}
			onChange={handleCreateSupport}
		  />
          <input 
		  	type='text' 
		    className='h-[80%] px-2 ms-6 bg-[#aeaeae89] rounded-lg  text-black placeholder:text-black focus:outline-none'
			placeholder='Role'
			name="Role"
			value={createSupport.Role}
			onChange={handleCreateSupport}
		  />
          <input 
		 	 type='number' 
			 className='h-[80%] px-2 ms-6 bg-[#aeaeae89] rounded-lg text-black placeholder:text-black focus:outline-none'
			 placeholder="Phone number"
			 name="PhoneNo"
			 value={createSupport.PhoneNo}
			 onChange={handleCreateSupport}
		  />
          <button 
		  	className='h-[80%] w-28 ms-6 text-white rounded-lg bg-[#5799FD]'
			onClick={handleSubmit}
		  >
			Submit
		  </button>
        </div>
          <SupportContactConfigTable renderTableToggle={renderTableToggle} setRenderTableToggle={ setRenderTableToggle} />
          {/* <div className='w-full h-[10%] pe-10 flex justify-end'>
            <button className='w-[120px] h-[35px] bg-[#005DB8] text-[14px] text-white rounded me-3'>Back</button>
            <button className='w-[120px] h-[35px] bg-[#005DB8] text-[14px] text-white rounded'>Next</button>
          </div> */}
      </div>
    </div>
  )
}

export default SupportContact