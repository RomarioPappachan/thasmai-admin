"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import useImageCompressor from '../../ImageCompression/useImageCompressor'

function OperatorPaymentPopUp(props) {

    const [operatorSaturationLimit, setOperatorSaturationLimit] = useState()
    const [invoiceData, setInvoiceData] = useState({
        payment_Date: '',
        emp_id : '',
        amount: '',
        invoice: null,
        emp_name :''
    });

    
    console.log(invoiceData);
    console.log(props.selectedOperatorData);

    const { compressImage } = useImageCompressor();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/financialconfig`);
                console.log(response);

                // operator saturation limit at index 4 
                setOperatorSaturationLimit(response.data.finconfig[4].value);  
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data");
            }
        };

        fetchData();
    }, []);



    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        const compressedFile = await compressImage(file);
       
        setInvoiceData({
                ...invoiceData,
                invoice: compressedFile,
            });
    };




        
  const handleSubmit = async (e) => {
    const data = props.selectedOperatorData
    e.preventDefault();
    const { payment_Date, emp_id, amount ,invoice, emp_name } = invoiceData;

    if (invoice) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      const formData = new FormData();
      formData.append('emp_Name', data.name);
      formData.append('emp_Id',data.emp_Id);
      formData.append('amount', operatorSaturationLimit);
      formData.append('date', formattedDate);
      formData.append('image', invoiceData.invoice);

      try {
        console.log(formData);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/payOperator`, formData);
        // console.log('Success:', response);
        props.setTableRowToggle(prevValue => !prevValue);
        props.setIsPaymentPopUp(false);
        toast.success(response.data.message);
      } catch (error) {
        console.error('Error uploading invoice:', error);
        toast.error("Error uploading invoice. Please try again.");
      }
    } else {
      toast("Add the invoice image📌");
    }
  };


    return (
        <div className='w-[100vw] h-[100vh] backdrop-blur-sm bg-[#0000003b] absolute top-0 left-0 flex justify-center items-center '>
        <div className='w-[1000px] h-[600px] bg-white rounded'>
            <div className='w-full h-[15%] ps-8 font-semibold text-xl text-white bg-[#5799FD] rounded relative flex items-center'>
                Operator Payment
                <button 
                    className="w-[30px] h-[30px] text-black font-medium bg-white hover:text-white hover:bg-blue-700 rounded absolute right-[30px]"
                    onClick={() => {
                        props.setIsPaymentPopUp(false);
                    }}
                >x</button>
            </div>
 
            <div className='w-full h-[85%] flex'>

                

                    <div className='w-[60%] h-full p-5 flex flex-col justify-between'>
                        <div className='w-full'>
                            <div className='flex pt-4'>
                                <p className='w-[50%] text-black'>Amount payable : { operatorSaturationLimit }</p>
                            </div>

                            <div className='flex pt-4'>
                                <p className='text-black'>Upload Bill:</p>
                    
                                <input 
                                    className="h-[35px] ms-4 rounded-[6px] outline-black" 
                                    type="file" 
                                    name="image"
                                    placeholder='Upload Image'
                                    accept='image/*'
                                    onChange={handleImageChange}  
                                />
                            </div>
                        </div>

                        

                        <button 
                            className='mb-5 w-[500px] h-[50px] bg-[#23A058] text-white rounded-xl hover:bg-[#23a057d0]'
                            // disabled = { String((Number(paymentAmountRef.current.value) - discount)).startsWith("-") || String((Number(paymentAmountRef.current.value) - discount)).startsWith("0")}
                            // onClick={() => {
                            //     // console.log(appointmentImageRef.current.value);
                            //     paymentClickHandler(String((Number(paymentAmountRef.current.value) - discount)), paymentMethodRef.current.value, "Completed", date)
                            // }}
                            onClick={(e)=>{
                                handleSubmit(e)
                            }}
                        >
                            Pay Rs. { operatorSaturationLimit }
                            {/* Payment of Rs. { String((Number(paymentAmountRef.current.value) - discount)).startsWith('-') ? "" : String((Number(paymentAmountRef.current.value) - discount)) } */}
                        </button>
                    </div>

                    <div className='w-[40%] h-full p-10'>
                        {/* <img className="w-full h-full  border-[0.2px] border-black rounded" src="" alt="" /> */}
                        {
                            invoiceData.invoice ? (
                                <img className="w-full h-full border-[0.2px] border-black rounded" src={URL.createObjectURL(invoiceData.invoice)} alt="invoice" />
                            ) : (
                                <div className="w-full h-full text-gray-500 border-[0.2px] border-black rounded flex justify-center items-center">No invoice uploaded</div>
                            )
                        }
                    </div>
                </div>

        </div>
    </div>
    )
}

export default OperatorPaymentPopUp