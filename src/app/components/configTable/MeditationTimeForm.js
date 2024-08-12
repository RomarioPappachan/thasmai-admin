//  "use client"
//  import React, { useState , useEffect} from 'react'
//  import axios from 'axios'
// import { input } from '@material-tailwind/react';

// function MeditationTimeForm() {

//   const [countryList, setCountryList] = useState([]);
//   const [ isFocusedMorningFrom , setIsFocusedMorningFrom ] = useState(false);
//   const [ isFocusedMorningTo , setIsFocusedMorningTo ] = useState(false);
//   const [ isFocusedEveningFrom , setIsFocusedEveningFrom ] = useState(false);
//   const [ isFocusedEveningTo, setIsFocusedEveningTo ] = useState(false);



  
//   console.log(countryList);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/countrieslist`);
//           setCountryList(response.data);
//           console.log(response);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();

//     return () => {
//         return;
//     }


//   }, []);

  


//   return (
//     <div>
//         <p className='text-black font-medium'>Add Meditation Time by Country</p>
//         <div className='mt-6 flex'>
//           <select 
//              className='w-full md:w-[30%] h-10 p-2 ps-5 mb-5 bg-[#FDFBFF] text-black border-[1px] border-black rounded-md'
                            
//           >
//            <option value="" disabled selected>---Select a country---</option>
//            {
//               countryList.map((country, index) => {
//                 return (
//                   <option value={country.name} key={index}>
//                   {country.name}
//                 </option>
//                 )
//               })
//            }
          
//          </select>

//             <p className='h-10 ps-20 text-black flex items-end'>Add General Video Url</p>
//             <input 
//              className='w-[40%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md '
//              type='text'
//             /> 
//         </div>
//         <p className='text-black font-medium'>Morning Meditation</p>

//             <div className='mt-4 flex'>
//               <p className='h-10 text-black font-medium flex items-center ms-10'>Time</p>
//               <input 
//                  className='w-40 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//                  placeholder='From'
//                  type ={!isFocusedMorningFrom ? 'text' : 'time'}
//                  onFocus={() => setIsFocusedMorningFrom(true)}
//                  onBlur={() => setIsFocusedMorningFrom(false)}
//                />
              
            
//               <input 
//                  className='w-40 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//                  placeholder='To'
//                  type ={!isFocusedMorningTo ? 'text' : 'time'}
//                  onFocus={() => setIsFocusedMorningTo(true)}
//                  onBlur={() => setIsFocusedMorningTo(false)}
//                />
//               <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
//               <input 
//                  className='w-[45%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md '
//                  type='text'
//                 /> 
//             </div>

//             <p className='text-black font-medium mt-5'>Evening Meditation</p>

//             <div className='mt-4 flex'>
//               <p className='h-10 text-black font-medium flex items-center ms-10'>Time</p>
//               <input 
//                  className='w-40 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//                  placeholder='From'
//                  type ={!isFocusedEveningFrom ? 'text' : 'time'}
//                  onFocus={() => setIsFocusedEveningFrom(true)}
//                  onBlur={() => setIsFocusedEveningFrom(false)}
//                />
//              <input 
//                  className='w-40 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//                  placeholder='To'
//                  type ={!isFocusedEveningTo ? 'text' : 'time'}
//                  onFocus={() => setIsFocusedEveningTo(true)}
//                  onBlur={() => setIsFocusedEveningTo(false)}
//                />
              
//               <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
//               <input 
//                  className='w-[45%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md '
//                  type='text'
//                 /> 
//             </div>

//             <button className='h-12 w-[450px] mt-10 bg-[#005DB8] hover:bg-[#005cb8d1] text-white rounded-2xl'>
//                  Add Meditation Time
//             </button>

//     </div>
//   )
// }

// export default MeditationTimeForm



