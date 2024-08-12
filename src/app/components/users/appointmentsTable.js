"use client"
 
 
import React, { useEffect, useRef,useState } from "react";
import { useAdminAppointmentStore } from "@/app/users/ashram-appointments/appointmentState";
import axios from "axios";
import { toast } from 'react-hot-toast'

 
 
 
function AppointmentsTables({ setSelectedId, setUId, setIsViewProfile }) {
 
  const appointmentState = useAdminAppointmentStore((state) => {
    return state;
  });
  
  // const appointments = appointmentState.appointments;
  console.log(appointmentState.appointments);

const statusRef = useRef(null);
const [disc, setdisc] = useState('')
const [count, setCount] = useState(0)
 
useEffect(()=>{
 
},[count])
 
  async function handleSubmitClick(UId, coupon ,id, userCoupons) {
  
    if (userCoupons === "" || userCoupons === null || userCoupons === 0) {

      toast("No coupons available to give discount.");
      return;

    } else {

      try {
 
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/discount/${UId}`,{ 
          coupon: coupon, 
          id: id
        });
        console.log(response);
        // console.log("successfully updated");
        toast.success("Reward given successfully");
        setCount(current => current += 1);
        window.location.reload();
        return;
   
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error("Error while giving discount");
          return;
        }

    }

  }


  return (
    
      <table className="table rounded-3xl">
        <thead
          className="bg-[#5799FD] text-white sticky top-0 gap-x-20 text-[0.9rem]"
          style={{ borderRadius: "11px" }}
        >
          <tr className="rounded-3xl">
            <th className="text-center">Id</th>

            <th className="text-center">Date</th>
            <th className="text-center">Username</th>
            <th className="text-center">Check In</th>
            
            <th className="text-center">Status</th>
            <th className="text-center">Coupon</th>
            <th className="text-center">Details</th>
            <th className="text-center">Reward</th>
            <th className="text-center"></th>
 
 
 
          </tr>
        </thead>
        <tbody className="my-10 text-black">
          { 
            appointmentState.appointments[0] ? (
              appointmentState.appointments.map((appoint, index) => {
 
                return (
                  <tr
                    key={index}
                    className="font-medium text-[0.8rem] text-black my-10 border-b-[1px] border-[#eeeeee]"
                  > 
     
                    <td className="text-center">{appoint.UId} </td>
                    <td className="text-center">{appoint.register_date ? appoint.register_date : "-"} </td>
                    <td 
                      className="text-center text-indigo-600 hover:text-indigo-800 hover:scale-105 cursor-pointer"
                      onClick = {() => {
                        setIsViewProfile(true);
                        setSelectedId(appoint.id);
                        setUId(appoint.UId);
                      }}
                    >
                      {appoint.user_name} 
                    </td>
                    <td className="text-center">{appoint.appointmentDate}</td>
                    
                    <td 
                      className={
                        appoint.appointment_status === "Not Arrived" && "text-amber-500 text-center"
                        || appoint.appointment_status === "Checked In" && "text-[#23A058] text-center"
                        || appoint.appointment_status === "Checked Out" && "text-[#CB4335] text-center"
                        || appoint.appointment_status === "Completed" && "text-black text-center"
                      }
                    >
                      {appoint.appointment_status} 
                    </td>
                    <td className="text-center flex justify-center">{ appoint.userCoupons ? appoint.userCoupons : 0 }</td>
                    {/* <td className="text-center flex justify-center">0</td> */}
    
     
                    <td className="text-center">
                      <button 
                        className=' px-5 py-1 rounded border-black border-[0.5px] hover:bg-slate-200'
                        onClick={ () => {
                          appointmentState.setViewAppointment(true);
                          // appointmentState.setSelectedAppointmentId(appointment.id);
                          setSelectedId(appoint.id);
                        } }
                      >
                        View
                      </button>                
                    </td>
     
                    <td className="text-center flex justify-center">
                      {
                        (appoint.appointment_status === "Checked Out" && (appoint.discount === "" || appoint.discount === null)) ? (
                          <input 
                            type="number"
                            min="0"
                            onChange={
                              (e)=> {
                                e.preventDefault();
                                setdisc(e.target.value);
                              }
                            }
                            className="w-[6rem] py-1 bg-white text-black rounded placeholder:text-[.7rem] border-black border-[1px]  text-center"
                            placeholder="C.amount"
                          />
                        ) : (
                          <input 
                            type="number"
                            disabled
                            className="w-[6rem] py-1 rounded placeholder:text-[.7rem] border-none bg-slate-200 placeholder:text-center"
                            placeholder="N/A"
                          />
                        )
                      }
                      
                    </td>
     
                    <td className="text-center">
                      {
                        (appoint.appointment_status === "Checked Out" && (appoint.discount === "" || appoint.discount === null)) ? (
                          <button className=" px-5 py-1 text-white rounded bg-[#10b981] hover:scale-105" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleSubmitClick(appoint.UId, disc, appoint.id, appoint.userCoupons)
                            }}
                          >Submit</button>
                        ) : (
                          <button 
                            className=" px-5 py-1 text-[#a7f3d0] rounded bg-[#6ee7b7]" 
                            disabled
                          >Submit</button>
                        )
                      }
                      
                    </td>
    
     
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No results found</td>
              </tr>
            )
            
          
          }
        </tbody>
      </table>
  
  );
}
 
export default AppointmentsTables;