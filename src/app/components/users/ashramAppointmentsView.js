"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAdminAppointmentStore } from '@/app/users/ashram-appointments/appointmentState';

function AppointmentView({selectedId}) {

    const [isBasicDetails, setIsBasicDetails] = useState(true);
    const [data, setData] = useState({});
    console.log(data);


    const appointmentState = useAdminAppointmentStore((state) => {
        return state;
    });
    
    
    
    
    useEffect(() => {
        const fetchData = async () => {
          console.log(appointmentState.selectedAppointmentId);
          try {
              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-appointment/${selectedId}`);
              setData(response.data);
  
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);



  return (
    <div className='w-[100vw] h-[100vh] backdrop-blur-sm bg-[#0000003b] absolute top-0 left-0 flex justify-center items-center '>
        <div className='w-[1000px] h-[550px] bg-white rounded'>
            <div className='bg-[#5799FD] h-[85px] relative'>
                <h1 className='text-white text-3xl ps-10 py-6 '>Appointment Details</h1>
                <button 
                    className='h-8 w-8 bg-white text-2xl absolute right-[20px] top-[20px] rounded hover:bg-blue-700 hover:text-white'
                    onClick = {(e) => { appointmentState.setViewAppointment(false, undefined); }}
                >x</button>
            </div>


            <div className='flex w-full pt-5 ps-10'>
                <button 
                    className={isBasicDetails ? 
                        ('w-40 h-8 bg-[#005db8] text-white rounded-xl hover:scale-105')
                         : 
                        ('w-40 h-8 bg-[#e0e2ec]  hover:scale-105 rounded-xl') 
                    }
                    onClick={() => {
                        setIsBasicDetails(true)
                    }}
                >Basic Details</button>
                <button 
                    className={isBasicDetails ? 
                        ('w-40 h-8 ms-5 bg-[#e0e2ec]  hover:scale-105 rounded-xl')
                         : 
                        ('w-40 h-8 ms-5 bg-[#005db8] text-white rounded-xl hover:scale-105')
                    }
                    onClick={() => {
                        setIsBasicDetails(false)
                    }}
                >People Details</button>
            </div>


                {
                    isBasicDetails  && data.appointment ? 
                    (
                        <div className='h-[75%] w-[90%] flex m-auto'>
                            <div className='w-[50%] mt-4 text-black'>
                                <div className='flex pt-4'><p className='w-[50%]'>Appointment Id </p><p>: {data.appointment.id}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Appointment Date </p><p>: {data.appointment.appointmentDate}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Username </p><p>: {data.appointment.user_name}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Registered Date </p><p>: {data.appointment.register_date}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Status </p><p>: {data.appointment.appointment_status}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Payment </p><p>: {data.appointment.payment}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Pay Method </p><p>: {data.appointment.payment_method}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>No.of.peoples </p><p>: {data.appointment.num_of_people}</p></div>
                                {
                                    data.appointment.imageUrl &&
                                    <div className='flex pt-4'>
                                        <a href={data.appointment.imageUrl} target= "_blank" className='text-blue-500 hover:text-blue-800 cursor-pointer' > Click here to see the invoice.</a>   
                                    </div>
                                }
                                
                            </div>

                            <div className=' w-[50%] mt-4 text-black'>
                                <div className='flex pt-4'><p className='w-[50%]'>Emergency contact</p><p>: {data.appointment.emergencyNumber}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Rewards</p><p>: {data.appointment.discount}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Check-in date</p><p>: {data.appointment.appointmentDate}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Check-out date</p><p>: {data.appointment.check_out}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Destination</p><p>: Ashram</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Pick up</p><p>: {data.appointment.from}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>Reason</p><p>: {data.appointment.appointment_reason}</p></div>
                                <div className='flex pt-4'><p className='w-[50%]'>No. of days</p><p>: {data.appointment.days}</p></div>
                            </div>
                        </div>

                    ) : (

                        <div className='h-[75%] w-[90%] mx-auto pt-5'>
                            <table className='w-[80%]'>
                                <thead className='h-12 bg-[#005db8] text-white'>
                                    <th>Sl. No</th>
                                    <th>Full Name</th>
                                    <th>Age</th>
                                    <th>Relation</th>
                                </thead>
                                <tbody className='text-center text-black'>
                                    {
                                        data.appointment && 
                                        data.appointment.groupMembers.map((member, index) => {
                                            return (
                                                <tr className='h-12 border-gray-100 border-b-2'>
                                                    <td>{ index + 1}</td>
                                                    <td>{member.name}</td>
                                                    <td>{member.age}</td>
                                                    <td>{member.relation}</td>
                                                </tr>
                                            )
                                        }) 
                                    }
                                   
                                    
                                </tbody>
                            </table>
                        </div>

                    )
                }

                
            
        </div>
    </div>

  )
}

export default AppointmentView