// "use client"
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// function MeditationTimeForm() {
//   const [countryList, setCountryList] = useState([]);
//   const [ isFocusedMorningFrom , setIsFocusedMorningFrom ] = useState(false);
//   const [ isFocusedMorningTo , setIsFocusedMorningTo ] = useState(false);
//   const [ isFocusedEveningFrom , setIsFocusedEveningFrom ] = useState(false);
//   const [ isFocusedEveningTo, setIsFocusedEveningTo ] = useState(false);

   

//   const [formData, setFormData] = useState({
//     country: '',
//     general_video: '',
//     morning_time_from: '',
//     morning_time_to: '',
//     evening_time_from: '',
//     evening_time_to: '',
//     morning_video: '',
//     evening_video: ''
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/countrieslist`);
//         setCountryList(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     const {
//       country,
//       general_video,
//       morning_time_from,
//       morning_time_to,
//       evening_time_from,
//       evening_time_to,
//       morning_video,
//       evening_video
//     } = formData;

//     if (
//       country &&
//       general_video &&
//       morning_time_from &&
//       morning_time_to &&
//       evening_time_from &&
//       evening_time_to &&
//       morning_video &&
//       evening_video
//     ) {
//       try {
//         // Convert morning and evening times to 12-hour format
//         const convertTo12HourFormat = (time) => {
//           const [hours, minutes] = time.split(":");
//           const period = parseInt(hours) >= 12 ? "PM" : "AM";
//           let newHours = parseInt(hours) % 12;
//           newHours = newHours === 0 ? 12 : newHours;
//           return `${newHours}:${minutes} ${period}`;
//         };

//         const formattedFormData = {
//           ...formData,
//           morning_time_from: convertTo12HourFormat(morning_time_from),
//           morning_time_to: convertTo12HourFormat(morning_time_to),
//           evening_time_from: convertTo12HourFormat(evening_time_from),
//           evening_time_to: convertTo12HourFormat(evening_time_to)
//         };

//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-meditation-time`, formattedFormData);
//         console.log(response.data);
//         toast.success(response.data.message);

        
//         setFormData({
//           country: '',
//           general_video: '',
//           morning_time_from: '',
//           morning_time_to: '',
//           evening_time_from: '',
//           evening_time_to: '',
//           morning_video: '',
//           evening_video: ''
//         });
//       } catch (error) {
//         console.error(error);
//         toast.error('Error submitting form. Please try again.');
//       }
//     } else {
//       toast.error('Please fill in all fields.');
//     }
//   };
  
//   document.addEventListener('DOMContentLoaded', function() {
//     const fileInput = document.getElementById('fileInput');
//     const fileNameSpan = document.getElementById('fileName');

//     if (fileInput) {
//         fileInput.addEventListener('change', function(event) {
//             const file = event.target.files[0];

//             if (file) {
//                 fileNameSpan.textContent = file.name;
//                 fileNameSpan.classList.remove('text-gray-400');
//                 fileNameSpan.classList.add('text-gray-800');
//             } else {
//                 fileNameSpan.textContent = 'Select an image';
//                 fileNameSpan.classList.remove('text-gray-800');
//                 fileNameSpan.classList.add('text-gray-400');
//             }
//         });
//     } else {
//         console.error('File input element not found.');
//     }
// });

//   return (
//     <div>
//       <p className='text-black font-medium'>Add Meditation Time by Country</p>
//       <form onSubmit={handleSubmit}>
//         <div className='mt-6 flex'>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className='w-full md:w-[32%] h-10 p-2 ps-6 ms-11 mb-5 bg-[#FDFBFF] text-black border-[1px] border-black rounded-md'
//           >
//             <option value="" disabled>---Select a country---</option>
//             {countryList.map((country, index) => (
//               <option value={country.name} key={index}>
//                 {country.name}
//               </option>
//             ))}
//           </select>

//           <p className='h-10 ps-16 text-black flex items-end'>Add General Video Url</p>
//           <input
//             name="general_video"
//             value={formData.general_video}
//             onChange={handleChange}
//             className='w-[20%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md'
//             type='text'
//           />

