 "use client"
 
 import React, { useState, useEffect} from 'react'
 import { BiCloudUpload } from "react-icons/bi";
 import axios from 'axios'
 import { toast } from 'react-hot-toast'
 import moment from 'moment';
 import useImageCompressor from '../../ImageCompression/useImageCompressor';




 function EditPopUp(props) {

  const [eventData, setEventData] = useState({});

  const [edittedData, setEdittedData] = useState({});

  const [previewImage, setPreviewImage] = useState();

  const { compressImage } = useImageCompressor();


  console.log(edittedData);




  useEffect(() => {
    const fetchData = async () => {
        try {

          const eventId = props.eventId;

          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/get-event/${eventId}`);
        //   console.log(response.data.user);
          setEventData(response.data.user);
          setEdittedData(response.data.user);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
  
    };
  
    fetchData();

    return () => {
        return;
    }

}, []);


function handleChange(e) {
  const { name, value } = e.target;
  setEdittedData((prev) => ({
      ...prev,
      [name]: value,
    }));
}

async function uploadImage(event) {
    const file = event.target.files[0];

    // const compressedFile = await compressImage(file);

    // if (compressedFile) {
    //   console.log(compressedFile);
    //   setEdittedData((prevValue) => ({
    //     ...prevValue,
    //     image: compressedFile
    //   }));
    //   setPreviewImage(URL.createObjectURL(compressedFile));
    // }

    setEdittedData((prevValue) => ({
      ...prevValue,
      image: file
    }));
    setPreviewImage(URL.createObjectURL(file));



}



const handleSubmit = async (e) => {
    e.preventDefault();

    const eventId = props.eventId;
    // console.log((eventId));

    const { event_name, event_description, priority, place, date, image, event_time } = edittedData;
         
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

    //   console.log(formData);

      try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-event/${eventId}`, formData);
        console.log(response);
        // alert(response.data.message);
        toast.success(response.data.message);
        props.setFilterToggle(prevValue => !prevValue);
        props.setEditEvent(false);
        
      } catch (error) {
        console.error('Error uploading event:', error);
        // Log the error to the console
        // alert("Error uploading event. Please try again."); // Optionally, inform the user about the error
        toast.error("Error uploading event. Please try again.");

      }
    
  };




   return (

     <div className="w-screen min-h-screen md:h-screen px-2 py-10 md:p-0 bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">

         <div className='w-full md:w-[1000px] md:h-[550px] bg-[#D9D9D9] rounded'>

             <div className='w-full h-16 md:h-[10%] px-5 md:px-10 bg-[#5799fd] rounded-t flex items-center justify-between'>
                 <h1 className='text-lg md:text-xl text-white font-bold'>Edit Event</h1>
                 <button 
                     className='w-8 h-8 rounded bg-blue-600 text-white hover:bg-white hover:text-black'
                     onClick={() => {
                         props.setEditEvent(false);
                     }}
                 >X</button>
             </div>

             <div className='w-full md:h-[90%] px-2 md:px-20 py-5 md:py-0 rounded-b'>

                 <div className='w-full h-[15%] flex flex-col md:flex-row justify-between items-center'>
                     <input 
                         className='w-full md:w-[45%] h-[40px] mb-2 md:mb-0 px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
                         type="text"
                         placeholder = "Name"
                         name="event_name" 
                         value={edittedData.event_name}
                         id=""
                         onChange={handleChange} 
                     />
                     <div className='w-full md:w-[45%] h-full mb-2 md:mb-0 flex justify-between items-center'>
                         <input 
                             className='w-[45%] h-[40px] px-1 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
                             type="date"
                             placeholder="Date"
                             min= {new Date()} 
                             name="date"
                             value={edittedData.date}
                             id="" 
                            onChange={handleChange} 
                         />
                         <input 
                             className='w-[45%] h-[40px] px-1 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
                             type="time"
                             // placeholder="Time"
                             name="event_time"
                             value={edittedData.event_time}
                             min="00:00"
                             max="12:00"
                             id=""
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
                         value={edittedData.place}
                         id=""
                         onChange={handleChange} 

                     />
                     
                     <select
                         className='w-full md:w-[45%] h-[40px] mb-2 md:mb-0 px-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]' 
                         name="priority"
                         value= {edittedData.priority}
                         id=""
                         onChange={handleChange} 
                     > 
                         <option value="" disabled selected>Priority</option>
                         <option value="Low">Low</option>
                         <option value="Medium">Medium</option>
                         <option value="High">High</option>
                     </select>
                 </div>

                 <div className='w-full h-[30%]'>
                     <textarea
                         className="w-full h-full p-2 bg-white text-black rounded border-[2px] border-[rgba(0,0,0,0.36)]" 
                         name="event_description" 
                         value= {edittedData.event_description}
                         id="" 
                         cols="30" 
                         rows="10"
                         placeholder="Description"
                         onChange={handleChange} 
                     ></textarea>
                 </div>

                 <div className='w-full h-[40%] mb-2 md:mb-0 md:py-6 rounded relative'>
                  
                        <div className="w-full md:w-[35%] h-[35vh] md:h-full rounded flex justify-center items-center bg-[#999393]">

                            <label className="w-full h-full relative" htmlFor="eventImage">
                                { 
                                    edittedData.image ? 
                                    (  
                                       <>
                                           <img className="w-full h-full object-cover" src = { previewImage ? previewImage : edittedData.image } alt="event image"/>
                                           <span className="w-full h-full hover:text-lg hover:text-white  hover:bg-[#00000048] absolute top-0 left-0 flex flex-col items-center justify-center"  role="button"><BiCloudUpload className='text-3xl'/> Edit Image</span>
                                       </>
                                    ) : (
                                       <span className="w-full h-full text-lg flex flex-col items-center justify-center"  role="button"><BiCloudUpload className='text-3xl'/> Upload Image</span>
                                    )
                                }
                                <input 
                                    type="file" 
                                    className="" 
                                    id="eventImage" 
                                    name="image" 
                                    value= ""
                                    accept="image/*" 
                                    onChange={ uploadImage }
                                    hidden
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
   )
 }
 export default EditPopUp