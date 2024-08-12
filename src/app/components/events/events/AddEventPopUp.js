// import React from 'react'
// import { BiCloudUpload } from "react-icons/bi";

// function AddEventPopUp(props) {
//   return (
//     <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
//         <div className='w-[1000px] h-[550px] bg-[#D9D9D9] rounded'>

//             <div className='w-full h-[10%] px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
//                 <h1 className='text-xl text-white font-bold'>Add New Event</h1>
//                 <button 
//                     className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
//                     onClick={() => {
//                         props.setAddEventStatus(false)
//                     }}
//                 >X</button>
//             </div>


//             <div className='w-full h-[90%] px-20 rounded-b'>

//                 <div className='w-full h-[15%] flex justify-between items-center'>
//                     <input 
//                         className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                         type="text"
//                         placeholder="Name" 
//                         name="" 
//                         id="" 
//                     />
//                     <div className='w-[45%] h-full flex justify-between items-center'>
//                         <input 
//                             className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                             type="date"
//                             placeholder="Date"
//                             min= {new Date()} 
//                             name="" 
//                             id="" 
//                         />
//                         <input 
//                             className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                             type="time"
//                             // placeholder="Time"
//                             name="time"
//                             min="00:00"
//                             max="12:00"
//                             id="" 
//                         />
//                     </div>
                    
//                 </div>
//                 <div className='w-full h-[15%] flex justify-between items-center'>
//                     <input 
//                         className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                         type="text"
//                         placeholder="Location" 
//                         name="" 
//                         id="" 
//                     />
//                     {/* <input 
//                         className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                         type="text"
//                         placeholder="Priority" 
//                         name="" 
//                         id="" 
//                     /> */}
//                     <select
//                         className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                         name="priority" 
//                         id=""
//                     > 
//                         <option value="" disabled selected>Priority</option>
//                         <option value="Low">Low</option>
//                         <option value="Medium">Medium</option>
//                         <option value="High">High</option>
//                     </select>
//                 </div>
//                 <div className='w-full h-[30%]'>
//                     <textarea
//                         className="w-full h-full rounded border-[2px] border-[rgba(0,0,0,0.36)]" 
//                         name="" 
//                         id="" 
//                         cols="30" 
//                         rows="10"
//                         placeholder="Description"
//                     ></textarea>
//                 </div>
//                 <div className='w-full h-[40%] py-6 rounded relative'>
                    
//                         <div className="w-[45%] h-full rounded flex justify-center items-center bg-[#999393]">
//                         <label className="w-full h-full" htmlFor="eventImage">
//                             {/* { 
//                                 productData.productImage ? <img className="w-100 h-100 object-fit-scale" src={productData.productImage} alt="product"/> : <span className="fs-1"  role="button"><BsCloudUpload /></span>
//                             } */}
//                             <span className="w-full h-full text-lg flex flex-col items-center justify-center"  role="button"><BiCloudUpload className='text-3xl'/> Upload Image</span>
//                             <input 
//                                 type="file" 
//                                 className="" 
//                                 id="eventImage" 
//                                 name="" 
//                                 accept="image/*" 
//                                 // onChange={uploadImage}
//                                 hidden
//                             />  
//                             </label> 
//                         </div>
                    
                        
//                     <button
//                         className="w-[120px] h-[40px] mb-6 bg-[#ff8710] hover:bg-[#ff8810d1] text-white font-semibold rounded absolute bottom-0 right-0"
//                     >
//                         Save
//                     </button>
//                 </div>

//             </div>



//         </div>
//     </div>
//   )
// }

// export default AddEventPopUp








// import React, { useState } from 'react';
// import { BiCloudUpload } from "react-icons/bi";
// import axios from 'axios'

// function AddEventPopUp(props) {
//   const [eventData, setEventData] = useState({
//     event_name: "",
//     event_description: "",
//     priority: "",
//     place: "",
//     date: "",
//     image: "",
//     event_time : ""
//   });

//   console.log(eventData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };



//   async function uploadEventImage(event) {
//     const file = event.target.files[0]; // Get the first file from the input

//     setEventData((prevValue) => {
//       return {
//         ...prevValue,
//         image : file
//       }
//     })
// }





//   const handleSubmit = async () => {


//     const { event_name, event_description, priority, place, date, image, event_time} = eventData;

//     if(event_name && event_description && priority && place && date && image && event_time) {
      
//       const formData = new FormData();
      
//       formData.append('event_name', event_name);
//             formData.append('event_description', event_description);
//             formData.append('priority', priority);
//             formData.append('place', place);
//             formData.append('date', date);
//             formData.append('image', image);
//             formData.append('event_time', event_time);

//             console.log(formData);