// <label class="h-10 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 ms-12">
//             <input type="file" class="hidden" id="fileInput" accept="image/*"/>
//             <span class="text-gray-400" id="fileName">Select an image</span>
//         </label>
//         </div>

//         <p className='text-black font-medium'>Morning Meditation</p>
        
//         <div className='mt-4 flex'>
//         <p className='flex justify-center items-center ms-10 text-black'>Time</p>
//           <input
//             name="morning_time_from"
//             value={formData.morning_time_from}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='From'
//             type ={!isFocusedMorningFrom ? 'text' : 'time'}
//             onFocus={() => setIsFocusedMorningFrom(true)}
//             onBlur={() => setIsFocusedMorningFrom(false)}
//           />

//           <input
//             name="morning_time_to"
//             value={formData.morning_time_to}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='To'
//             type ={!isFocusedMorningTo ? 'text' : 'time'}
//             onFocus={() => setIsFocusedMorningTo(true)}
//             onBlur={() => setIsFocusedMorningTo(false)}
//           />

//           <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
//           <input
//             name="morning_video"
//             value={formData.morning_video}
//             onChange={handleChange}
//             className='w-[30%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md'
//             type='text'
//           />

//           <label class=" h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input type="file" class="hidden" />
//             <span class="text-gray-400 ">Select an image</span>
//           </label>
//         </div>

//         <p className='text-black font-medium mt-5'>Evening Meditation</p>
        
//         <div className='mt-4 flex'>
//         <p className='flex justify-center items-center ms-10 text-black'>Time</p>

//           <input
//             name="evening_time_from"
//             value={formData.evening_time_from}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='From'
//             type ={!isFocusedEveningFrom ? 'text' : 'time'}
//             onFocus={() => setIsFocusedEveningFrom(true)}
//             onBlur={() => setIsFocusedEveningFrom(false)}
//           />

//           <input
//             name="evening_time_to"
//             value={formData.evening_time_to}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='To'
//             type ={!isFocusedEveningTo ? 'text' : 'time'}
//             onFocus={() => setIsFocusedEveningTo(true)}
//             onBlur={() => setIsFocusedEveningTo(false)}
//           />

//           <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
//           <input
//             name="evening_video"
//             value={formData.evening_video}
//             onChange={handleChange}
//             className='w-[30%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md'
//             type='text'
            
//           />

//           <label class=" h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input type="file" class="hidden" />
//             <span class="text-gray-400 ">Select an image</span>
//           </label>
//         </div>

//         <button type="submit" className='h-12 w-[450px] mt-10 bg-[#005DB8] hover:bg-[#005cb8d1] text-white rounded-2xl'>
//           Add Meditation Time
//         </button>
//       </form>
//     </div>
//   );
// }

// export default MeditationTimeForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// function MeditationTimeForm() {
//   const [countryList, setCountryList] = useState([]);
//   const [isFocusedMorningFrom, setIsFocusedMorningFrom] = useState(false);
//   const [isFocusedMorningTo, setIsFocusedMorningTo] = useState(false);
//   const [isFocusedEveningFrom, setIsFocusedEveningFrom] = useState(false);
//   const [isFocusedEveningTo, setIsFocusedEveningTo] = useState(false);

//   const [formData, setFormData] = useState({
//     country: '',
//     general_video: '',
//     morning_time_from: '',
//     morning_time_to: '',
//     evening_time_from: '',
//     evening_time_to: '',
//     morning_video: '',
//     evening_video: ''
//   });

//   const [generalImage, setGeneralImage] = useState(null);
//   const [morningImage, setMorningImage] = useState(null);
//   const [eveningImage, setEveningImage] = useState(null);

//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/countrieslist`);
//         setCountryList(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (setter) => (e) => {
//     const file = e.target.files[0];
//     setter(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const {
//       country,
//       general_video,
//       morning_time_from,
//       morning_time_to,
//       evening_time_from,
//       evening_time_to,
//       morning_video,
//       evening_video
//     } = formData;

