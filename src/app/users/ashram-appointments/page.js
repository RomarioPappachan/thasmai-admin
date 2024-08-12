"use client"

import React, { useState, useEffect, useRef } from 'react'
import NavLink from '../navlink/navlink'
// import dummyData from './dummy'
import AppointmentsTables from '@/app/components/users/appointmentsTable'
import AppointmentView from '@/app/components/users/ashramAppointmentsView'
import ProfileView from '@/app/components/users/profileView'
import axios from 'axios';
import { useAdminAppointmentStore } from './appointmentState'
import { useAppointmentFilterStore } from "./filterstate";
import { useNavbarTextStore } from '../../state/navbar-state'
import {toast} from 'react-hot-toast';
import FilterChip from "./filterchips";



function Appointments() {

  	const appointmentState = useAdminAppointmentStore((state) => {
  	  	return state;
  	});

  	const filterState = useAppointmentFilterStore((state) => {
  	  	return state;
  	});
	

  	const [selectedId, setSelectedId] = useState(0);
  	const [UId, setUId] = useState(0);
  	const [isviewProfile, setIsViewProfile] = useState(false);

  	const [filterToggle, setFilterToggle] = useState(false);

  	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filteredPageNo, setFilteredPageNo] = useState(1);
	const [isFilteredData, setIsFilteredData] = useState(false);

  	const fieldRef = useRef("")
  	const operatorRef = useRef("")
  	const dataRef = useRef("")
  	const startDateRef = useRef()
  	const endDateRef = useRef()

  	// console.log(appointmentState); 

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Users");

  	useEffect(() => {
    	const fetchData = async () => {
      		try {
          		const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-all-appointment?page=${pageNo}`);
				//   console.log("page use line 29", response.data, appointmentState.appointments);
          			appointmentState.setAppointments(response.data.appointments);
					setTotalPages(response.data.totalPages);
					setIsFilteredData(false);
					setFilteredPageNo(1);
      		} catch (error) {
        		console.error('Error fetching data:', error);
      		}
    	};

    	fetchData();
  	}, [pageNo, filterToggle]);




  	function handleFieldChange(e) {
  	  	const value = e.target.value;
  	  	console.log(value, filterState);
  	  	filterState.setFieldText(value);
  	  	filterState.setOperatorValue("");
  	}


  	function handlePreviousPage() {
    	if(pageNo <= 1) {
        	return;
    	} else {
        	setPageNo(prevValue => prevValue - 1);
    	}
	};

	function handleNextPage() {
    	if(pageNo >= totalPages ) {
        	return;
    	} else {
        	setPageNo(prevValue => prevValue + 1);
    	}
	};

	function handleFilteredPreviousPage() {
    	if(filteredPageNo <= 1) {
        	return;
    	} else {
        	setFilteredPageNo(prevPageNo => {
    			const newPageNo = prevPageNo - 1;
    			handleClickFind(newPageNo);
    			return newPageNo;
  			});
    	}
	};

	function handleFilteredNextPage() {
	    if(filteredPageNo >= totalPages ) {
	        return;
	    } else {
	        setFilteredPageNo(prevPageNo => {
	    		const newPageNo = prevPageNo + 1;
	    		handleClickFind(newPageNo);
	    		return newPageNo;
	  		});
	    }
	};


 	async function handleCheckIn() {

    	console.log("handle Checkin", selectedId);
    	console.log(appointmentState.appointmentStatus, "handle checkin");
    	const fetchData = async () => {
      		try {
          		const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-payment/${selectedId}`, {
            		appointment_status : appointmentState.appointmentStatus
          		});
          		return;
      		} catch (error) {
        		console.error('Error fetching data:', error);
        		return;
      		}
    	};

    	fetchData();
  	};


  	async function handleClickFind (newPageNo) {
    	try {
      		const config = {
        		"Appointment Id": "id",
        		"Name": "user_name",
        		"Appointment Date":"register_date",
        		"Checkin Date":"appointmentDate",
        		"Checkout Date":"check_out",
        		"Status":"appointment_status",


        		"starts with":"like",
        		"equal to": "=",
        		"greater than" : ">",
        		"less than" : "<",
        		"not equalto" : "<>",
      		}
       		console.log(config["starts with"]);
       
      		const filteredData = filterState.filters.map((i,ind) => {
       
        		const field = i.field;
        		const operator = i.operator.toLowerCase();
        		const value = ((i.field.toLowerCase() ==="name")  && (i.operator === "starts with"))  ? `${i.value}%` : i.value;
         		console.log(field,value,operator);
        
         		if(field.includes("Date") && operator === "between") {
          			// SELECT *
          			// FROM users
          			// WHERE registration_date BETWEEN '2024-01-01' AND '2024-03-01';
          			return({
            			field : config[`${field}`],
						 operator: "between", 
						 value: value, 
						 logicaloperator: i.logicaloperator
          			})
         		} 
        
        		return({
          			field : config[`${field}`], 
					operator: config[`${operator}`], 
					value: value, 
					logicaloperator: i.logicaloperator
        		})
      		})
      		filteredData[filteredData.length-1].logicaloperator = "null";
      		console.log(filteredData);   
      
      		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/appointment-query`, {
        		queryConditions: filteredData, 
				page : newPageNo, 
				pageSize: 10
      		})
     		console.log(response,"sdfghnbg");
			appointmentState.setAppointments([...response.data.results]);
			setTotalPages(response.data.totalPages);
			setIsFilteredData(true);
    	}	catch (error) {
      		console.error('Error occurred:', error);
			appointmentState.setAppointments([]);
			toast(error.response.data.message);
    	} 
  	};

 
  	return (
    	<div className="w-full h-[85vh] px-7 overflow-y-auto">
      		<div className="w-full sticky top-0 ">
        		<NavLink />
      		</div>

      		<div className='w-full h-[90%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>

      			<div className="w-full h-8 flex justify-between">

					<div className='w-[65%]  flex'>
  						<select 
  						  	ref = {fieldRef}
  						  	className="px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]"
  						  	onChange={(e) => {
  						  	  	handleFieldChange(e);
  						  	}}
  						>
  						  	<option value="" disabled selected>
  						    	Choose field
  						  	</option>
  						  	{ 
								filterState.FieldValues.map((i,index)=>{
  						    		return (
  						      			<option key = {index} value = {i}> 
  						        			{i}
  						      			</option>
  						    		)
  						  		})
							}
  						</select>
  
  										{/* -----------------operator select--------------- */}
  						{
  						  	filterState.FieldValue === "" && 
						
  						  	<select 
								className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
  						  	  	disabled  
  						  	>
  						  	  	<option value="" disabled selected>
  						  	    	Choose operator
  						  	  	</option>
  						  	</select>
  						}

  						{
  						  	filterState.FieldValue === "Appointment Id" && 
						
  						  	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
  						    	ref = {operatorRef}
  						    	onChange={e => {
  						      		filterState.setOperatorValue(e.target.value)
  						    	}}
  						  	>
  						    	<option value="" disabled selected>
  						      		Choose operator
  						    	</option>
  						    	<option value="equal to">Equal to</option>  
  						  	</select>

  						}

  						{
  						  	filterState.FieldValue === "Name" && 
						
  						  	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
  						    	ref = {operatorRef}
  						    	onChange={e => {
  						      		filterState.setOperatorValue(e.target.value)
  						    	}}
  						  	>
  						    	<option value="" disabled selected>
  						      		Choose operator
  						    	</option>
  						    	{
  						      		filterState.stringOperator.map((i, index) => {
  						        		return (
  						          			<option key={index} value={i}>
  						          			  {i}
  						          			</option>
  						        		);
  						      		})
  						    	}
  						  	</select>
  						}

                        {
                          	filterState.FieldValue === "Appointment Date" && 
                      
                          	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                          	  	ref = {operatorRef}
                          	  	onChange={e => {
                          	  	  	filterState.setOperatorValue(e.target.value)
                          	  	}}
                          	>
                            	<option value="" disabled selected>
                            	  	Choose operator
                            	</option>
                            	{
                            	  	filterState.dateOperator.map((i, index) => {
                            	    	return (
                            	    	  	<option key={index} value={i}>
                            	    	  	  {i}
                            	    	  	</option>
                            	    	);
                            	  	})
                            	}
                          	</select>
                        }

						{
                          	filterState.FieldValue === "Checkin Date" && 
                      
                          	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                          	  	ref = {operatorRef}
                          	  	onChange={e => {
                          	  	  	filterState.setOperatorValue(e.target.value)
                          	  	}}
                          	>
                            	<option value="" disabled selected>
                            	  	Choose operator
                            	</option>
                            	{
                            	  	filterState.dateOperator.map((i, index) => {
                            	    	return (
                            	    	  	<option key={index} value={i}>
                            	    	  	  {i}
                            	    	  	</option>
                            	    	);
                            	  	})
                            	}
                          	</select>
                        }

  						{
  						  	filterState.FieldValue === "Checkout Date" && 
						
  						  	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
  						  	  	ref = {operatorRef}
  						  	  	onChange={e => {
  						  	  	  	filterState.setOperatorValue(e.target.value)
  						  	  	}}
  						  	>
  						  	  	<option value="" disabled selected>
  						  	  	  	Choose operator
  						  	  	</option>
  						  	  	{
  						  	  	  	filterState.dateOperator.map((i, index) => {
  						  	  	    	return (
  						  	  	    	  	<option key={index} value={i}>
  						  	  	    	  	  {i}
  						  	  	    	  	</option>
  						  	  	    	);
  						  	  	  	})
  						  	  	}
  						  	</select>
  						}

  						{
  						  filterState.FieldValue === "Status" && 
						
  						  	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
  						  	  	ref = {operatorRef}
  						  	  	onChange={e => {
  						  	  	  	filterState.setOperatorValue(e.target.value)
  						  	  	}}
  						  	>
  						  	  	<option value="" disabled selected>
  						  	  	  	Choose operator
  						  	  	</option>
  						  	  	<option value="equal to">
  						  	  	  	equal to
  						  	  	</option>
  						  	</select>
  						}

  										{/* ----------------value input/select---------------- */}

  						{
  						  	filterState.FieldValue === "" && (
  						    	<>
  						    	  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black  border-none text-slate-100"'></div>
  						    	  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black border-none text-slate-100"'></div>
  						    	</>
  						  	)
  						}

						{
  						    ( filterState.FieldValue === "Appointment Id" && filterState.operatorValue === "") && 
  						    <>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}

						{ 
							(filterState.FieldValue  === "Appointment Id" && filterState.operatorValue === "equal to") && (
  						    	<>
  						    	  	<input
  						    	        type="text"
  						    	        placeholder="Value" ref = {dataRef}
  						    	        className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
  						    	  	/>
  						    	  	<div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    	</>
  						  	)
  						}

						{
  						    ( filterState.FieldValue === "Name" && filterState.operatorValue === "") && 
  						    <>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}

  						{ 
							(filterState.FieldValue  === "Name" && filterState.operatorValue !== "") && (
  						    	<>
  						    	  	<input
  						    	        type="text"
  						    	        placeholder="Value" ref = {dataRef}
  						    	        className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
  						    	  	/>
  						    	  	<div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    	</>
  						  	)
  						}

  						{
  						  	( filterState.FieldValue === "Appointment Date" && filterState.operatorValue === "") && 
  						    <>
  						      	<div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						      	<div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}
  						{
  						  	( filterState.FieldValue === "Appointment Date" && filterState.operatorValue === "equal to") &&
  						    <>
  						      <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}
  						{   ( filterState.FieldValue === "Appointment Date" && filterState.operatorValue === "between") && 
  						    <>
  						      <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						      <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						    </>
  						}

						{
  						    ( filterState.FieldValue === "Checkin Date" && filterState.operatorValue === "") && 
  						    <>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}
  						{
  						  	( filterState.FieldValue === "Checkin Date" && filterState.operatorValue === "equal to") &&
  						    <>
  						      <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}
  						{   ( filterState.FieldValue === "Checkin Date" && filterState.operatorValue === "between") && 
  						    <>
  						      <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						      <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						    </>
  						}

  						{
  						    ( filterState.FieldValue === "Checkout Date" && filterState.operatorValue === "") && 
  						    <>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}
  						{
  						  	( filterState.FieldValue === "Checkout Date" && filterState.operatorValue === "equal to") &&
  						    <>
  						      <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}
  						{   ( filterState.FieldValue === "Checkout Date" && filterState.operatorValue === "between") && 
  						    <>
  						      <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						      <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
  						    </>
  						}


						{
  						    ( filterState.FieldValue === "Status" && filterState.operatorValue === "") && 
  						    <>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						}

  						{
  						  	( filterState.FieldValue  === "Status" && filterState.operatorValue !== "") && 
  						    <>
  						      	<select className='ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]' ref = {dataRef}>
  						        	<option value="" disabled selected>
  						          		Choose value
  						        	</option>
  						        	{
  						          		filterState.statusValues.map((i, index) => {
  						            		return <option value={i}>
  						              			{i}
  						            		</option>
  						          		}) 
  						        	}
  						      	</select>
  						      	<div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
  						    </>
  						  	
					  
  						}
  
					</div>

									{/* ---------------------------AND / OR button------------------------ */}

					<div className='w-[15%]  flex'>

  						<button 
							className="w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" 
							onClick={(e) => {
    							if(filterState.FieldValue === "" || filterState.operatorValue === "") {
									toast("Please choose a field and an operator to filter")
								} else{
									if(filterState.operatorValue === "between") {
										let startDate = startDateRef.current.value;
										startDate = startDate.split("-");
										startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
									
										let endDate = endDateRef.current.value;
										endDate = endDate.split("-");
										endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

										if(startDate && endDate){
											console.log(startDate, endDate);
									
										    filterState.setFilter({
										    	field : fieldRef.current.value, 
										    	operator : "between", 
										    	value : `${startDate}/${endDate}`, 
										    	logicaloperator: 'and'
											 })
										} else{
											toast("Please select start date and end date to filter")
										}
									
										
									} else if(filterState.FieldValue.includes("Date") && filterState.operatorValue === "equal to") {
										let date = dataRef.current.value;
										date = date.split("-");
										date = `${date[0]}-${date[1]}-${date[2]}`;

										if(dataRef.current.value) {
											filterState.setFilter({
												field : fieldRef.current.value, 
												operator : operatorRef.current.value, 
												value : `${date}`, 
												logicaloperator: 'and'
											})
										} else{
											toast("Please select a date to filter")
										}
									

									} else {
										const val = dataRef.current.value
										if(val){
											filterState.setFilter({
												field : fieldRef.current.value, 
												operator : operatorRef.current.value, 
												value : dataRef.current.value, 
												logicaloperator: 'and'
											})
										} else{
											toast("Please input a value to filter")
										}
										
									}
								}
    						}}
  						>
    						AND
  						</button>

  						<button 
							className="ms-3 w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" 
							onClick={(e) => {
								if(filterState.FieldValue === "" || filterState.operatorValue === "") {
									toast("Please choose a field and an operator to filter")
								} else{
									if(filterState.operatorValue === "between") {
										let startDate = startDateRef.current.value;
										startDate = startDate.split("-");
										startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
									
										let endDate = endDateRef.current.value;
										endDate = endDate.split("-");
										endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

										if(startDate && endDate){
											console.log(startDate, endDate);
									
										    filterState.setFilter({
										    	field : fieldRef.current.value, 
										    	operator : "between", 
										    	value : `${startDate}/${endDate}`, 
										    	logicaloperator: 'or'
											 })
										} else{
											toast("Please select start date and end date to filter")
										}
									
										
									} else if(filterState.FieldValue.includes("Date") && filterState.operatorValue === "equal to") {
										let date = dataRef.current.value;
										date = date.split("-");
										date = `${date[0]}-${date[1]}-${date[2]}`;

										if(dataRef.current.value) {
											filterState.setFilter({
												field : fieldRef.current.value, 
												operator : operatorRef.current.value, 
												value : `${date}`, 
												logicaloperator: 'or'
											})
										} else{
											toast("Please select a date to filter")
										}
									

									} else {
										const val = dataRef.current.value
										if(val){
											filterState.setFilter({
												field : fieldRef.current.value, 
												operator : operatorRef.current.value, 
												value : dataRef.current.value, 
												logicaloperator: 'or'
											})
										} else{
											toast("Please input a value to filter")
										}
										
									}
								}
    						}}
  						>
  						  	OR
  						</button>

					</div>
              							{/* --------------Find button---------------- */}

					<div className='w-[20%] h-full text-right'>						
					  	<button 
							className="px-6 h-8 text-[12px] bg-[#005DB8] rounded-xl text-white font-semibold shadow-lg" 
							onClick={() => { 
								console.log('clicked');
								handleClickFind();
							}}
						>
					    	Find
					  	</button>
					</div>

				</div>
  


  										{/* ------------------Fiterchips div ------------------- */}

        		<div className="w-full h-[10%] bg-[#005DB8] overflow-y-auto shadow my-5 flex flex-wrap items-center snap-mandatory snap-y py-2 px-2">
								
        		  	{ 
        		  	  	filterState.filters[0] ? (
        		  	    filterState.filters.map((i, index) => {
        		  	      	return (
        		  	      	  <FilterChip filter = {i} index= {index} setFilterToggle={setFilterToggle} filterToggle={filterToggle} />
        		  	      	)
        		  	    })
					  
        		  	  	) : (
        		  	    	<p className="ms-3 text-[#94a3b8] font-light">No filters applied</p>
        		  	  	)
        		  	}
		
        		</div>



        		<div className='w-full h-[80%] mt-2'>

          			<div className="w-full h-[85%] m-0 p-0 overflow-scroll">
          			  	<AppointmentsTables 
							setSelectedId={setSelectedId} 
							handleCheckIn= {handleCheckIn} 
							setUId={setUId} 
							setIsViewProfile={setIsViewProfile}
							
						/>		
          			</div>


          			<div className="w-full h-[10%] px-2 flex justify-between items-center">
            			<div>
            			  	{
            			  	  	!isFilteredData ? (
            			  	    	<p className="text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
            			  	  	) : (
            			  	  	  	<p className="text-sm text-gray-500">Page { filteredPageNo } of { totalPages }</p>
            			  	  	)
            			  	}
            			</div>
            			{
            			  	!isFilteredData ? (
            			    	<div>
            			    	  <button
            			    	    className="w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
            			    	    onClick={ handlePreviousPage }
            			    	  >Previous</button>
            			    	  <button
            			    	    className="w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
            			    	    onClick={ handleNextPage }
            			    	  >Next</button>
            			    	</div>
            			  	) : (
            			    	<div>
            			    	  <button
            			    	    className="w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
            			    	    onClick={ handleFilteredPreviousPage }
            			    	  >Previous</button>
            			    	  <button
            			    	    className="w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
            			    	    onClick={ handleFilteredNextPage }
            			    	  >Next</button>
            			    	</div>
            			  	)
            			}

          			</div>
        		</div>


      		</div>


      		{
      		  	appointmentState.viewAppointment && <AppointmentView selectedId={selectedId}  />   
      		}
		
      		{
      		  	isviewProfile && <ProfileView selectedId={selectedId} UId={UId} setIsViewProfile={setIsViewProfile}/>
      		}
      
    	</div>

  	)
}

export default Appointments