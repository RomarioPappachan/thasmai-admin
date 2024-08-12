"use client"
import React, { useState, useEffect } from 'react'
import NavLink from '../navlink/navlink'
import DatePanel from 'react-multi-date-picker/plugins/date_panel'
import { useNavbarTextStore } from '../../state/navbar-state'
// import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import axios from 'axios';
import { toast } from 'react-hot-toast'



function GurujiAvalability() {

  const [value, setValue] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [isDateUpdated, setIsDateUpdated] = useState(false);
  console.log(value);

  const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Appointments");


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
  });

  // console.log(selectedDate);

  async function handleSubmitDate() {
    
    if(selectedDates[0]) {
      try {
        // console.log(selectedDates);
        const oldDates = unavailableDates;
        const newDates =  [...oldDates, ...selectedDates]
       console.log(newDates);


        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-gurujidate`, {
          values : newDates
        });
        toast.success("Updated unavailable dates");
        setValue([]);
        setIsDateUpdated(!isDateUpdated);
      } catch (error) {
        console.error('Error uploading date:', error);
        toast.error("Error uploading dates.")
      }
    } else {
      toast("Please select a date 📆");
    }

  }


  async function handleRemoveDate(index) {
    
      try {
        // console.log(selectedDates);
        
        const newDates =  [...unavailableDates];
        newDates.splice(index,1);

        console.log(newDates)
        
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
    <div className='w-full h-[85vh] m-0 md:px-7 overflow-y-auto '>

        <div className="w-full sticky top-0">
            <NavLink />
        </div>

      <div className='w-full mt-2 py-5 px-1 md:p-5 bg-white rounded shadow drop-shadow-md flex flex-col md:flex-row'>

        <div className="w-full md:w-[60%] h-full">

          <div className='w-full mb-2 flex justify-between items-center'>
            <p>Select the dates from the calendar and “Save”.</p>
            <button
              className="w-[25%] h-[35px] rounded bg-[#DAE2F9] text-black hover:scale-105"
              onClick={handleSubmitDate}
            >Save</button>
          </div>
          
          <div className='w-full'>

            {/* <Calendar
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
            /> */}



            <Calendar
              multiple
              format="DD/MM/YYYY"
              value={value[0] ? value : []}
              onChange={setValue}
              mapDays={({ date }) => {
                const disabled = unavailableDates.some(unavailableDate => {
                  const [year, month, day] = unavailableDate.split(",");
                  return (
                    date.year === Number(year) &&
                    date.month.number === Number(month) &&
                    date.day === Number(day)
                  );
                });

                if (disabled) {
                  return {
                    disabled: true,
                    style: { color: "#ddd", fontSize: "10px" },
                    onClick: () => toast("The selected date is unavailable 📆")
                  };
                }
              }}
              plugins={[
                <DatePanel
                  header="Selected Dates"
                />
              ]}
            />
          </div>
      
        </div>
        
        <div className='w-full md:w-[40%] min-h-full mt-5 md:mt-0 md:ps-5'>
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