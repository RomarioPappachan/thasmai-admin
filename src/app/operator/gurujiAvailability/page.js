// // "use client"
// // import React, { useState } from 'react'
// // import NavLink from '../navlink/navlink'
// // import DatePicker from "react-multi-date-picker";


// // function GurujiAvalability() {

// //     const [value, setValue] = useState(new Date());
// //     console.log(value);

// //   return (
// //     <div className='w-full h-full m-0 p-0'>
// //       <div className='flex items-center mx-5 justify-between'>
// //        <NavLink />      
// //       </div>
// //       <div className='w-full h-[80px] mt-10 bg-blue-600 flex  justify-center items-center'>
// //         <DatePicker 
// //             className='w-[300px] h-[80px]'
// //             value={value} 
// //             onChange={setValue} 
// //             format='DD/MM/YYYY'
// //             multiple
// //             range
// //         />
// //       </div>

// //     </div>
// //   )
// // }

// // export default GurujiAvalability










"use client"
import React, { useState, useEffect } from 'react'
import NavLink from '../navlink/navlink'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'

// import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import axios from 'axios';


function GurujiAvalability() {

  const [value, setValue] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isDateUpdated, setIsDateUpdated] = useState(false);
  console.log(value);


  useEffect(() => {

    const fetchData = async () => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/User/guruji-date`);
          // console.log("page use line 29", response.data.values);
          setUnavailableDates(response.data.values);
          
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isDateUpdated]);

  const selectedDates = value.map((i, index) => {
    return i.year + "," + i.month.number + "," + i.day ;   
  })

  // console.log(selectedDate);

  async function handleSubmitDate() {
    
    if(selectedDates[0]) {
      try {
        // console.log(selectedDates);
        const oldDates = unavailableDates;
        const newDates =  [...oldDates, ...selectedDates]
       


        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-gurujidate`, {
          values : newDates
        });
        // window.location.reload();
        setValue([]);
        setIsDateUpdated(!isDateUpdated);
      } catch (error) {
        console.error('Error uploading date:', error);
        // alert("Error uploading dates.")
      }
    } else {
      alert("Please select a date");
    }

  }


  async function handleRemoveDate(index) {
    
      try {
        // console.log(selectedDates);
        
        const newDates =  [...unavailableDates];
        newDates.splice(index,1);
        
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-gurujidate`, {
          values : newDates
        });
        // window.location.reload();
        setValue([]);
        setIsDateUpdated(!isDateUpdated);

      } catch (error) {
        console.error('Error while uploading payment:', error);
        alert("Error while uploading dates");
      }
   
  }



  return (
    <div className='w-full min-h-full m-0 px-7'>

      <div className='w-full h-[10%] flex items-center justify-between'>
       <NavLink />      
      </div>

      <div className='w-full h-[80%] mt-3 p-5 bg-white rounded-xl shadow drop-shadow-md flex'>

        <div className="w-[60%] h-full">

          <div className='w-full mb-2 flex justify-between items-center'>
            <p>Select the dates from the calendar and “Save”.</p>
            <button
              className="w-[25%] h-[35px] rounded bg-[#DAE2F9] text-black hover:scale-105"
              onClick={handleSubmitDate}
            >Save</button>
          </div>
          
          <div className='w-full '>

            <Calendar
              multiple
              format="DD/MM/YYYY"
              value={value[0] ? value : []}
              onChange={setValue}
              // mapDays={({ date }) => {

              //   let disabledDays = [...unavailableDates]

              //   disabledDays.forEach((i) => {

              //     let yyyy = i.split(",")[0];
              //     let mm = i.split(",")[1];
              //     let dd = i.split(",")[2];
              //     console.log(dd, mm, yyyy);
              //     console.log(date.day, date.month.number, date.year);


              //     let isYear = Number(yyyy) === date.year ? true : false ;
              //     let isMonth = Number(mm) === date.month.number ? true : false;
              //     let isDay = Number(dd) === date.day ? true : false;
              //     console.log(".........",isYear, isMonth, isDay);
                  
              //     if (isYear && isMonth && isDay) return {
              //       disabled: true,
              //       style: { color: "#ddd" },
              //       onClick: () => alert("weekends are disabled")
              //     }
              //   })   
                
              // }}

              plugins={[
                <DatePanel
                  header="Selected Dates"
                />
              ]}
            />
          </div>
      
        </div>
        
        <div className='w-[40%] min-h-full ps-5'>
            <div className="w-full h-[10%] bg-[#93000A] text-white flex justify-center items-center">Unavailable Dates</div>
            <div className="w-full h-[90%] p-5 bg-[#E0E2EC]">
              <div className="w-full flex flex-wrap justify-between">
                { 
                  unavailableDates[0] && 
                  unavailableDates.map((date, index) => {
                    
                    return (
                      <div className="w-[45%] h-7 m-1 bg-[#565F71] text-white rounded-[10px] flex justify-evenly items-center">
                        <div className="w-[80%] ps-5 text-[14px] ">{date.split(",")[2] + "/" + date.split(",")[1] + "/" + date.split(",")[0]}</div>
                        <div 
                          className="rotate-45 cursor-pointer"
                          onClick={() => {
                            handleRemoveDate(index);
                          }}
                        >+</div>
                      </div> 
                      )
                    
                  })
                }
              </div>
              
              
              

            </div>
        </div>



      </div>

    </div>
  )
}

export default GurujiAvalability


