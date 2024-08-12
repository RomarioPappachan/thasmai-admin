"use client"

import React, { useState, useEffect, use } from 'react'
import { useAdminAppointmentStore } from '@/app/users/ashram-appointments/appointmentState'
import axios from 'axios'
import { BsArrowRightCircleFill } from "react-icons/bs";
import PaymentPopUp from './PaymentPopUp';
import toast from 'react-hot-toast';
import { IoMdCloseCircleOutline, IoMdCheckmarkCircleOutline  } from "react-icons/io";



function ProfileView({ selectedId, UId, setIsViewProfile }) {

    const [profile, setProfile] = useState({});
    const [meditationDetails, setMeditationDetails] = useState({})
    const [bankDetails, setBankDetails] = useState({})
    const [profilePic,setProfilePic] = useState("")
    const [paymentDetails,setPaymentDetails] = useState([])
    const [zoomDetails,setZoomDetails] = useState([])
    const [meditationLog, setMeditationLog] = useState([])
    const [feePaymentStatus, setFeePaymentStatus] = useState(true);

    const [isProfile, setIsProfile] = useState(true);
    const [isMeditation, setIsMeditation] = useState(false);
    const [isBank, setIsBank] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    
    const [paymentToggle, setPaymentToggle] = useState(false);


    console.log(UId);

    const appointmentState = useAdminAppointmentStore((state) => {
        return state;
      }); 


      useEffect(() => {
        fetchData()
        
      }, [])
    
      async function fetchData() {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/profiledetails/${UId}`);
          setProfile(response.data.user);
          setProfilePic(response.data.profilePic)
          setMeditationDetails(response.data.meditationData)
          setBankDetails(response.data.bankDetails)
          setPaymentDetails(response.data.transactions)
          setZoomDetails(response.data.zoomrecord)
          setMeditationLog(response.data.meditationlog)
          console.log(response.data);


          // const resp = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin//check-payment-flag?UId=${UId}`);
          // console.log(resp);
          // setFeePaymentStatus(resp.data.fee_payment_status);
          
        } catch (error) {
          toast.error(error.message);
        }

        
        
        return;
    
      };
 
     

      
  return (
    
    // <div className='fixed top-0 left-0 w-full h-full bg-[#00000022] backdrop-blur-[1px] z-10 shadow drop-shadow-lg flex justify-center items-center overflow-hidden'>
    <div className="w-screen min-h-screen md:h-screen px-2 md:px-0 py-10 md:py-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
     
     <div className='w-full md:w-[1200px] md:h-[650px] p-2 md:p-5 bg-white rounded flex flex-col md:flex-row relative'>

        <button 
              className='h-8 w-8 bg-blue-200 text-black text-2xl absolute right-[5px] top-[5px] hover:bg-blue-700 hover:text-white' 
              onClick=  {() => { setIsViewProfile(false) }}
        >x</button>



        <div className='w-full md:w-[27%] h-full p-2 shadow-lg'>
          <div className='w-full md:h-[50%] flex justify-center items-center bg-[#E0E2EC]'>
            {/* <img className='rounded-full h-[180px] w-[180px] border-4 object-cover' src={ (profilePic === "" || profilePic === null)  ? `${profilePic}` : "/admin/profile_dummy.jpeg"} alt='Profile photo' /> */}
               {/* sometimes need to paste " data:image/png;base64, " infront of base64 code */}
            <img className='w-full h-full object-cover object-center overflow-hidden' src={ (profilePic === "" || !profilePic[0]  || profilePic === null)  ? "/admin/profile_dummy.jpeg" : `${profilePic}` } alt='Profile photo' />

          </div>
          <div className='w-full md:h-[50%] p-3 pt-5 text-black'>
            <p className='mb-4 font-semibold'>{`${profile.first_name}  ${profile.last_name}`}</p>
            <p className='mb-4 break-words'>{ profile.email }</p>
            <p className='mb-4'>+91 { profile.phone }</p>
            <p className='mb-4'>Card No: { profile.UId }</p>
          </div>
        </div>

        <div className='w-full md:w-[73%] h-full pt-2 md:ps-4'>

          <div className='w-full md:h-[10%] my-5 md:my-0 md:ps-4 flex rounded-[8px]'>
                <button 
                    className={isProfile ? 
                        ('w-36 h-8 me-2 bg-[#005db8] text-sm md:text-lg text-white rounded-[8px] hover:scale-105')
                         : 
                        ('w-36 h-8 me-2 bg-[#e0e2ec] text-sm md:text-lg text-black hover:scale-105 rounded-[8px]') 
                    }
                    onClick={() => {
                      setIsMeditation(false);
                      setIsBank(false);
                      setIsProfile(true);
                      setIsPayment(false);
                    }}
                >Profile</button>
                <button 
                    className={isMeditation ? 
                        ('w-36 h-8 me-2 bg-[#005db8] text-sm md:text-lg text-white rounded-[8px] hover:scale-105')
                         : 
                        ('w-36 h-8 me-2 bg-[#e0e2ec] text-sm md:text-lg text-black hover:scale-105 rounded-[8px]') 
                    }
                    onClick={() => {
                      setIsProfile(false);
                      setIsBank(false);
                      setIsMeditation(true);
                      setIsPayment(false);
                    }}
                >Meditation</button>
                <button 
                    className={isBank ? 
                        ('w-36 h-8 me-2 bg-[#005db8] text-sm md:text-lg text-white rounded-[8px] hover:scale-105')
                         : 
                        ('w-36 h-8 me-2 bg-[#e0e2ec] text-sm md:text-lg text-black  hover:scale-105 rounded-[8px]') 
                    }
                    onClick={() => {
                      setIsProfile(false);
                      setIsMeditation(false);
                      setIsBank(true);
                      setIsPayment(false);

                    }}
                >Bank</button>
                <button 
                    className={isPayment ? 
                        ('w-36 h-8 bg-[#005db8] text-sm md:text-lg text-white rounded-[8px] hover:scale-105')
                         : 
                        ('w-36 h-8 bg-[#e0e2ec] text-sm md:text-lg text-black  hover:scale-105 rounded-[8px]') 
                    }
                    onClick={() => {
                      setIsProfile(false);
                      setIsMeditation(false);
                      setIsBank(false);
                      setIsPayment(true);

                    }}
                >Payment</button>

        
          </div>

          

          <div className='w-full md:h-[90%] p-4 bg-[#DAE2F9] '>
            

            {
              isProfile && 
                <>
                <div className='w-full flex flex-col'>

                  <div className='w-full md:w-[80%] h-full'>
                    <table className='w-full text-black'>
                      <tbody className='text-sm md:text-base'>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Name</td>
                          <td className='w-[65%] text-left'>: {`${profile.first_name}  ${profile.last_name}`}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Phone No.</td>
                          <td className='w-[65%] text-left'>: {profile.phone}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Email</td>
                          <td className='w-[65%] text-left'><p className='break-words'>: {profile.email}</p></td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>DOB</td>
                          <td className='w-[65%] text-left'>: {profile.DOB}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Gender</td>
                          <td className='w-[65%] text-left'>: {profile.gender}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                  <div className='w-full md:w-[80%] h-full'>
                    <table className='w-full'>
                      <tbody className='text-black text-sm md:text-base'>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Card No.</td>
                          <td className='w-[65%] text-left'>: {profile.UId}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Address</td>
                          <td className='w-[65%] text-left'>: {profile.address}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>District</td>
                          <td className='w-[65%] text-left'>: {profile.district}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>State</td>
                          <td className='w-[65%] text-left'>: {profile.state}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>PIN</td>
                          <td className='w-[65%] text-left'>: {profile.pincode}</td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

              </div>
              </>
            
            }


            {
              isMeditation   && 
                <>
                      <div className='w-full flex flex-col md:flex-row border-b-2 border-white'>

                          <div className='w-full md:w-[50%] md:h-[50%]'>
                            <table className='w-full text-black'>
                              <tbody className='text-sm md:text-base'>
                               <tr className='h-[40px]'>
                                 <td className='w-[50%] text-left'>Current Session</td>
                                 <td className='w-[50%] text-left'>: {meditationDetails.session_num ? meditationDetails.session_num : "-"}</td>
                               </tr>
                               <tr className='h-[40px]'>
                                 <td className='w-[50%] text-left'>Day</td>
                                 <td className='w-50%] text-left'>: {meditationDetails.day ? meditationDetails.day : "-"}</td>
                               </tr>
                               <tr className='h-[40px]'>
                                 <td className='w-[50%] text-left'>Completed Cycle</td>
                                 <td className='w-[50%] text-left'>: {meditationDetails.cycle ? meditationDetails.cycle : "-"}</td>
                               </tr>
                               {/* <tr className='h-[40px]'>
                                 <td className='w-[50%] text-left'>Break Cycle</td>
                                 <td className='w-[50%] text-left'>: 20</td>
                               </tr> */}

                              </tbody>
                            </table>
                          </div>

                          <div className='w-full md:w-[50%] md:h-[50%] mt-5 md:mt-0'>
                            <table className="w-full">
                              <tbody className='text-black text-sm md:text-base'>
                                <tr>
                                  <td className="w-[35%] text-left ">Last 5 meditated days</td>
                                </tr>
                                { (meditationLog[0]) && 
                                  meditationLog.map((medLog, index) => {
                                    let date = medLog.updatedAt.split("T");
                                    // console.log("meditation Date", date);
                                    return(
                                      <tr key={index} className="h-[40px]">
                                        <td className="w-[35%] text-left">{ date[0] }</td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                              
                          </div>
                      </div>

                      <div className='w-full mt-4 overflow-y-auto'>
                        <p className='text-black font-medium'>Latest Zoom class attended</p>
                        <table className='w-full text-black'>
                          <thead className='text-sm md:text-base'>
                            <tr className='h-[40px]'>
                              <th className='w-[20%] text-left'>Date</th>
                              <th className='w-[20%] text-left'>Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {zoomDetails.map((zoom, index) => (
                              <tr key={index} className='h-[40px]'>
                                <td className='text-left'>{zoom.zoom_date}</td>
                                <td className='text-left'>{zoom.zoom_time}</td>
                            
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                     
                  </>
            
            }

            {
              isBank && 
                <>
                <div className='w-[100%] h-full'>
                <table className='w-full text-black'>
                  <tbody>
                    <tr className='h-[40px]'>
                      <td className='w-[40%] md:w-[25%] text-left text-sm md:text-base'>Bank Name</td>
                      <td className='w-[60%] md:w-[75%] text-left text-sm md:text-base'>: {bankDetails.bankName}</td>
                    </tr>
                    <tr className='h-[40px]'>
                      <td className='w-[40%] md:w-[25%] text-left text-sm md:text-base'>IFSC Code</td>
                      <td className='w-[60%] md:w-[75%] text-left text-sm md:text-base'>: {bankDetails.IFSCCode}</td>
                    </tr>
                    <tr className='h-[40px]'>
                      <td className='w-[40%] md:w-[25%] text-left text-sm md:text-base'>Branch Name</td>
                      <td className='w-[60%] md:w-[75%] text-left text-sm md:text-base'>: {bankDetails.branchName}</td>
                    </tr>
                    <tr className='h-[40px]'>
                      <td className='w-[40%] md:w-[25%] text-left text-sm md:text-base'>Account Holder</td>
                      <td className='w-[60%] md:w-[75%] text-left text-sm md:text-base'>: {bankDetails.accountName}</td>
                    </tr>
                    <tr className='h-[40px]'>
                      <td className='w-[40%] md:w-[25%] text-left text-sm md:text-base'>Account Number</td>
                      <td className='w-[60%] md:w-[75%] text-left text-sm md:text-base'>: {bankDetails.accountNo}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              
              </>
            
            }

            


            {
              isPayment && 
              <div className='w-full h-full'>

                <div className='w-full h-[80%] overflow-y-auto'>
                  <table className='w-full text-black'>
                    <thead>
                      <tr className='h-[40px] text-sm md:text-base'>
                        {/* <th className='w-[20%] text-left'>UID</th> */}
                        <th className='w-[35%] text-left'>Payment Date</th>
                        <th className='w-[35%] text-center'>Payment Time</th>
                        <th className='w-[30%] text-center'>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      { 
                        paymentDetails[0] &&
                        paymentDetails.map((payment, index) => {
                          let paymentDate = payment.payment_date ? payment.payment_date.split(" ") : "";
                          // console.log("Payment Date", paymentDate);
                          return (
                            <tr key={index} className='h-[40px] text-sm md:text-base'>
                              {/* <td className='text-left'>{payment.UId}</td> */}
                              <td className='text-left'>{ paymentDate[0] }</td>
                              <td className='text-center'>{payment.payment_time}</td>
                              <td className='text-center'>{payment.amount}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </div>
 
                <div className='w-full h-[20%] p-2 border-t-2 border-white'>
                  {
                    !feePaymentStatus ? (
                      <>
                            <div className='w-full flex flex-col md:flex-row gap-2 md:gap-x-6'>
                              <p className='text-left flex items-center text-black'>
                                Class Attented : 
                                <IoMdCheckmarkCircleOutline  className='ms-2 text-3xl text-teal-500' />
                              </p>
                              <p className='text-left flex items-center text-black'>
                                Payment :
                                <IoMdCloseCircleOutline className='ms-2 text-3xl text-red-500' />
                              </p>
                            </div>
                            
                            <div className='w-full flex items-center mt-2'>
                              <p className='text-black text-sm md:text-base'>Make payment for this meditator true?</p>
                              <button 
                                className='size-6 ms-3 text-teal-500'
                                onClick={() => {
                                  setPaymentToggle(true);
                                }}
                              >
                                <BsArrowRightCircleFill className='text-2xl hover:text-3xl' />
                              </button>
                            </div>
                        
                      </>
                    ) : (
                      <>
                        <div className='w-full flex flex-col md:flex-row gap-2 md:gap-x-6'>
                          <p className='text-left flex items-center text-black'>
                            Class Attented 
                            <IoMdCheckmarkCircleOutline  className='ms-2 text-3xl text-teal-500' />
                          </p>
                          <p className='text-left flex items-center text-black'>
                            Payment
                            <IoMdCheckmarkCircleOutline className='ms-2 text-3xl text-teal-500' />
                          </p>
                        </div>
                        
                      </>
                    )
                  }
                  
                </div>

              </div>
            }



          </div>

        </div>


      </div>

      {
        paymentToggle && <PaymentPopUp setPaymentToggle={ setPaymentToggle } profile={ profile } />
      }
    </div>
  )
}

export default ProfileView