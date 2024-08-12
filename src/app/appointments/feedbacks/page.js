"use client"

import React, { useState, useEffect, useRef } from 'react'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state'
// import dummyData from './dummy'
import AppointFeedbackTable from '@/app/components/appointments/feedbacks/AppointFeedbackTable'
import AppointFeedbackView from '@/app/components/appointments/feedbacks/AppointFeedbackView'
import axios from 'axios';
import { useAppointFeedbackStore } from './ashramAppointFeedbackState'
import FilterChip from "./filterchips";


function AshramAppointments() {

  const [filterToggle,setFilterToggle] = useState(false);

  const fieldRef = useRef("")
  const operatorRef = useRef("")
  const dataRef = useRef("")
  const startDateRef = useRef()
  const endDateRef = useRef()

    const feedbackState = useAppointFeedbackStore((state) => {
        return state;
    });

    useEffect(()=>{console.log('hi',feedbackState.FieldValue);feedbackState.setFieldText(feedbackState.FieldValue)},[])
  useEffect(()=>{feedbackState.setFieldText(feedbackState.FieldValue)},[feedbackState.FieldValue])  

  const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Appointments");
  
  function handleFieldChange(e) {
    const value = e.target.value;
    console.log(value, feedbackState);
    feedbackState.setFieldText(value);
    feedbackState.setOperatorValue("");
  }


  async function handleSearch () {
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
        const value = i.field.toLowerCase() ==="name" ? `${i.value}%` : i.value;
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
        queryConditions: filteredData, page :1, pageSize: 10
      })
      //undo
      console.log(response,"sdfghnbg");

      const data = response.data.results;
      // const dataFiltered = data.filter((i) => {
      //   return i.appointment_status === "Completed";
      // });
      feedbackState.setAppointments([...data]);
  
    }
    catch (error) {  
      console.error('Error occurred:', error);
    } 
  };


  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto">
      <div className="w-full sticky top-0">
        <NavLink />
      </div>

      <div className='w-full h-[90%] mt-2 p-4  bg-white rounded shadow drop-shadow-md '>

        <div className="w-full h-8 flex justify-between">

          <div className='w-[65%]  flex'>
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

              <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
                disabled  
              >
                <option disabled selected>
                  Choose operator
                </option>
              </select>
            }

            {
              feedbackState.FieldValue === "Appointment Id" && 


              <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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

              <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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

              <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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

              <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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

              <select className="ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]" 
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
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black  border-none text-slate-100"'></div>
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] text-black border-none text-slate-100"'></div>
                </>
              )
            }

            { (feedbackState.FieldValue  === "Name" || feedbackState.FieldValue  === "Appointment Id") && (
                <>
                  <input
                          type="text"
                          placeholder="Value" ref = {dataRef}
                          className={`${ feedbackState.FieldValue === "Appointment Date" ||
                          feedbackState.FieldValue === "Checkin Date" ||
                          feedbackState.FieldValue === "Checkout Date" ||
                          feedbackState.FieldValue === "Status" ? "placeholder:text-slate-200 ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-[#EEEAEA] border-none text-slate-100":"placeholder:text-black ms-3 w-40 h-8 text-[12px] text-center bg-white text-black px-4  focus:outline-none rounded border-[1px] border-[#44474E]"}`}
                          disabled={
                            feedbackState.FieldValue === "Appointment Date" ||
                            feedbackState.FieldValue === "Checkin Date" ||
                            feedbackState.FieldValue === "Checkout Date" ||
                            feedbackState.FieldValue === "Status"
                          }
                  />
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                </>
                        
              )
            }

            {
              ( feedbackState.FieldValue === "Appointment Date" && feedbackState.operatorValue === "") && 
                <>
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                </>
            }
            {
              ( feedbackState.FieldValue === "Appointment Date" && feedbackState.operatorValue === "equal to") &&
                <>
                  <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                </>
            }
            {   ( feedbackState.FieldValue === "Appointment Date" && feedbackState.operatorValue === "between") && 
                <>
                  <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                </>
            }

            {
              ( feedbackState.FieldValue === "Checkout Date" && feedbackState.operatorValue === "") && 
                <>
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                </>
            }
            {
              ( feedbackState.FieldValue === "Checkout Date" && feedbackState.operatorValue === "equal to") &&
                <>
                  <input type="date" ref = {dataRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                </>
            }
            {   ( feedbackState.FieldValue === "Checkout Date" && feedbackState.operatorValue === "between") && 
                <>
                  <input type="date" ref={startDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                  <input type="date" ref={endDateRef} className='ms-3 w-40 h-8 text-[12px] text-center px-4  focus:outline-none  rounded bg-white text-black border-[1px] border-[#44474E]' />
                </>
            }

            {
              feedbackState.FieldValue  === "Rating" && (
                <>
                  <select className='ms-3 px-2 w-40 h-8 text-[12px] focus:outline-none rounded bg-white text-black border-[1px] border-[#44474E]' ref = {dataRef}>
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
                  <div className='ms-3 w-40 h-8 text-center px-4 rounded bg-[#e0e2ec] border-none text-slate-100"'></div>
                </>
              )
                  
            }
            

          </div>

          {/* ---------------------------AND / OR button------------------------ */}

          <div className='w-[15%]  flex'>

          <button className="w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" onClick={(e)=>{
              if(feedbackState.operatorValue === "between") {
                  let startDate = startDateRef.current.value;
                  startDate = startDate.split("-");
                  startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;

                  let endDate = endDateRef.current.value;
                  endDate = endDate.split("-");
                  endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

                  console.log(startDate, endDate);

                  feedbackState.setFilter({field : fieldRef.current.value, operator : "between", value : `${startDate}/${endDate}`, logicaloperator:
                  'and'})
                } else if(feedbackState.FieldValue.includes("Date") && feedbackState.operatorValue === "equal to") {
                  let date = dataRef.current.value;
                  date = date.split("-");
                  date = `${date[0]}-${date[1]}-${date[2]}`;

                  feedbackState.setFilter({field : fieldRef.current.value, operator : operatorRef.current.value, value : `${date}`, logicaloperator:
                  'and'})
                } else {
                  feedbackState.setFilter({field : fieldRef.current.value, operator : operatorRef.current.value, value : dataRef.current.value, logicaloperator:
                  'and'})
                  
                }
              }}
            >
              AND
            </button>

            <button className="ms-3 w-[60px] h-8 px-3 text-[12px] bg-[#D6E3FF] text-black rounded-2xl" onClick={(e)=>{
                if(feedbackState.operatorValue === "between") {
                  let startDate = startDateRef.current.value;
                  startDate = startDate.split("-");
                  startDate = `${startDate[0]}-${startDate[1]}-${startDate[2]}`;

                  let endDate = endDateRef.current.value;
                  endDate = endDate.split("-");
                  endDate = `${endDate[0]}-${endDate[1]}-${endDate[2]}`;

                  console.log(startDate, endDate);

                  feedbackState.setFilter({field : fieldRef.current.value, operator : "between", value : `${startDate}/${endDate}`, logicaloperator:'or'})
                } else if(feedbackState.FieldValue.includes("Date") && feedbackState.operatorValue === "equal to") {
                  let date = dataRef.current.value;
                  date = date.split("-");
                  date = `${date[0]}-${date[1]}-${date[2]}`;

                  feedbackState.setFilter({field : fieldRef.current.value, operator : operatorRef.current.value,value : `${date}`, logicaloperator:'or'})
                } else {
                  feedbackState.setFilter({field : fieldRef.current.value, operator : operatorRef.current.value,value : dataRef.current.value, logicaloperator:'or'})
                  
                }
              }}
            >
              OR
            </button>

          </div>
                        {/* --------------Find button---------------- */}

          <div className='w-[20%] h-full text-right'>
            
            <button className="px-6 h-8 text-[12px] bg-[#005DB8] rounded-xl text-white font-semibold shadow-lg" onClick={()=>{console.log('clicked');handleSearch()}}>
              Find
            </button>

          </div>


        </div>

                  {/* ------------------Fiterchips div ------------------- */}

        {/* <div className="w-full h-[10%] bg-[#005DB8] overflow-y-auto shadow my-5 grid grid-cols-2 items-center snap-mandatory snap-y py-2"> */}
        <div className="w-full h-[10%] bg-[#005DB8] overflow-y-auto shadow my-5 flex flex-wrap items-center snap-mandatory snap-y py-2 px-2">
        
          { 
            feedbackState.filters[0] ? (
              feedbackState.filters.map((i, index) => {
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
          	<AppointFeedbackTable  filterToggle={filterToggle}/>

		  	<div className="w-full h-[10%] px-2 flex justify-between items-center">
			  	<p className="text-sm text-gray-500">Page 1 of 1</p>
		  		<div>
					<button
						className="w-28 h-9 text-sm bg-[#005DB8] text-white rounded-xl"
						// onClick={ handlePreviousPage }
					>Previous</button>
					<button
						className="w-28 h-9 ms-5 text-sm bg-[#005DB8] text-white rounded-xl"
						// onClick={ handleNextPage }
					>Next</button>
				</div>
          	</div>
        </div>
      

      </div>


      {
        feedbackState.feedbackViewToggle && <AppointFeedbackView />
      }
      

    </div>
  )
}

export default AshramAppointments