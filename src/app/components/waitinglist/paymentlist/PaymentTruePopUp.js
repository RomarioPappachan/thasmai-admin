"use client";
import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

function PaymentTruePopUp(props) {

    const profile = props.profile;
    console.log(profile);

    

    const handlePaymentTrue = async () => {
        const UId = profile.UId;
        console.log(UId);

        
        const now = new Date();
      
        const pad = (num, size) => {
            let s = "000" + num;
            return s.substr(s.length - size);
        };
      
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1, 2);
        const day = pad(now.getDate(), 2);
        const hours = pad(now.getHours(), 2);
        const minutes = pad(now.getMinutes(), 2);
        const seconds = pad(now.getSeconds(), 2);
        const milliseconds = pad(now.getMilliseconds(), 3);
        const microseconds = pad(now.getMilliseconds() * 1000, 6);
      
        const date = `${year}-${month}-${day}`;
        const time = `${hours}:${minutes}:${seconds}`;
        const fullTime = `${time}.${milliseconds}`
        const  payment_date= `${date} ${fullTime}`;
        const  payment_time= time;
        console.log(payment_date, payment_time);
         
      
      
        try {
          const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/processPayment`, {
            UId: UId,
            amount:2500,
            payment_date: payment_date,
            payment_time: payment_time,
          });
          console.log(response);
          if(response.data.message) {
            const resp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/meditation-flag`, {
                UId: UId
            });
            console.log(resp);
            toast.success(resp.data.message);
            // toast.success("User payment status updated to 'TRUE' ");
            props.setIsUserDetails(false);
            props.setPaymentToggle(false);
            props.setTableRowToggle(prevValue => !prevValue);
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

export default PaymentTruePopUp