//     if (
//       country &&
//       general_video &&
//       morning_time_from &&
//       morning_time_to &&
//       evening_time_from &&
//       evening_time_to &&
//       morning_video &&
//       evening_video
//     ) {
//       try {
//         // Removed the conversion to 12-hour format
//         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-meditation-time`, formData);
//         toast.success(response.data.message);
//         console.log(response.data);
//         setFormData({
//           country: '',
//           general_video: '',
//           morning_time_from: '',
//           morning_time_to: '',
//           evening_time_from: '',
//           evening_time_to: '',
//           morning_video: '',
//           evening_video: ''
//         });
        
//         setGeneralImage(null);
//         setMorningImage(null);
//         setEveningImage(null);
//       } catch (error) {
//         console.error(error);
//         toast.error('Error submitting form. Please try again.');
//       }
//     } else {
//       toast.error('Please fill in all fields.');
//     }
//   };
//   return (
//     <div>
//       <p className='text-black font-medium'>Add Meditation Time by Country</p>
//       <form onSubmit={handleSubmit}>
//         <div className='mt-6 flex'>
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
//             className='w-full md:w-[32%] h-10 p-2 ps-6 ms-11 mb-5 bg-[#FDFBFF] text-black border-[1px] border-black rounded-md'
//           >
//             <option value="" disabled>---Select a country---</option>
//             {countryList.map((country, index) => (
//               <option value={country.name} key={index}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
  
//           <p className='h-10 ps-16 text-black flex items-end'>Add General Video Url</p>
//           <input
//             name="general_video"
//             value={formData.general_video}
//             onChange={handleChange}
//             className='w-[20%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md'
//             type='text'
//           />
//           <label className="h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input 
//               type="file" 
//               className="hidden" 
//               accept="image/*" 
//               onChange={handleFileChange(setGeneralImage)}
//             />
//             <span className={`text-gray-400 ${generalImage ? 'text-gray-800' : ''}`}>
//               {generalImage ? generalImage.name : 'Select an image'}
//             </span>
//           </label>
//         </div>
  
//         <p className='text-black font-medium'>Morning Meditation</p>
//         <div className='mt-4 flex'>
//           <p className='flex justify-center items-center ms-10 text-black'>Time</p>
//           <input
//             name="morning_time_from"
//             value={formData.morning_time_from}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='From'
//             type={!isFocusedMorningFrom ? 'text' : 'time'}
//             onFocus={() => setIsFocusedMorningFrom(true)}
//             onBlur={() => setIsFocusedMorningFrom(false)}
//           />
//           <input
//             name="morning_time_to"
//             value={formData.morning_time_to}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='To'
//             type={!isFocusedMorningTo ? 'text' : 'time'}
//             onFocus={() => setIsFocusedMorningTo(true)}
//             onBlur={() => setIsFocusedMorningTo(false)}
//           />
//           <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
//           <input
//             name="morning_video"
//             value={formData.morning_video}
//             onChange={handleChange}
//             className='w-[30%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md'
//             type='text'
//           />
//           <label className="h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input 
//               type="file" 
//               className="hidden" 
//               accept="image/*" 
//               onChange={handleFileChange(setMorningImage)}
//             />
//             <span className={`text-gray-400 ${morningImage ? 'text-gray-800' : ''}`}>
//               {morningImage ? morningImage.name : 'Select an image'}
//             </span>
//           </label>
//         </div>
  
