"use client"
import React, {useState , useEffect} from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';

function EditMeditationTimePopUp(props) {

  const [edittedData, setEdittedData] = useState({
    country: '',
    general_video: '',
    morning_time_from: '',
    morning_time_to: '',
    evening_time_from: '',
    evening_time_to: '',
    morning_video: '',
    evening_video: ''
  });

  const [updateToggle, setUpdateToggle] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
        try {

          const meditationTimeId = props.meditationTimeId;

          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/meditation-time/${meditationTimeId}`);
          console.log(response);
          setEdittedData(response.data);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
  
    };
  
    fetchData();

    return () => {
        return;
    }

}, [updateToggle]);


const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEdittedData(prevState => ({
        ...prevState,
        [name]: value
    }));
};



const handleEditSubmit = async (e) => {
  e.preventDefault();
  const meditationTimeId = props.meditationTimeId;


  const {
    country,
    general_video,
    morning_time_from,
    morning_time_to,
    evening_time_from,
    evening_time_to,
    morning_video,
    evening_video
  } = edittedData;

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

     
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/update-meditation-time/${meditationTimeId}`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setEdittedData({
        country: '',
        general_video: '',
        morning_time_from: '',
        morning_time_to: '',
        evening_time_from: '',
        evening_time_to: '',
        morning_video: '',
        evening_video: ''
      });
      
      console.log(response.data);
      setUpdateToggle(prevValue => !prevValue);
      props.setMeditationTimeRenderToggle(prevValue => !prevValue);
      toast.success(response.data.message);      
      
    } catch (error) {
      console.error(error);
      toast.error('Error submitting form. Please try again.');
    }
  } else {
    toast.error('Please fill in all fields.');
  }
};


  return (
    <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
                 <button
                  className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                   onClick={() => {
                       props.setEditMeditationTimePopUp(false);
                     }}
                 >+
                 </button>
           
                     <div className='w-[1000px] h-[550px] p-8 bg-white rounded text-black '>
                        <p className='text-2xl font-medium'>Country : {edittedData.country}</p>
                        <div>
                          <p className='mt-4 font-bold'>General Video</p>
                          <input 
                            type='text'
                            name='general_video'
                            value={edittedData.general_video}
                            className='w-[500px] h-[40px] mt-2 p-1 text-black  bg-blue-gray-100 rounded '
                            onChange={handleOnChange}
                          
                          />
                        </div>
                        <div>
                          <p className='mt-6 font-bold'>Morning Meditation</p>
                          
                          <div className='flex mt-3'>
                            <p className='me-2 font-medium'>Time :</p>
                            <input 
                             type='time'
                             name='morning_time_from'
                             value={edittedData.morning_time_from}
                            className='w-[130px] h-[40px] me-2 p-1 text-black  bg-blue-gray-100 rounded'
                            onChange={handleOnChange}
                            /> 
                            
                            <input 
                             type='time'
                             name='morning_time_to'
                             value={edittedData.morning_time_to}
                            className='w-[130px] h-[40px] me-2 p-1 text-black  bg-blue-gray-100 rounded'
                            onChange={handleOnChange}
                            /> 
                            <p className='me-2 font-medium'> URL :</p>
                           <input 
                            type='text'
                            name='morning_video'
                            value={edittedData.morning_video}
                            className='w-[500px] h-[40px] p-1 text-black  bg-blue-gray-100 rounded'
                            onChange={handleOnChange}
                          />
                          </div>

                          <p className='mt-6 font-bold'>Evening Meditation</p>
                          
                          <div className='flex mt-3'>
                            <p className='me-2 font-medium'>Time :</p>
                            <input 
                             type='time'
                             name='evening_time_from'
                             value={edittedData.evening_time_from}
                            className='w-[130px] h-[40px] me-2 p-1 text-black   bg-blue-gray-100 rounded'
                            onChange={handleOnChange}
                            /> 
                            
                            <input 
                             type='time'
                             name='evening_time_to'
                             value={edittedData.evening_time_to}
                            className='w-[130px] h-[40px] me-2 p-1 text-black  bg-blue-gray-100 rounded'
                            onChange={handleOnChange}
                            /> 
                            <p className='me-2 font-medium'> URL :</p>
                           <input 
                            type='text'
                            name='evening_video'
                            value={edittedData.evening_video}
                            className='w-[500px] h-[40px] p-1 text-black  bg-blue-gray-100 rounded'
                            onChange={handleOnChange}
                          />
                          </div>

                          
                        </div>
                        <div className=' mt-16 flex justify-center items-center'>
                            <button 
                              type="submit" 
                              className='h-12 w-[450px]  bg-[#005DB8] hover:bg-[#005cb8d1] text-white rounded-2xl'
                              onClick={handleEditSubmit}
                            >
                                 Update Meditation Time
                            </button>
              </div>
                     </div>


              
              
    </div>
  )
}

export default EditMeditationTimePopUp