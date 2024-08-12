"use client"

import React, { useEffect, useState, useRef } from 'react'
import NavLink from '../navlink/navlink';
import { useNavbarTextStore } from '../../state/navbar-state';
import ExpenseDetail from '@/app/components/expenses/reports/ExpenseDetail'
import ExpenseTable from '@/app/components/expenses/reports/ExpenseTable'
import FilterChip from "./filterchips";
import axios from "axios";
import { useExpenseFilterStore } from "./filterstate";
import {toast} from 'react-hot-toast';


function ExpenseReports() {

	// const [isFocused, setIsFocused] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [isViewDetail, setIsViewDetail] = useState(false);
    // const [month, setMonth] = useState("");
    // const [year, setYear] = useState("");
    // const [renderToggle, setRenderToggle] = useState(false);
	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filteredPageNo, setFilteredPageNo] = useState(1);
	const [isFilteredData, setIsFilteredData] = useState(false);


	const [filterToggle, setFilterToggle] = useState(false);

  	const fieldRef = useRef("")
  	const operatorRef = useRef("")
  	const dataRef = useRef("")
  	const startDateRef = useRef()
  	const endDateRef = useRef()

	const filterState = useExpenseFilterStore((state) => {
        return state;
    });

	const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Financial / Expense");


  	useEffect(() => {
    	const fetchData = async () => {
      
      		try {
            	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-expense`, {
					page: pageNo
				});
            	console.log(response.data);
            	setExpenseData(response.data.expenses);
				setTotalPages(response.data.totalpages);
				setIsFilteredData(false);
				setFilteredPageNo(1);

        	} catch (error) {
            	// console.error('Error fetching data:', error);
				toast.error("Error fetching data.");
        	}
    	};

    	fetchData();
	}, [pageNo, filterToggle]);


	// function  handleFocus() {
	// 		setIsFocused(true);
	// }
	// function  handleBlur() {
	// 		setIsFocused(false);
	// }

	function handleFieldChange(e) {
		const value = e.target.value;
		console.log(value, filterState);
		filterState.setFieldText(value);
		filterState.setOperatorValue("");
	}


	// const handleDateChange = (value) => {

  	// 	if(!value) {
    // 		setRenderToggle(!renderToggle);
  	// 	} else {

    // 		const selectedDate = new Date(value + '-01'); // Adding '-01' to ensure it's the first day of the selected month
    // 		const month = selectedDate.getMonth() + 1; // Months are zero-based, so we add 1
    // 		const year = selectedDate.getFullYear();

    // 		// Do something with month and year
    // 		console.log("Month:", month);
    // 		console.log("Year:", year);
    // 		setMonth(month);
    // 		setYear(year);
  	// 	}
  
	// };


	// async function handleClickFind(newPageNo) {
  
  	// 	try {
    // 		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/filter?month=${month}&year=${year}`, {
	// 			page: newPageNo
	// 		});
  	// 		// console.log(response);

   	// 		setExpenseData(response.data.expenses);
	// 		setTotalPages(response.data.totalPages);
	// 		setIsFilteredData(true);
	// 		setPageNo(1);
	// 	} catch (error) {
    // 		console.error('Error fetching data:', error);
	// 	}
	// }

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
				handleSearch(newPageNo);
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
				handleSearch(newPageNo);
				return newPageNo;
			});
        }
    };


	async function handleSearch (newPageNo) {
		try {
		  	const config = {
				"Name" : "name",
				"Expense Type": "expenseType",
				"Amount": "amount",
				"Expense Date":"Expense_Date",
				
				"starts with":"like",
				"equal to": "=",
				"greater than" : ">",
				"less than" : "<",
				"not equal to" : "<>",
		  	}
		   	console.log(config["starts with"]);

		  	const filteredData = filterState.filters.map((i,ind) => {
		   
				const field = i.field;
	
				const operator = i.operator.toLowerCase();
				const value = (i.field.toLowerCase() ==="name" && i.operator.toLowerCase() === "starts with") ? `${i.value}%` : i.value;
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

			filterState.setFiltersForExport(filteredData);//set filters array to export it to excel sheet later
		  
		  	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/expense-query`, {
				queryConditions: filteredData, 
				page :newPageNo, 
				pageSize: 10
		  	})
		  	//undo
		  	console.log(response,"sdfghnbg");

			setExpenseData(response.data.results);
			setTotalPages(response.data.totalPages);
			setIsFilteredData(true);
			
	  
		}
		catch (error) {  
		  	console.error('Error occurred:', error);
		} 
	};


	async function handleDownload() {
		const queryConditions = filterState.filtersForExport;
		console.log(queryConditions);
	
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/superadmin/expense-excel`, 
				{ queryConditions: queryConditions }, 
				{ responseType: 'blob' }
			);
			console.log(response);
			
			if (response.status === 200) {
				toast.success("Data exported successfully");
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const a = document.createElement('a');
				a.href = url;
				a.download = 'expenses.xlsx';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			if (error.response && error.response.status === 404) {
				toast("No member found for the specified criteria");
			} else {
				toast.error("An error occurred while exporting data");
			}
		}
	}




  	return (

    	<div className="w-full h-[85vh] md:px-7 overflow-y-auto">
      		<div className="w-full sticky top-0">
        		<NavLink />
      		</div>

      		<div className='w-full min-h-[90vh] md:min-h-0 md:h-[93%] mt-2 p-4 bg-white rounded shadow drop-shadow-md '>
        
				<div className="w-full md:h-8 flex flex-col md:flex-row justify-between">

					<div className='w-full md:w-[65%] flex flex-wrap md:flex-nowrap justify-evenly md:justify-normal'>

  						<select ref = {fieldRef}
							className="px-2 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]"
							onChange={(e) => {
							  handleFieldChange(e);
							}}
  						>
							<option 
								disabled 
								selected
								value=""
							>
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

              				<select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
              				  disabled  
              				>
              				  <option disabled selected>
              				    Choose operator
              				  </option>
              				</select>
            			}

						{
                            filterState.FieldValue === "Name" && 
                        
                            <select className="m-0 md:ms-3 px-2 w-36 md:40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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
            			  filterState.FieldValue === "Expense Type" && 
						
            			  <select className="m-0 md:ms-3 px-2 w-36 md:40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
            			    ref = {operatorRef}
            			    onChange={e => {
								filterState.setOperatorValue(e.target.value)
            			    }}
            			  >
            			    <option disabled selected>
            			      Choose operator
            			    </option>
            			    <option value="equal to">equal to</option>
            			  </select>

            			}

            			{
            			  filterState.FieldValue === "Amount" && 
						
            			  <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
            			    ref = {operatorRef}
            			    onChange={e => {
								filterState.setOperatorValue(e.target.value)
            			    }}
            			  >
            			    <option disabled selected>
            			      Choose operator
            			    </option>
            			    {
            			      filterState.integerOperator.map((i, index) => {
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
            			  filterState.FieldValue === "Expense Date" && 
						
            			  <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
            			    ref = {operatorRef}
            			    onChange={e => {
								filterState.setOperatorValue(e.target.value)
            			    }}
            			  >
            			    <option disabled selected>
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
  								{/* -----------------value input/select--------------- */}


  						{
							(filterState.FieldValue === "")  && 
							<>
								<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
								<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
							</>
  						}

						{
                    	    ( filterState.FieldValue === "Name" && filterState.operatorValue === "") && 
                    	        <>
                    	            	<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
										<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.FieldValue  === "Name" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

						{
                    	    ( filterState.FieldValue === "Expense Type" && filterState.operatorValue === "") && 
                    	        <>
                    	            	<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
										<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
                    	        </>
                    	}
						{
							( filterState.FieldValue  === "Expense Type" && filterState.operatorValue === "starts with" ) &&
							<>
								<input
									type="text"
									placeholder="Value" ref = {dataRef}
									className="placeholder:text-black m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
								/>
								<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
							</>
  						}
						{
							( filterState.FieldValue  === "Expense Type" && filterState.operatorValue === "equal to" ) &&
							<>
								<select className='m-0 md:ms-3 px-2 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px]focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]' ref = {dataRef}>
									<option disabled selected value="" > Choose field </option>
								  	{
										filterState.expenseTypeValues.map((i, index) => {
									  		return <option value={i}> {i} </option>
										}) 
								    }
								</select>
								<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
							</>
  						}

						{
                    	    ( filterState.FieldValue === "Amount" && filterState.operatorValue === "") && 
                    	        <>
                    	            	<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
										<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
                    	        </>
                    	}
  						{ 
							( filterState.FieldValue  === "Amount" && (filterState.operatorValue  === "greater than" || filterState.operatorValue  === "less than" || filterState.operatorValue  === "equal to" || filterState.operatorValue  === "not equal to") ) && 
								<>
								<input
									type="text"
									placeholder="Value" ref = {dataRef}
									className="placeholder:text-black m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
								/>
								<input type="text" disabled className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-[#EEEAEA] border-none text-slate-100' />
								</>
  						}

						{
                    	    ( filterState.FieldValue === "Expense Date" && filterState.operatorValue === "") && 
                    	        <>
                    	            	<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
										<div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100"'></div>
                    	        </>
                    	}
  						{
							( filterState.FieldValue === "Expense Date" && filterState.operatorValue === "equal to") && 
							<>
							  <input type="date" ref = {dataRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
							  <input type="date" disabled className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-[#EEEAEA] border-none text-slate-100' />
							</>  
  						}
  						{   ( filterState.FieldValue === "Expense Date" && filterState.operatorValue === "between") && 
							  <>
							  	<input type="date" ref={startDateRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
							  	<input type="date" ref={endDateRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
							  </>
  						}

					</div>


  						{/* ---------------------------AND / OR button------------------------ */}

					<div className='w-full md:w-[15%] flex'>
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

										if(startDate && endDate) {
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
				  
					<div className='w-full md:w-[20%] h-full text-right flex items-center justify-end md:justify-between'>   
					  	<button 
							className="px-6 h-8 me-2 md:me-0 text-[12px] bg-[#005DB8] rounded-xl text-white font-semibold shadow-lg" 
							onClick={() => {
								console.log('clicked');
								handleSearch()
							}}
						>
							Find
					  	</button> 
						<button 
							className="px-6 h-8 text-[12px] bg-teal-500 rounded-xl text-white font-semibold shadow-lg" 
							onClick={() => {
								console.log('clicked');
								handleDownload();
							}}
						>
							Export
					  	</button> 
					</div>
				  
				</div>


				                            {/* -------- Filterchip div ----------- */}

        		<div className="w-full min-h-20 md:min-h-0 md:h-[10%] my-2 py-2 px-2 bg-[#005DB8] overflow-y-auto shadow flex flex-wrap items-center snap-mandatory snap-y">

        		  { 
        		    filterState.filters[0] ? (
        		      filterState.filters.map((i,index) => {
        		        return (
        		          <FilterChip 
        		            filter = {i} 
        		            index= {index} 
        		            setFilterToggle={setFilterToggle} 
        		            filterToggle={filterToggle}
							handleSearch={handleSearch}
        		          />
        		        )
        		      })
        		    ) : (
        		      <p className="ms-3 text-[#94a3b8] font-light text-sm md:text-md">No filters applied</p>
        		    )
				
        		  }
        		  {/* <p className="ms-5 text-slate-400 font-light">Add more filters</p> */}
        		</div>


				                            {/* -------- Expense table div ----------- */}


        		<div className='w-full h-[80%] mt-2'>

					{/* <div className="w-full h-[5%] m-0 mb-1 p-2 flex flex-row-reverse">
						<div className='w-full md:w-[40%] flex justify-between items-center text-[12px] md:text-base font-medium'>
          				  	<p>Expense Amount: 3000</p>
          				  	<p>Received Amount: 5000</p>
          				</div>
					</div> */}

					
					<div className="w-full h-[85%] m-0 p-0 overflow-scroll">
        		    	<ExpenseTable expenseData={expenseData} setIsViewDetail={setIsViewDetail} setSelectedId={setSelectedId} />
					</div>


					<div className="w-full md:h-[10%] px-2 flex justify-between items-center">
						<div>
							{
								!isFilteredData ? (
									<p className="text-[12px] md:text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
								) : (
									<p className="text-[12px] md:text-sm text-gray-500">Page { filteredPageNo } of { totalPages }</p>
								)
							}
						</div>
						{
							!isFilteredData ? (
								<div>
									<button
										className="w-20 md:w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
										onClick={ handlePreviousPage }
									>Previous</button>
									<button
										className="w-20 md:w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
										onClick={ handleNextPage }
									>Next</button>
								</div>
							) : (
								<div>
									<button
										className="w-20 md:w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
										onClick={ handleFilteredPreviousPage }
									>Previous</button>
									<button
										className="w-20 md:w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
										onClick={ handleFilteredNextPage }
									>Next</button>
								</div>
							)
						}
					
					</div>
        		</div>

				

      		</div>

        	{
        	  	isViewDetail && <ExpenseDetail selectedId={selectedId} setIsViewDetail={ setIsViewDetail } />
        	} 

    	</div>
  	)
}

export default ExpenseReports 