//       try {
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-event`, formData)
//         .then(response => {
//             if (response.ok) {
//               return response.json();
//             }
//             throw new Error('Network response was not ok.');
//           })
//           .then(data => {
//             console.log('Success:', data);
//             // Optionally, handle success response here
//             // For example, close the popup after successful submission
//             props.setAddEventStatus(false);
//           })

//       } catch (error) {

//         console.error('Error uploading event:', error);
//       }
      
//       // fetch(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-event`, {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //   },
//       //   body: JSON.stringify(eventData),
//       // })
//       // .then(response => {
//       //   if (response.ok) {
//       //     return response.json();
//       //   }
//       //   throw new Error('Network response was not ok.');
//       // })
//       // .then(data => {
//       //   console.log('Success:', data);
//       //   // Optionally, handle success response here
//       //   // For example, close the popup after successful submission
//       //   props.setAddEventStatus(false);
//       // })
//       // .catch((error) => {
//       //   console.error('Error:', error);
//       //   // Optionally, handle error response here
//       // });

//     } else {
//       alert("Enter the required informations");
//     }


//   };

//   return (
//     <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
//       <div className='w-[1000px] h-[550px] bg-[#D9D9D9] rounded'>
//         <div className='w-full h-[10%] px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
//           <h1 className='text-xl text-white font-bold'>Add New Event</h1>
//           <button 
//             className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
//             onClick={() => {
//               props.setAddEventStatus(false);
//             }}
//           >X</button>
//         </div>

//         <div className='w-full h-[90%] px-20 rounded-b'>

//           <form className='w-full h-full'>

//           <div className='w-full h-[15%] flex justify-between items-center'>
//             <input 
//               className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//               type="text"
//               placeholder="Name" 
//               name="event_name"
//               value={eventData.event_name}
//               onChange={handleChange}
//             />
//             <div className='w-[45%] h-full flex justify-between items-center'>
//               <input 
//                 className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                 type="date"
//                 placeholder="Date"
//                 min={new Date().toISOString().split("T")[0]}
//                 name="date"
//                 value={eventData.date}
//                 onChange={handleChange}
//               />
//               <input 
//                 className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//                 type="time"
//                 name="event_time"
//                 value={eventData.event_time}
//                 onChange={handleChange}

//               />
//             </div>
//           </div>
//           <div className='w-full h-[15%] flex justify-between items-center'>
//             <input 
//               className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//               type="text"
//               placeholder="Location" 
//               name="place"
//               value={eventData.place}
//               onChange={handleChange}
//             />
//             <select
//               className='w-[45%] h-[40px] rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
//               name="priority" 
//               value={eventData.priority}
//               onChange={handleChange}
//             > 
//               <option value="" disabled>Select Priority</option>
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>
//           <div className='w-full h-[30%]'>
//             <textarea
//               className="w-full h-full rounded border-[2px] border-[rgba(0,0,0,0.36)]" 
//               name="event_description"
//               value={eventData.event_description}
//               onChange={handleChange}
//               cols="30" 
//               rows="10"
//               placeholder="Description"
//             ></textarea>
//           </div>
//           <div className='w-full h-[40%] py-6 rounded relative'>
//             <div className="w-[45%] h-full rounded flex justify-center items-center bg-[#999393]">
//               <label className="w-full h-full" htmlFor="eventImage">
//                 <span className="w-full h-full text-lg flex flex-col items-center justify-center"  role="button"><BiCloudUpload className='text-3xl'/> Upload Image</span>
//                 <input 
//                   type="file" 
//                   className="" 
//                   id="eventImage" 
//                   name="image" 
//                   accept="image/*" 
//                   hidden
//                   onChange={uploadEventImage}
//                 />  
//               </label> 
//             </div>
//             <button
//               className="w-[120px] h-[40px] mb-6 bg-[#ff8710] hover:bg-[#ff8810d1] text-white font-semibold rounded absolute bottom-0 right-0"
//               onClick={handleSubmit}
//             >
//               Save
//             </button>
//           </div>

//           </form>



//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddEventPopUp;








"use client"

import React, { useState } from 'react';
import { BiCloudUpload } from "react-icons/bi";
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-hot-toast'
import useImageCompressor from '../../ImageCompression/useImageCompressor';

function AddEventPopUp(props) {

  const [previewImage, setPreviewImage] = useState();

  const [eventData, setEventData] = useState({ 
    event_name: "",
    event_description: "",
    priority: "",
    place: "",
    date: "",
    image: null,
    event_time: ""
  });

  const { compressImage } = useImageCompressor();

  console.log(eventData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const adjustTimeFormat = (inputTime) => {
  //   // to format time to 12-hour format, as sometimes the system time will be in 24-hour format
  //   const [hours, minutes] = inputTime.split(":");
  //   let newHours = parseInt(hours, 10) % 12;
  //   if (newHours === 0) newHours = 12; // Handle 0 hour(midnight)
  //   const period = parseInt(hours, 10) >= 12 ? "PM" : "AM";
  //   return `${newHours}:${minutes} ${period}`;
  // };

  // const handleChangeTime = (e) => {

  //   const adjustedTime = adjustTimeFormat(e.target.value);
  //   setEventData((prevValue) => ({
  //     ...prevValue,
  //     event_time: adjustedTime
  //   }));
  // };

  const uploadEventImage = async (event) => {
    const file = event.target.files[0];

    const compressedFile = await compressImage(file);

    if (compressedFile) {
      console.log(compressedFile);
      setEventData((prevValue) => ({
        ...prevValue,
        image: compressedFile
      }));
      setPreviewImage(URL.createObjectURL(compressedFile));
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { event_name, event_description, priority, place, date, image, event_time } = eventData;

    if (event_name && event_description && priority && place && date && image && event_time) {

      // formatting time to 15:00 Am format and append to form
      var time = moment(event_time, "HH:mm");
      const formattedTime = time.format('h:mm a');
  
      

      const formData = new FormData();

      formData.append('event_name', event_name);
      formData.append('event_description', event_description);
      formData.append('priority', priority);
      formData.append('place', place);
      formData.append('date', date);
      formData.append('image', image);
      formData.append('event_time', formattedTime);

      try {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-event`, formData);
        // console.log('Success:', response.data);
        props.setAddEventStatus(false);
        // alert(response.data.message);
        toast.success(response.data.message);
        props.setFilterToggle(prevValue => !prevValue);

      } catch (error) {
        // console.error('Error uploading event:', error);
        // Log the error to the console
        // alert("Error uploading event. Please try again."); // Optionally, inform the user about the error
        toast.error("Error uploading event. Please try again.");
      }
      
    } else {
      toast("Enter the required information📌📍");
    }
  };

 
  return (
    <div className="w-screen min-h-screen md:h-screen px-2 py-10 md:p-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">

      <div className='w-full md:w-[1000px] md:h-[550px] bg-[#D9D9D9] rounded'>

        <div className='w-full h-16 md:h-[10%] px-5 md:px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
          <h1 className='text-lg md:text-xl text-white font-bold'>Add New Event</h1>
          <button
            className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
            onClick={() => {
              props.setAddEventStatus(false);
            }}
          >X</button>
        </div>

        <div className='w-full md:h-[90%] px-2 md:px-20 py-5 md:py-0 rounded-b'>

          
            <div className='w-full h-[15%] flex flex-col md:flex-row justify-between items-center'>
              <input
                className='w-full md:w-[45%] h-[40px] mb-2 md:mb-0 px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
                type="text"
                placeholder="Name"
                name="event_name"
                value={eventData.event_name}
                onChange={handleChange}
              />
              <div className='w-full md:w-[45%] h-full mb-2 md:mb-0 flex justify-between items-center'>
                <input
                  className='w-[45%] h-[40px] px-1 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
                  type="date"
                  placeholder="Date"
                  min={new Date().toISOString().split("T")[0]}
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                />
                <input
                  className='w-[45%] h-[40px] px-1 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
                  type="time"
                  name="event_time"
                  value={eventData.event_time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='w-full h-[15%] flex flex-col md:flex-row justify-between items-center'>
              <input
                className='w-full md:w-[45%] h-[40px] mb-2 md:mb-0 px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
                type="text"
                placeholder="Location"
                name="place"
                value={eventData.place}
                onChange={handleChange}
              />
              <select
                className='w-full md:w-[45%] h-[40px] mb-2 md:mb-0 px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]'
                name="priority"
                value={eventData.priority}
                onChange={handleChange}
              >
                <option value="" disabled>Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className='w-full h-[30%]'>
              <textarea
                className="w-full h-full p-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]"
                name="event_description"
                value={eventData.event_description}
                onChange={handleChange}
                cols="30"
                rows="10"
                placeholder="Description"
              ></textarea>
            </div>

            <div className='w-full md:h-[40%] mb-2 md:mb-0 md:py-6 rounded relative'>

              <div className="w-full md:w-[35%] h-[35vh] md:h-full rounded flex justify-center items-center bg-[#999393]">
                <label className="w-full h-full relative" htmlFor="image">

                  {
                    eventData.image ? (
                            <>
                              <img className="w-full h-full object-contain" src = { previewImage } alt="event image"/>
                              <span className="w-full h-full hover:text-lg hover:text-white  hover:bg-[#00000048] absolute top-0 left-0 flex flex-col items-center justify-center"  role="button"><BiCloudUpload className='text-3xl'/> Edit Image</span>
                            </>
                    ) : (
                      <span className="w-full h-full text-lg flex flex-col items-center justify-center" role="button"><BiCloudUpload className='text-3xl' /> Upload Image</span>
                    )
                  }
                  <input
                    type="file"
                    className=""
                    id="image"
                    name="image"
                    accept="image/*"
                    hidden
                    onChange={uploadEventImage}
                  />
                </label>
              </div>
              <button
                className="w-full md:w-[120px] h-[40px] mt-4 md:mt-0 mb-6 bg-[#ff8710] hover:bg-[#ff8810d1] text-white font-semibold rounded md:absolute bottom-0 right-0"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default AddEventPopUp;