//         <p className='text-black font-medium mt-5'>Evening Meditation</p>
//         <div className='mt-4 flex'>
//           <p className='flex justify-center items-center ms-10 text-black'>Time</p>
//           <input
//             name="evening_time_from"
//             value={formData.evening_time_from}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='From'
//             type={!isFocusedEveningFrom ? 'text' : 'time'}
//             onFocus={() => setIsFocusedEveningFrom(true)}
//             onBlur={() => setIsFocusedEveningFrom(false)}
//           />
//           <input
//             name="evening_time_to"
//             value={formData.evening_time_to}
//             onChange={handleChange}
//             className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] border-black rounded-md ps-3'
//             placeholder='To'
//             type={!isFocusedEveningTo ? 'text' : 'time'}
//             onFocus={() => setIsFocusedEveningTo(true)}
//             onBlur={() => setIsFocusedEveningTo(false)}
//           />
//           <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
//           <input
//             name="evening_video"
//             value={formData.evening_video}
//             onChange={handleChange}
//             className='w-[30%] h-10 ms-2 border-[1px] bg-[#FDFBFF] border-black rounded-md'
//             type='text'
//           />
//           <label className="h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
//             <input 
//               type="file" 
//               className="hidden" 
//               accept="image/*" 
//               onChange={handleFileChange(setEveningImage)}
//             />
//             <span className={`text-gray-400 ${eveningImage ? 'text-gray-800' : ''}`}>
//               {eveningImage ? eveningImage.name : 'Select an image'}
//             </span>
//           </label>
//         </div>
  
//         <button type="submit" className='h-12 w-[450px] mt-10 bg-[#005DB8] hover:bg-[#005cb8d1] text-white rounded-2xl'>
//           Add Meditation Time
//         </button>
//       </form>
//     </div>
//   );
  
// }

