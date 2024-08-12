
"use client"
 
import React, {useState, useEffect, useRef} from 'react';
// import { useAppointStore } from '@/app/admin/appointments/appointments/ashramAppointmentState';
import { useAppointFilterStore } from "@/app/appointments/appointments/filterstate";
import { toast } from 'react-hot-toast'
import axios  from 'axios';
import useImageCompressor from '../../ImageCompression/useImageCompressor';
 
 
function AppointmentCheckOut(props) {
 
 
    // const appointmentState = useAppointStore((state) => {
    //     return state;
    // });
    const filterState = useAppointFilterStore((state) => {
        return state;
    });
    
    const [data, setData] = useState([]);
 
    const [date, setDate] = useState("");
 
    const [image, setImage] = useState(null);
 
    const [finalPayment,setFinalPayment] = useState(0);

    console.log("Image STATE", image);
 
    const paymentAmountRef = useRef("")
    const paymentMethodRef = useRef("")

    console.log(paymentAmountRef);
 
    // const appointmentImageRef = useRef("")
 
    // console.log(appointmentImageRef.current.value);
 
    const discount = data.discount;
    // console.log(discount);

    const { compressImage } = useImageCompressor();

 
    useEffect(() => {
 
      fetchData();
 
      return () => {
        // Your cleanup logic here
        console.log("Component unmounted");
    };
 
    }, []);

    
 
 
 
    async function uploadImage(event) {
        const file = event.target.files[0]; // Get the first file from the input
 
        try {
            const compressedFile = await compressImage(file);

            setImage(compressedFile); // Set the image file itself, not its URL
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
 
    async function paymentClickHandler(totalAmount, paymentType, status, days) {

        if (image) {
            const formData = new FormData();
            formData.append('payment', totalAmount);
            formData.append('payment_method', paymentType);
            formData.append('appointment_status', status);
            formData.append('room', days);
            formData.append('appointmentImage', image);
 
            console.log(formData);
 
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-payment/${filterState.id}`, formData);
                
                // window.location.reload();
                if(!props.isFilteredData){
                    // return;
                    // window.location.reload();
                    props.setFilterToggle(!props.filterToggle)
                    filterState.setPaymentToggle(false, undefined);

                } else {
                    props.handleSearch(props.filteredPageNo)
                    filterState.setPaymentToggle(false, undefined);    
                }
                toast.success("Payment updated successfully!")

            } catch (error) {
                // console.error('Error uploading payment:', error);
                toast.error("Error while uploading payment details.");
            }
        } else {
            toast("Please upload appointment bill image");
        }
    }
 
 
 
 
 
    async function fetchData() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/superadmin/list-appointment/${filterState.id}`
      );
      console.log(response.data);
      setData(response.data.appointment);

      let startDate = response.data.appointment.appointmentDate.split("/");
      let endDate = response.data.appointment.check_out.split("/");
 
      startDate = `${startDate[2]}/${startDate[1]}/${startDate[0]}`;
      endDate = `${endDate[2]}/${endDate[1]}/${endDate[0]}`;
 
      console.log(startDate, endDate);

      var checkInDate = new Date(startDate); // Check-in date
      var checkOutDate = new Date(endDate); // Check-out date
 
      var difference_ms = Math.abs(checkOutDate - checkInDate);
 
      var difference_days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));
 
      console.log("Difference in days:", difference_days);
      setDate(difference_days === 0 ? 1 : difference_days);
      return;
    }
 
 
 
 
 
 
  return (
    <div className='w-full min-h-screen h-screen px-2 md:px-0 backdrop-blur-sm bg-[#0000003b] absolute top-0 left-0 flex justify-center items-center '>
        <div className='w-full md:w-[600px] h-[500px] bg-white rounded'>
            <div className='w-full h-16 md:h-[15%] ps-8 font-semibold text-xl text-white bg-[#5799FD] rounded-t relative flex items-center'>
                Check-out Payment
                <button 
                    className="w-[30px] h-[30px] text-black font-medium bg-white hover:text-white hover:bg-blue-700 rounded absolute right-[30px]"
                    onClick={() => {
                        filterState.setPaymentToggle(false, undefined);
                    }}
                >x</button>
            </div>
 
            <div className='w-full h-[85%] text-center'>

                <div className='w-full md:w-[75%] mt-4 mx-auto text-sm md:text-base'>
                        <div className='flex items-center pt-4'>
                            <p className='w-[50%] text-black'>Number of days stayed</p>
                            <p>: {date}</p>
                        </div>
                        <div className='flex items-center pt-4'>
                            <p className='w-[50%] text-black'>Ashram stay payment</p>
 
                            <input 
                                className="h-[35px] ps-3 rounded-[6px] outline-black bg-white text-black border-black border-[1px]" 
                                type="number" 
                                name="payment"
                                placeholder='Enter amount'
                                ref={paymentAmountRef}
 

                                    onChange = { ()=>{
                                        console.log(paymentAmountRef.current.value)
                                        let final = String((Number(paymentAmountRef.current.value) - discount)).startsWith('-') ? 0 : String((Number(paymentAmountRef.current.value) - discount))
                                        console.log(final);
                                        setFinalPayment(final)
                                    }}
                            />
                        </div>
                        <div className='flex items-center pt-4'>
                            <p className='w-[50%] text-black'>Reward/Discount received</p>
                            <p>: Rs. {data.discount ? data.discount : "0"}</p>
                        </div>
                        <div className='flex items-center pt-4'>
                            <p className='w-[50%] font-semibold text-black'>Total payment</p>
                            <p>: Rs. { finalPayment}
                            </p>
                        </div>  
                        <div className='flex items-center pt-4'>
                            <p className='w-[50%] text-black'>Type of Payment</p>
                            {/* <p>: njhgfd</p> */}
                            <select 
                                className='w-[150px] h-[35px] p-0 ps-2 rounded-[6px] outline-black bg-white text-black border-black border-[1px]'  
                                name="payment_method" 
                                ref={paymentMethodRef}
                            > Select
                                <option disabled>Select</option>
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                            </select>
                        </div> 
                        <div className='flex items-center pt-4'>
                            <p className='w-[50%] text-black'>Upload Bill:</p>
 
                            <input 
                                className="h-[35px] rounded-[6px] outline-black" 
                                type="file" 
                                name="image"
                                placeholder='Upload Image'
                                accept='image/*'
                                onChange={uploadImage}  
                            />
                        </div>
 
 
 
                </div>
 
 
                <button 
                    className='mt-10 w-[75%] md:w-[50%] h-[50px] bg-[#23A058] text-white rounded-xl hover:bg-[#23a057d0]'
                    disabled = { String((Number(paymentAmountRef.current.value) - discount)).startsWith("-") || String((Number(paymentAmountRef.current.value) - discount)).startsWith("0")}
                    onClick={() => {
                        // console.log(appointmentImageRef.current.value);
                        paymentClickHandler(String((Number(paymentAmountRef.current.value) - discount)), paymentMethodRef.current.value, "Completed", date)
                    }}
                >
                    Payment of Rs. { String((Number(paymentAmountRef.current.value) - discount)).startsWith('-') ? "" : String((Number(paymentAmountRef.current.value) - discount)) }
                </button>
 
            </div>
        </div>
    </div>
  )
}
 
export default AppointmentCheckOut