


"use client"


import React, { useRef, useEffect } from "react";
import axios from "axios";
import moment from 'moment'
import { useAppointFeedbackStore } from "@/app/appointments/feedbacks/ashramAppointFeedbackState";




function AppointFeedbackTable( props) {

  const feedbackState = useAppointFeedbackStore((state) => {
    return state;
  });
   
  

  useEffect(() =>{
    fetchData();

    return () => {
      return;
    }
    
  }, [props.filterToggle,props.pageNo,])

  async function fetchData() {
   try {
    console.log(props.pageNo);

    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-all-appointment?page=${props.pageNo}`);

    console.log(response);
    props.setTotalPages(response.data.totalPages)
    props.setIsFilteredData(false)
    props.setFilteredPageNo(1)

    const data = response.data.appointments;
    // const filteredData = data.filter((i) => {
    //   return i.appointment_status === "Completed";
    // })

    feedbackState.setAppointments(data);
    
   } catch (error) {

     console.log(error);
   }
  
    

  }


  async function handleCheckInClick(id, status){
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-payment/${id}`,{
      appointment_status : status,
      appointmentDate: `${moment().format('DD/MM/YYYY')}`
      
    })
    fetchData()
  }


  async function handleCheckOutClick(id, status){

     await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-payment/${id}`,{
      appointment_status : status,
      check_out: `${moment().format('DD/MM/YYYY')}`
    })
    fetchData()
  }




   

  return (
    <div className="h-[85%] overflow-scroll ">
      <table className="table rounded-3xl max-h-[10vh]">
        <thead
          className="bg-[#5799FD] text-white sticky top-0 gap-x-20 text-[0.9rem]"
          style={{ borderRadius: "11px" }}
        >
          <tr className="rounded-3xl">
            <th className="text-center ">Appoint Id</th>
            <th className="text-center">Username</th>
            <th className="text-center">Rating</th>
            <th className="text-center">Date</th>
            <th className="text-center">Feedback</th>
           
          </tr>
        </thead>
        <tbody className=" overflow-scroll">
          {
            feedbackState.appointments[0] ? (
              feedbackState.appointments.map((i, index) => {

                return (
                  <tr
                    key={index}
                    className="font-medium text-[0.8rem] text-black my-10"
                  > 

                    <td className="text-center">{ i.UId }</td>
                    <td className="text-center text-indigo-600">{ i.user_name } </td>
                    <td className="text-center">{ i.rating } </td>
                    
    
                    <td className="text-center">{ i.check_out }</td>
    
                    <td 
                      className="text-center cursor-pointer flex"
                      onClick={() => {
                          feedbackState.setFeedbackViewToggle(true, i.id);
                      }}
                    >
                      { String(i.feedback).substring(0, 50) } <p className="ms-1 text-blue-400 hover:text-blue-600 hover:scale-105"> { "<" + "Read more..." +">" }</p>
                    </td>
                    
    
                    {/* {
                      i.appointment.appointment_status.startsWith("Completed") ? (
                        <td className="text-center">
                          <button 
                            className="w-[120px] h-[35px] rounded-3xl border-black border-[0.5px] hover:bg-slate-200"
                            onClick={() => {
                              feedbackState.setFeedbackViewToggle(true, i.appointment.id);
                            }}
                          >Feedback</button>
                        </td>
                      ) : (
                        <td></td>
                      ) 
    
                      
                    } */}
    
  
                  </tr>
                );
              })

            ) : (
              <tr>
                <td>No data to display</td>
              </tr>
            )
           
          }
          
        </tbody>
      </table>
    </div>
  );
}

export default AppointFeedbackTable;