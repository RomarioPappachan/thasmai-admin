"use client";
import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

function PaymentPopUp(props) {

    const profile = props.profile;
    console.log(profile);

    const handlePaymentTrue = async () => {
        const UId = profile.UId;
        console.log(UId);

        try {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/processPayment`, {
            UId: UId
          });
          console.log(response);
          if(response.data.message) {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/meditation-flag`, {
                UId: UId
            });
            console.log(resp);
            toast.success(resp.data.message);
            toast.success("User payment status updated to 'TRUE' ");
            props.setPaymentToggle(false);
          }
        } catch (error) {
          console.error('Error while updating payment status', error);
          toast.error("Error while updating payment status");
        }
       
    };


  return (
    <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
            <div className='w-[500px] h-[250px] bg-white rounded hover:bg-[#cfcdcc]'>
                <div className='w-full h-[50%] flex justify-center items-center'>
                    <p className='px-5 text-md font-medium text-black'>
                        Are you sure you want make the payment for user<br/>
                        <span className='font-semibold'>{`${profile.first_name}  ${profile.last_name}`}</span> with userId <span className='font-semibold'>{profile.UId}</span> ?
                    </p>
                </div>
                <div className='w-full h-[50%] flex justify-evenly items-center'>
                    <button 
                        className='w-[120px] h-[40px] bg-amber-700 hover:bg-amber-800 text-white rounded'
                        onClick={() => {
                            handlePaymentTrue();
                        }}
                    >Yes</button>
                    <button 
                        className='w-[120px] h-[40px] bg-blue-500 hover:bg-blue-600 text-white rounded'
                        onClick={() => {
                            props.setPaymentToggle(false);
                        }}
                    >No</button>
                </div>
            </div>
        </div>
  )
}

export default PaymentPopUp