// export default MeditationTimeForm;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function MeditationTimeForm(props) {
  const [countryList, setCountryList] = useState([]);
  const [isFocusedMorningFrom, setIsFocusedMorningFrom] = useState(false);
  const [isFocusedMorningTo, setIsFocusedMorningTo] = useState(false);
  const [isFocusedEveningFrom, setIsFocusedEveningFrom] = useState(false);
  const [isFocusedEveningTo, setIsFocusedEveningTo] = useState(false);

  const [formData, setFormData] = useState({
    country: '',
    general_video: '',
    morning_time_from: '',
    morning_time_to: '',
    evening_time_from: '',
    evening_time_to: '',
    morning_video: '',
    evening_video: ''
  });

  const [generalImage, setGeneralImage] = useState(null);
  const [morningImage, setMorningImage] = useState(null);
  const [eveningImage, setEveningImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/countrieslist`);
        setCountryList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    setter(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      country,
      general_video,
      morning_time_from,
      morning_time_to,
      evening_time_from,
      evening_time_to,
      morning_video,
      evening_video
    } = formData;

    if (
      country &&
      general_video &&
      morning_time_from &&
      morning_time_to &&
      evening_time_from &&
      evening_time_to &&
      morning_video &&
      evening_video
    ) {
      try {
        const submissionData = new FormData();
        submissionData.append('country', country);
        submissionData.append('general_video', general_video);
        submissionData.append('morning_time_from', morning_time_from);
        submissionData.append('morning_time_to', morning_time_to);
        submissionData.append('evening_time_from', evening_time_from);
        submissionData.append('evening_time_to', evening_time_to);
        submissionData.append('morning_video', morning_video);
        submissionData.append('evening_video', evening_video);

        if (generalImage) {
          submissionData.append('general_image', generalImage);
        }
        if (morningImage) {
          submissionData.append('morning_image', morningImage);
        }
        if (eveningImage) {
          submissionData.append('evening_image', eveningImage);
        }

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/add-meditation-time`, submissionData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        toast.success(response.data.message);
        console.log(response.data);
        props.setMeditationTimeRenderToggle(prevValue => !prevValue);

        setFormData({
          country: '',
          general_video: '',
          morning_time_from: '',
          morning_time_to: '',
          evening_time_from: '',
          evening_time_to: '',
          morning_video: '',
          evening_video: ''
        });
        
        setGeneralImage(null);
        setMorningImage(null);
        setEveningImage(null);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    } else {
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <div>
      <p className='text-black font-medium'>Add Meditation Time by Country</p>
      <form onSubmit={handleSubmit}>
        <div className='mt-6 flex'>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className='w-full md:w-[32%] h-10 p-2 ps-6 ms-11 mb-5 bg-[#FDFBFF] text-black border-[1px] border-black rounded-md'
          >
            <option value="" disabled>---Select a country---</option>
            {countryList.map((country, index) => (
              <option value={country.name} key={index}>
                {country.name}
              </option>
            ))}
          </select>

          <p className='h-10 ps-16 text-black flex items-end'>Add General Video Url</p>
          <input
            name="general_video"
            value={formData.general_video}
            onChange={handleChange}
            className='w-[20%] h-10 ms-2 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md'
            type='text'
          />
          <label className="h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange(setGeneralImage)}
            />
            <span className={`text-gray-400 ${generalImage ? 'text-gray-800' : ''}`}>
              {generalImage ? generalImage.name : 'Select an image'}
            </span>
          </label>
        </div>

        <p className='text-black font-medium'>Morning Meditation</p>
        <div className='mt-4 flex'>
          <p className='flex justify-center items-center ms-10 text-black'>Time</p>
          <input
            name="morning_time_from"
            value={formData.morning_time_from}
            onChange={handleChange}
            className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md px-3'
            placeholder='From'
            type={!isFocusedMorningFrom ? 'text' : 'time'}
            onFocus={() => setIsFocusedMorningFrom(true)}
            onBlur={() => setIsFocusedMorningFrom(false)}
          />
          <input
            name="morning_time_to"
            value={formData.morning_time_to}
            onChange={handleChange}
            className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md px-3'
            placeholder='To'
            type={!isFocusedMorningTo ? 'text' : 'time'}
            onFocus={() => setIsFocusedMorningTo(true)}
            onBlur={() => setIsFocusedMorningTo(false)}
          />
          <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
          <input
            name="morning_video"
            value={formData.morning_video}
            onChange={handleChange}
            className='w-[30%] h-10 ms-2 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md'
            type='text'
          />
          <label className="h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange(setMorningImage)}
            />
            <span className={`text-gray-400 ${morningImage ? 'text-gray-800' : ''}`}>
              {morningImage ? morningImage.name : 'Select an image'}
            </span>
          </label>
        </div>

        <p className='text-black font-medium mt-5'>Evening Meditation</p>
        <div className='mt-4 flex'>
          <p className='flex justify-center items-center ms-10 text-black'>Time</p>
          <input
            name="evening_time_from"
            value={formData.evening_time_from}
            onChange={handleChange}
            className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md px-3'
            placeholder='From'
            type={!isFocusedEveningFrom ? 'text' : 'time'}
            onFocus={() => setIsFocusedEveningFrom(true)}
            onBlur={() => setIsFocusedEveningFrom(false)}
          />
          <input
            name="evening_time_to"
            value={formData.evening_time_to}
            onChange={handleChange}
            className='w-32 h-10 ms-8 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md px-3'
            placeholder='To'
            type={!isFocusedEveningTo ? 'text' : 'time'}
            onFocus={() => setIsFocusedEveningTo(true)}
            onBlur={() => setIsFocusedEveningTo(false)}
          />
          <p className='h-10 text-black flex items-center ms-10'>Add URL</p>
          <input
            name="evening_video"
            value={formData.evening_video}
            onChange={handleChange}
            className='w-[30%] h-10 ms-2 border-[1px] bg-[#FDFBFF] text-black border-black rounded-md'
            type='text'
          />
          <label className="h-10 ms-12 flex justify-center items-center p-4 border-2 border-dashed border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50">
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange(setEveningImage)}
            />
            <span className={`text-gray-400 ${eveningImage ? 'text-gray-800' : ''}`}>
              {eveningImage ? eveningImage.name : 'Select an image'}
            </span>
          </label>
        </div>

        {/* <button type='submit' className='w-[10%] h-10 ml-11 mt-10 bg-black text-white rounded-md'>Submit</button> */}
        <button type="submit" className='h-12 w-[450px] mt-10 bg-[#005DB8] hover:bg-[#005cb8d1] text-white rounded-2xl'>
           Add Meditation Time
         </button>
      </form>
    </div>
  );
}

export default MeditationTimeForm;
