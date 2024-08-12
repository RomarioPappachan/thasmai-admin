"use client";

import React from 'react'
import toast from 'react-hot-toast';
import { BsArrowRightCircleFill } from "react-icons/bs";
import { IoMdCloseCircleOutline, IoMdCheckmarkCircleOutline  } from "react-icons/io";


function UserProfile(props) {

    const profile = props.selectedUser;
    console.log(profile);


    return (
        <div className="w-screen min-h-screen md:h-screen px-2 md:px-0 py-10 md:py-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
     
            <div className='w-full md:w-[1200px] md:h-[650px] p-2 md:p-5 bg-white rounded flex flex-col md:flex-row relative'>

                <button 
                      className='h-8 w-8 bg-blue-200 text-black text-2xl absolute right-[5px] top-[5px] hover:bg-blue-700 hover:text-white z-10' 
                      onClick=  {() => { props.setIsUserDetails(false) }}
                >x</button>



                <div className='w-full md:w-[27%] h-full p-2 shadow-lg'>
                    <div className='w-full md:h-[50%] flex justify-center items-center bg-[#E0E2EC]'>
                      {/* <img className='rounded-full h-[180px] w-[180px] border-4 object-cover' src={ (profilePic === "" || profilePic === null)  ? `${profilePic}` : "/admin/profile_dummy.jpeg"} alt='Profile photo' /> */}
                         {/* sometimes need to paste " data:image/png;base64, " infront of base64 code */}
                      <img className='w-full h-full object-cover object-center overflow-hidden' src="/admin/profile_dummy.jpeg" alt='Profile photo' />

                    </div>
                    <div className='w-full md:h-[50%] p-3 pt-5 text-black'>
                      <p className='mb-4 font-semibold'>{`${profile.first_name}  ${profile.last_name}`}</p>
                      <p className='mb-4'>{ profile.email} </p>
                      <p className='mb-4'>+91 { profile.phone} </p>
                      <p className='mb-4'>Card No: { profile.UId} </p>
                    </div>
                </div>

                <div className='w-full md:w-[73%] h-full pt-2 md:ps-4 overflow-y-auto relative'>
                    
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
                          <td className='w-[65%] text-left'>: {profile.email}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>DOB</td>
                          <td className='w-[65%] text-left'>: {profile.DOB}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Gender</td>
                          <td className='w-[65%] text-left'>: {profile.gender}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Languages</td>
                          <td className='w-[65%] text-left'>: {profile.languages}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Reference</td>
                          <td className='w-[65%] text-left'>: {profile.reference}</td>
                        </tr>
                        <tr className='h-[40px]'>
                          <td className='w-[35%] text-left'>Country</td>
                          <td className='w-[65%] text-left'>: {profile.country}</td>
                        </tr>
                        {
                          profile.classAttended === false &&
                          <>
                            <tr className=''>
                              <td className='w-[35%] text-left'>Class Attented</td>
                              <td className='w-[65%] text-left flex items-center'>: <IoMdCloseCircleOutline className='ms-3 text-4xl text-red-500' />
                              </td>
                            </tr>
                            <tr className=''>
                              <td className='w-[35%] text-left'>Payment</td>
                              <td className='w-[65%] text-left flex items-center'>: <IoMdCloseCircleOutline className='ms-3 text-4xl text-red-500' />
                              </td>
                            </tr>
                          </>
                        }
                        {
                          profile.classAttended === true &&
                          <>
                            <tr className=''>
                              <td className='w-[35%] text-left'>Class Attented</td>
                              <td className='w-[65%] text-left flex items-center'>: <IoMdCheckmarkCircleOutline  className='ms-3 text-4xl text-teal-500' />
                              </td>
                            </tr>
                            <tr className=''>
                              <td className='w-[35%] text-left'>Payment</td>
                              <td className='w-[65%] text-left flex items-center'>: <IoMdCloseCircleOutline className='ms-3 text-4xl text-red-500' />
                              </td>
                            </tr>
                          </>
                        }
                        
                        
                        

                      </tbody>
                  </table>

                  <div className='w-full h-[15%] p-5 flex border-t-2 border-white absolute bottom-0 left-0 right-0'>
                      {
                        (profile.classAttended === true) &&
                        <>
                          
                          <p className='text-black'>Make payment for this meditator true?</p>
                          <button 
                            className='size-6 ms-3 text-teal-500'
                            onClick={() => {
                              if(profile.classAttended === false) {
                                  toast("User hasn't attented the class");
                              } else {
                                props.setPaymentToggle(true);
                              }
                            }}
                          >
                            <BsArrowRightCircleFill className='text-2xl hover:text-3xl' />
                          </button>
                        </>
                      }
                      
                  </div>


                </div>


            </div>


            {/* {
              paymentToggle && <PaymentPopUp setPaymentToggle={ setPaymentToggle } profile={ profile } />
            } */}

        </div>
    )
}

export default UserProfile

