"use client"

import React, { useState, useEffect, useRef } from "react";
import { useDistributionFilterStore } from './filterState'
import NavLink from '../navlink/navlink';
import { useNavbarTextStore } from "../../state/navbar-state";
import FilterChip from "./filterChips";
import DistributionTable from "@/app/components/financial/distribution/DistributionTable";
import ProfileView from '@/app/components/users/profileView';
import {toast} from 'react-hot-toast'
import axios from "axios";
// import data from "./data.json"
// import Image from "next/image";


function Distribution() {

	const [pageRows, setPageRows] = useState(10);
  	const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [filteredPageNo, setFilteredPageNo] = useState(1);
	const [isFilteredData, setIsFilteredData] = useState(false);
	const [searchedPageNo, setSearchedPageNo] = useState(1);
	const [isSearchedData, setIsSearchedData] = useState(false);
	const [filterToggle, setFilterToggle] = useState(false);
	const [userId, setUserId] = useState(null);
	const [isViewProfile, setIsViewProfile] = useState(false);
	const [tableRowToggle, setTableRowToggle] = useState(false);


	// console.log(pageNo, totalPages, filteredPageNo);

  	const fieldRef = useRef("")
  	const operatorRef = useRef("")
  	const dataRef = useRef("")
  	const startDateRef = useRef()
  	const endDateRef = useRef()

	const searchRef = useRef()
	const textRef = useRef()
  

    const filterState = useDistributionFilterStore((state) => {
        return state;
    });
  

    // useEffect(()=>{console.log('hi',filterState.fieldValue);filterState.setFieldValue(filterState.fieldValue)},[])
    // useEffect(()=>{filterState.setFieldValue(filterState.fieldValue)},[filterState.fieldValue])  

    const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Financial");

    
    function handleFieldChange(e) {
        const value = e.target.value;
        console.log(value, filterState);
        filterState.setFieldValue(value);
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

	function handleSearchedPreviousPage() {
        if(searchedPageNo <= 1) {
            return;
        } else {
            setSearchedPageNo(prevPageNo => {
                const newPageNo = prevPageNo - 1;
                handleSearch(newPageNo, pageRows);
                return newPageNo;
            });
        }
    };
 
    function handleSearchedNextPage() {
        if(searchedPageNo >= totalPages ) {
            return;
        } else {
            setSearchedPageNo(prevPageNo => {
                const newPageNo = prevPageNo + 1;
                handleSearch(newPageNo, pageRows);
                return newPageNo;
            });
        }
    };

	function handleChangeRow(event) {
 
        const newRow = event.target.value;
        if(!isFilteredData && !isSearchedData) {
            setPageNo(1);
            setPageRows(newRow);
            setTableRowToggle(!tableRowToggle);
            return;
        } else if(!isSearchedData && isFilteredData) {
            setFilteredPageNo(1);
            setPageRows(newRow);
            handleClickFind(1, newRow);
        } else if(!isFilteredData && isSearchedData) {
            setSearchedPageNo(1);
            setPageRows(newRow);
            handleSearch(1, newRow);
        }
    };

	//filtering users

    async function handleClickFind (newPageNo, newRow) {
		try {
		  	const config = {
				"DOJ" : "DOJ",
				"First Name" : "firstName",
				"Second Name" : "secondName",
				"User Id" : "UId",
				"Available coupon" : "coupons",
				"Distributed coupon" : "total_distributed_coupons",
				// "Phone" : "phone",
				// "Email" : "email",
				"Level" : "Level",
				"Node" : "node_number",

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
				const value = (i.field.toLowerCase() ==="first name" || i.field.toLowerCase() ==="second name" ) && i.operator === "starts with" ? `${i.value}%` : i.value;
				console.log(field, value, operator);
			
				if(field === "DOJ" && operator === "between") {
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
		  
		  	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/financial-query`, {
				queryConditions: filteredData, 
				page : newPageNo,
				pageSize: newRow,
		  	})
		  	//undo
		  	console.log(response,"sdfghnbg");
	
		  	filterState.setUsersData(response.data.results);
			setIsSearchedData(false);
			setIsFilteredData(true);
			setTotalPages(response.data.totalPages);
		}
		catch (error) {  
		  	console.error('Error occurred:', error);
		} 
	};


	//handleSearch to quickly search meditators

	async function handleSearch(page, newRow) {
		const rows = newRow ? newRow : pageRows;
		const searchPage = page ? page : 1
		try {
			console.log(searchRef.current.value);
			console.log(textRef.current.value);
	
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/search?field=${searchRef.current.value}&value=${textRef.current.value}&page=${searchPage}&limit=${rows}`);
			console.log(response);
			filterState.setUsersData(response.data.data); 
			setIsSearchedData(true);
			setIsFilteredData(false);
			setTotalPages(response.data.pagination.totalPages);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
  
	

    return (
        <div className="w-full h-[85vh] px-7 overflow-y-auto">
            <div className='flex items-center justify-between'>
                <NavLink />
                {/* <button 
                    className="w-[180px] h-[35px] px-2 bg-[#5799fd] hover:bg-[#5799fdd3] text-white rounded-[6px] text-[18px] font-semibold flex items-center justify-center hover:scale-105"
                    onClick={() => {
                      setAddEventStatus(true);
                    }}
                > 
                    <MdAddCircleOutline  className="me-2 text-[28px]"/>
                    Add Event
                </button> */}
            </div>

            <div className='w-full h-[90%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
                <div className="w-full h-8 flex justify-between">

                    <div className='w-[65%] flex'>
                        <select 
                            ref = {fieldRef}
                            className="px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]"
                            onChange={(e) => {
                                handleFieldChange(e);
                            }}
                        >
                            <option disabled selected>
                              Choose field
                            </option>
                            { 
                                filterState.fieldValues.map((i,index) => {
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
						    filterState.fieldValue === "" && 
						
						    <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
						      disabled  
						    >
						      <option disabled selected>
						        Choose operator
						      </option>
						    </select>
						}

                        {
                            filterState.fieldValue === "DOJ" && 
                  
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
                                      Choose operator
                                </option>
                                {
                                    filterState.dojOperator.map((i, index) => {
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
                            filterState.fieldValue === "First Name" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
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
                            filterState.fieldValue === "Second Name" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
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
            			  	filterState.fieldValue === "User Id" && 
	
            			  	<select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
            			  	  ref = {operatorRef}
            			  	  onChange={e => {
								filterState.setOperatorValue(e.target.value)
            			  	  }}
            			  	>
            			  	  <option disabled selected>
            			  	    Choose operator
            			  	  </option>
            			  	  <option value="equal to">Equal to</option>  
            			  	</select>

            			}

						{/* {
                            filterState.fieldValue === "Phone" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
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
                            filterState.fieldValue === "Email" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                                ref = {operatorRef}
                                onChange={e => {
                                    filterState.setOperatorValue(e.target.value)
                                }}
                            >
                                <option disabled selected>
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
                        } */}

						{/* {
                            filterState.fieldValue === "Distributed coupon" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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
                        } */}

						{
                            filterState.fieldValue === "Available coupon" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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
                            filterState.fieldValue === "Level" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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
                            filterState.fieldValue === "Node" && 
                        
                            <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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
                    	      filterState.fieldValue === "Status" && 
						
                    	      <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                    	        ref = {operatorRef}
                    	        onChange={e => {
                    	              filterState.setOperatorValue(e.target.value)
                    	        }}
                    	      >
                    	        <option disabled selected>
                    	              Choose operator
                    	        </option>
                    	        <option value="equal to">
                    	              equal to
                    	        </option>
                    	      </select>
                    	}

                                    {/* ----------------value input/select---------------- */}

                    	{
                    	    filterState.fieldValue === "" && (
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black  border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black border-none text-slate-100"'></div>
                    	        </>
                    	    )
                    	}

                    	{ 
                    	    (filterState.fieldValue === "DOJ" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{
                    	  	( filterState.fieldValue === "DOJ" && filterState.operatorValue === "equal to") &&
                    	    <>
                    	      <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                    	      <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	    </>
                    	}
                    	{   ( filterState.fieldValue === "DOJ" && filterState.operatorValue === "between") && 
                    	    <>
                    	      <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                    	      <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                    	    </>
                    	}
    

                    	{
                    	    ( filterState.fieldValue === "First Name" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "First Name" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

						{
                    	    ( filterState.fieldValue === "Second Name" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Second Name" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}


						{
                    	    ( filterState.fieldValue === "User Id" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "User Id" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

						{/* {
                    	    ( filterState.fieldValue === "Phone" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Phone" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

						{
                    	    ( filterState.fieldValue === "Email" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Email" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	} */}

						{/* {
                    	    ( filterState.fieldValue === "Distributed coupon" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Distributed coupon" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	} */}

						{
                    	    ( filterState.fieldValue === "Available coupon" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Available coupon" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

						{
                    	    ( filterState.fieldValue === "Level" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Level" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

						{
                    	    ( filterState.fieldValue === "Node" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}
                    	{ 
                    	    ( filterState.fieldValue  === "Node" && filterState.operatorValue !== "") && 
                    	        <>
                    	              <input
                    	                type="text"
                    	                placeholder="Value" ref = {dataRef}
                    	                className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                    	              />
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

{
                    	    ( filterState.fieldValue === "Status" && filterState.operatorValue === "") && 
                    	        <>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	}

                    	{
                    	    (filterState.fieldValue  === "Status" && filterState.operatorValue !== "") && (
                    	        <>
                    	              <select className='ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]' ref = {dataRef}>
                    	                <option value="" disabled selected>
                    	                      Choose value
                    	                </option>
                    	                {
                    	                      filterState.statusOperator.map((i, index) => {
                    	                        return <option value={i}>
                    	                              {i}
                    	                        </option>
                    	                      }) 
                    	                }
                    	              </select>
                    	              <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                    	        </>
                    	    )
                    	}

              		</div>

                                      {/* ---------------------------AND / OR button------------------------ */}

               		<div className='w-[15%]  flex'>

                   	<button 
                   	   className="w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" 
                   	   onClick={(e) => {
						if(filterState.fieldValue === "" || filterState.operatorValue === "") {
							toast("Please choose a field and an operator to filter")
						} else {
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
								} else {
									toast("Please select start date and end date to filter")
								}
							
								
							} else if(filterState.fieldValue === "DOJ" && filterState.operatorValue === "equal to") {
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
								} else {
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
							if(filterState.fieldValue === "" || filterState.operatorValue === "") {
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
								
									
								} else if(filterState.fieldValue === "DOJ" && filterState.operatorValue === "equal to") {
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
							setPageNo(1);
							handleClickFind(1, pageRows);
              	        }}
              	    >
              	        Find
              	    </button>
              	</div>

          	</div>



                                    {/* ------------------Fiterchips div ------------------- */}

          	<div className="w-full h-[10%] my-3 p-2 bg-[#005DB8] overflow-y-auto shadow  flex flex-wrap items-center snap-mandatory snap-y">

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


                {/* -----search bar------- */}
                <div className="w-full h-[10%] flex items-center">
 
                    <div className="w-[40%] h-full flex items-center">
                        <select 
                            ref = {searchRef}
                            className="px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                        >
                            <option value = "" disabled selected>
                              Choose option
                            </option>
                            <option value="DOJ">Date Of Joining</option>
                            <option value="firstName">First Name</option>
                            <option value="secondName">Second Name</option>
                            <option value="UId">User Id</option>
							{/* <option value="total_distributed_coupons">Distributed coupon</option> */}
                            <option value="coupons">Available Coupons</option>
                            <option value="Level">Level</option>
                            <option value="node_number">Node</option>
							{/* <option value="Status">Status</option> */}
 
                        </select>
 
                        <input
                    	    type="text"
                    	    placeholder="Value" ref = {textRef}
                    	    className="placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-[#EEEAEA] text-black px-4  focus:outline-none rounded"
                    	/>
 
                        <div className="h-full flex items-center">
                            <img 
                                src="/admin/search.png" 
                                alt="search icon" 
                                className="w-8 h-8 ms-3 cursor-pointer hover:scale-105"
                                onClick={() => {
									setPageNo(1);
                                    handleSearch(1, pageRows);
                                }}
                            />
                        </div>
						<p 
							className="ms-2 text-xs text-red-400 underline cursor-pointer"
							onClick={() => {
								setFilterToggle(!filterToggle);
								searchRef.current.value = "";
								textRef.current.value = "";
							}}
						>clear</p>
                    </div>
                    <div className="w-[20%]">
                        {/* <select name="newRow" id=""
                            className="px-2 w-20 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                            onChange={(event) => {
                                // console.log(e.target.value);
                                handleChangeRow(event);
                            }}
                        >
                            <option value="" selected disabled>Rows</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>

                        </select> */}
                    </div>
                    <div className="w-[40%] flex items-center justify-between">
                        
 
                    
                    </div>
                </div>


                <div className="w-full h-[80%] m-0 p-0 overflow-scroll">
                    <DistributionTable 
						setUserId={ setUserId }
						setIsViewProfile={ setIsViewProfile }
						isFilteredData={ isFilteredData }
                        setIsFilteredData={setIsFilteredData}
                        setFilteredPageNo={setFilteredPageNo}
                        pageNo={pageNo}
						filteredPageNo={ filteredPageNo }
                        setTotalPages={setTotalPages}
                        filterToggle={filterToggle}
						isSearchedData={isSearchedData}
                        setIsSearchedData={setIsSearchedData}
                        setSearchedPageNo={setSearchedPageNo}
						pageRows={pageRows}
                        tableRowToggle={tableRowToggle}
                    />
               	</div>


              	<div className="w-full h-[10%] px-2 flex justify-between items-center border-t-[1px] border-[#005DB8]">
                   <div className="flex items-center gap-3">
                      	{
                      	  ( !isFilteredData && !isSearchedData ) &&
                      	    <p className="text-sm text-gray-500">Page { pageNo } of { totalPages }</p>
                      	}
						{
                        	(!isSearchedData && isFilteredData) &&
							<p className="text-sm text-gray-500">Page { filteredPageNo } of { totalPages }</p>
						}
						{
                        	(!isFilteredData && isSearchedData) &&
							<p className="text-sm text-gray-500">Page { searchedPageNo } of { totalPages }</p>
						}

						<select name="newRow" id=""
                            className="px-2 w-20 h-8 text-[12px] focus:outline-none rounded bg-[#EEEAEA] text-black"
                            onChange={(event) => {
                                // console.log(e.target.value);
                                handleChangeRow(event);
                            }}
                        >
                            <option value="" selected disabled>Rows</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>

                        </select>
                    </div>

                    {
                        ( !isFilteredData && !isSearchedData ) &&
                            <div>
                                <button
                                    className="w-24 h-8 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handlePreviousPage }
                                >Previous</button>
                                <button
                                    className="w-24 h-8 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleNextPage }
                                >Next</button>
                            </div>
                    } 
 
                    {
                        (!isSearchedData && isFilteredData) &&
                            <div>
                                <button
                                    className="w-24 h-8 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleFilteredPreviousPage }
                                >Previous</button>
                                <button
                                    className="w-24 h-8 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleFilteredNextPage }
                                >Next</button>
                            </div>
                    }
 
                    {
                        (!isFilteredData && isSearchedData) &&
                            <div>
                                <button
                                    className="w-24 h-8 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleSearchedPreviousPage }
                                >Previous</button>
                                <button
                                    className="w-24 h-8 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
                                    onClick={ handleSearchedNextPage }
                                >Next</button>
                            </div>
                    }
              	</div>
          	</div>


        </div>

		{
			isViewProfile && <ProfileView UId={ userId } setIsViewProfile={ setIsViewProfile } />
		}
   

  	</div>
  )
}

export default Distribution