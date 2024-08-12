"use client"

import React, { useState, useEffect, useRef } from 'react'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state'
// import dummyData from './dummy'

import axios from 'axios';
import { useAppointFeedbackStore } from './ashramAppointFeedbackState'
import FilterChip from "./filterchips";
import AppointmentFeedbackList from '@/app/components/feedback/appointmentFeedback/AppointmentFeedbackList';
import AppointmentFeedbackView from '@/app/components/feedback/appointmentFeedback/AppointmentFeedbackView';
import {toast} from 'react-hot-toast'


function AshramAppointments() { 

  const [filterToggle,setFilterToggle] = useState(false);

  
  const [pageNo, setPageNo] = useState(1);
	const [totalPages, setTotalPages] = useState();
	const [filteredPageNo, setFilteredPageNo] = useState(1);
	const [isFilteredData, setIsFilteredData] = useState(false);

  const fieldRef = useRef("")
  const operatorRef = useRef("")
  const dataRef = useRef("")
  const startDateRef = useRef()
  const endDateRef = useRef()

    const feedbackState = useAppointFeedbackStore((state) => {
        return state;
    });

  //   useEffect(()=>{console.log('hi',feedbackState.FieldValue);feedbackState.setFieldText(feedbackState.FieldValue)},[])
  // useEffect(()=>{feedbackState.setFieldText(feedbackState.FieldValue)},[feedbackState.FieldValue])  
    // console.log(pageNo);
  const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Feedback views");
  
  function handleFieldChange(e) {
    const value = e.target.value;
    console.log(value, feedbackState);
    feedbackState.setFieldText(value);
    feedbackState.setOperatorValue("");
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


  async function handleSearch (page) {
    try {
      const config = {
        "Appointment Id": "id",
        "Name": "user_name",
        "Appointment Date":"register_date",
        "Checkin Date":"appointmentDate",
        "Checkout Date":"check_out",
        "Rating":"rating",


        "starts with":"like",
        "equal to": "=",
        "greater than" : ">",
        "less than" : "<",
        "not equalto" : "<>",

  
      }
       console.log(config["starts with"]);
       
  
      const filteredData = feedbackState.filters.map((i,ind) => {
       
        const field = i.field;

        const operator = i.operator.toLowerCase();
        const value = (i.field.toLowerCase() ==="name"  && i.operator === "starts with") ? `${i.value}%` : i.value;
         console.log(field,value,operator);
        
         if(field.includes("Date") && operator === "between") {
          // SELECT *
          // FROM users
          // WHERE registration_date BETWEEN '2024-01-01' AND '2024-03-01';
          return({
            field : config[`${field}`], operator: "between", value: value, logicaloperator: i.logicaloperator
          })
         } 
        
        return({
          field : config[`${field}`], operator: config[`${operator}`], value: value, logicaloperator: i.logicaloperator
        })
      })
      filteredData[filteredData.length-1].logicaloperator = "null";
      console.log(filteredData);   
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/appointment-query`, {
        queryConditions: filteredData, page :page, pageSize: 10
      })
      //undo
      console.log(response,"sdfghnbg");
      setIsFilteredData(true)
      setTotalPages(response.data.totalPages)

      const data = response.data.results;
      const dataFiltered = data.filter((i) => {
        return i.appointment_status === "Completed";
      });
      feedbackState.setAppointments([...dataFiltered]);
  
    }
    catch (error) {  
      console.error('Error occurred:', error);
    } 
  };


  return (
    <div className="w-full h-[85vh] md:px-7 overflow-y-auto">
      <div className="w-full sticky top-0">
        <NavLink />
      </div>

      <div className='w-full min-h-[90vh] md:min-h-0 md:h-[90%] mt-2 p-4 bg-white rounded shadow drop-shadow-md'>

        <div className="w-full md:h-8 flex flex-col md:flex-row justify-between">

          <div className='w-full md:w-[65%] flex flex-wrap md:flex-nowrap justify-evenly md:justify-normal'>
            <select 
              ref = {fieldRef}
              className="px-2 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]"
              onChange={(e) => {
                handleFieldChange(e);
              }}
              
            >
              <option disabled selected>
                Choose field
              </option>
              { feedbackState.FieldValues.map((i,index)=>{
                return (
                  <option key = {index} value = {i}> 
                    {i}
                  </option>

                )
              })}
            </select>
            
            {/* -----------------operator select--------------- */}
            {
              feedbackState.FieldValue === "" && 

              <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                disabled  
              >
                <option disabled selected>
                  Choose operator
                </option>
              </select>
            }

            {
              feedbackState.FieldValue === "Appointment Id" && 


              <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                ref = {operatorRef}
                onChange={e => {
                  feedbackState.setOperatorValue(e.target.value)
                }}
              >
                <option disabled selected>
                  Choose operator
                </option>
                <option value="equal to">Equal to</option>  
              </select>
              
            }

            {
              feedbackState.FieldValue === "Name" && 

              <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                ref = {operatorRef}
                onChange={e => {
                  feedbackState.setOperatorValue(e.target.value)
                }}
              >
                <option disabled selected>
                  Choose operator
                </option>
                {
                  feedbackState.stringOperator.map((i, index) => {
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
              feedbackState.FieldValue === "Appointment Date" && 

              <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                ref = {operatorRef}
                onChange={e => {
                  feedbackState.setOperatorValue(e.target.value)
                }}
              >
                <option disabled selected>
                  Choose operator
                </option>
                {
                  feedbackState.dateOperator.map((i, index) => {
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
              feedbackState.FieldValue === "Checkout Date" && 

              <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                ref = {operatorRef}
                onChange={e => {
                  feedbackState.setOperatorValue(e.target.value)
                }}
              >
                <option disabled selected>
                  Choose operator
                </option>
                {
                  feedbackState.dateOperator.map((i, index) => {
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
              feedbackState.FieldValue === "Rating" && 

              <select className="m-0 md:ms-3 px-2 w-36 md:w-40 h-8  mb-2 md:mb-0 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                ref = {operatorRef}
                onChange={e => {
                  feedbackState.setOperatorValue(e.target.value)
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
              feedbackState.FieldValue === "" && (
                <>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
              )
            }

            { (feedbackState.FieldValue  === "Name" || feedbackState.FieldValue  === "Appointment Id") && (
                <>
                  <input
                          type="text"
                          placeholder="Value" ref = {dataRef}
                          className="placeholder:text-black m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"
                          disabled={
                            feedbackState.FieldValue === "Appointment Date" ||
                            feedbackState.FieldValue === "Checkin Date" ||
                            feedbackState.FieldValue === "Checkout Date" ||
                            feedbackState.FieldValue === "Status"
                          }
                  />
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
                        
              )
            }

            {
              ( feedbackState.FieldValue === "Appointment Date" && feedbackState.operatorValue === "") && 
                <>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
            }
            {
              ( feedbackState.FieldValue === "Appointment Date" && feedbackState.operatorValue === "equal to") &&
                <>
                  <input 
                    type="date" 
                    ref = {dataRef} 
                    className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' 
                  />
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
            }
            {   ( feedbackState.FieldValue === "Appointment Date" && feedbackState.operatorValue === "between") && 
                <>
                  <input type="date" ref={startDateRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <input type="date" ref={endDateRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                </>
            }

            {
              ( feedbackState.FieldValue === "Checkout Date" && feedbackState.operatorValue === "") && 
                <>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
            }
            {
              ( feedbackState.FieldValue === "Checkout Date" && feedbackState.operatorValue === "equal to") &&
                <>
                  <input type="date" ref = {dataRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
            }
            {   ( feedbackState.FieldValue === "Checkout Date" && feedbackState.operatorValue === "between") && 
                <>
                  <input type="date" ref={startDateRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <input type="date" ref={endDateRef} className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-[10px] md:text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                </>
            }

            {
              feedbackState.FieldValue  === "Rating" && (
                <>
                  <select className='m-0 md:ms-3 px-2 w-36 md:w-40 h-8 text-[10px] md:text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]' ref = {dataRef}>
                    <option value="" disabled selected>
                      Choose rating
                    </option>
                    {
                      feedbackState.ratingValues.map((i, index) => {
                        return <option value={i}>
                          {i}
                        </option>
                      }) 
                    }
                  </select>
                  <div className='m-0 md:ms-3 w-36 md:w-40 h-8 mb-2 md:mb-0 text-center px-4 rounded bg-gray-300 border-none text-slate-100'></div>
                </>
              )
                  
            }
            

          </div>

          {/* ---------------------------AND / OR button------------------------ */}

          <div className='w-full md:w-[15%] flex'>

            <button className="w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" 
              onClick={(e) => {
                if(feedbackState.FieldValue === "" || feedbackState.operatorValue === "") {
                toast("Please choose a field and an operator to filter")
              } else{
                if(feedbackState.operatorValue === "between") {
                  let startDate = startDateRef.current.value;
                  startDate = startDate.split("-");
                  startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
                
                  let endDate = endDateRef.current.value;
                  endDate = endDate.split("-");
                  endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

                  if(startDate && endDate){
                    console.log(startDate, endDate);
                
                    feedbackState.setFilter({
                        field : fieldRef.current.value, 
                        operator : "between", 
                        value : `${startDate}/${endDate}`, 
                        logicaloperator: 'and'
                     })
                  } else{
                    toast("Please select start date and end date to filter")
                  }
                
                  
                } else if(feedbackState.FieldValue.includes("Date") && feedbackState.operatorValue === "equal to") {
                  let date = dataRef.current.value;
                  date = date.split("-");
                  date = `${date[0]}-${date[1]}-${date[2]}`;

                  if(dataRef.current.value) {
                    feedbackState.setFilter({
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
                    feedbackState.setFilter({
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

            <button className="ms-3 w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl"
               onClick={(e) => {
                if(feedbackState.FieldValue === "" || feedbackState.operatorValue === "") {
                toast("Please choose a field and an operator to filter")
              } else{
                if(feedbackState.operatorValue === "between") {
                  let startDate = startDateRef.current.value;
                  startDate = startDate.split("-");
                  startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;
                
                  let endDate = endDateRef.current.value;
                  endDate = endDate.split("-");
                  endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

                  if(startDate && endDate){
                    console.log(startDate, endDate);
                
                    feedbackState.setFilter({
                        field : fieldRef.current.value, 
                        operator : "between", 
                        value : `${startDate}/${endDate}`, 
                        logicaloperator: 'or'
                     })
                  } else{
                    toast("Please select start date and end date to filter")
                  }
                
                  
                } else if(feedbackState.FieldValue.includes("Date") && feedbackState.operatorValue === "equal to") {
                  let date = dataRef.current.value;
                  date = date.split("-");
                  date = `${date[0]}-${date[1]}-${date[2]}`;

                  if(dataRef.current.value) {
                    feedbackState.setFilter({
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
                    feedbackState.setFilter({
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

          </div>


        </div>

                  {/* ------------------Fiterchips div ------------------- */}

        {/* <div className="w-full h-[10%] bg-[#005DB8] overflow-y-auto shadow my-5 grid grid-cols-2 items-center snap-mandatory snap-y py-2"> */}
        <div className="w-full min-h-20 md:min-h-0 md:h-[10%] my-2 py-2 px-2 bg-[#005DB8] overflow-y-auto shadow flex flex-wrap items-center snap-mandatory snap-y">
        
          { 
            feedbackState.filters[0] ? (
              feedbackState.filters.map((i, index) => {
                return (
                  <FilterChip filter = {i} index= {index} setFilterToggle={setFilterToggle} filterToggle={filterToggle} />
                )
              })

            ) : (
              <p className="ms-3 text-[#94a3b8] font-light text-sm md:text-md">No filters applied</p>
            )
          
          }
          
        </div>


        <div className='w-full h-[80%] mt-2'>
          	<AppointmentFeedbackList  
              filterToggle={filterToggle}
              pageNo={pageNo} 
              setTotalPages={setTotalPages} 
              setIsFilteredData={setIsFilteredData}
              isFilteredData={isFilteredData}
              filteredPageNo={filteredPageNo}
              setFilteredPageNo={setFilteredPageNo}
            />

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
        feedbackState.feedbackViewToggle && <AppointmentFeedbackView />
      }
      

    </div>
  )
}

export default AshramAppointments