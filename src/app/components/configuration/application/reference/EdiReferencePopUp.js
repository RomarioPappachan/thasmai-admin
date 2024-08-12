"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';

function EdiReferencePopUp(props) {

    const [data, setData] = useState({
        id: "",
        question: "",
        ans1: "",
        ans2: "",
        ans3: "",
        ans3: "",
        ans4: "",
        ans5: "",
        conditions : "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
    
              const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/list-questions`);
              console.log(response);
              setData(response.data[0]);
    
            } catch (error) {
              console.error("Error fetching data:", error);
            }
      
        };
      
        fetchData();
    
        return () => {
            return;
        }
    }, []);


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
          ...prevState,
          [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

            const { id, question, ans1, ans2, ans3, ans4, ans5 } = data;
            console.log(data);
     
          try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/questions/${id}`, {
                question: question,
                ans1: ans1,
                ans2: ans2,
                ans3: ans3,
                ans4: ans4,
                ans5: ans5,
            });
            // console.log(response);
            props.setRefDataToggle(prevValue => !prevValue);
            toast.success(response.data.message);
            props.setIsEdit(false);
            
          } catch (error) {
            console.error('Error uploading event:', error);
            toast.error("An error occured while updating. Please try again.");
          }
        
      };

      


  return (
    <div className="w-[100vw] h-[100vh] bg-[#000000af] absolute left-0 top-0 flex justify-center items-center">
        <button
                className="w-8 h-8 m-0 p-0 absolute top-6 right-6 hover:scale-110 text-5xl text-white rotate-45"
                onClick={() => {
                    props.setIsEdit(false);
                }}
            >+</button>

        <div className='w-[1000px] h-[600px] px-10 bg-white'>
            <input 
              type='text'
              name='question'
              value={data.question}
              placeholder= {"Q. " + data.question}
              className='w-full h-12  mt-10 px-2 bg-white text-black border-b-2  border-blue-800 outline-none placeholder:text-xl '
              onChange={handleOnChange}
            />
            <input 
              type='text'
              name='ans1'
              value={data.ans1}
              placeholder= {"A. " + data.ans1}
              className='w-[60%] h-12  mt-10 px-2 bg-white text-black border-b-2 border-blue-800 outline-none placeholder:text-xl '
              onChange={handleOnChange}
            />
            <input
              name='ans2'
              value={data.ans2}
              type='text'
              placeholder= {"B. " + data.ans2}
              className='w-[60%] h-12  mt-5 px-2 bg-white text-black border-b-2 border-blue-800 outline-none placeholder:text-xl '
              onChange={handleOnChange}
            />
            <input 
              name='ans3'
              value={data.ans3}
              type='text'
              placeholder= {"C. " + data.ans3}
              className='w-[60%] h-12  mt-5 px-2 bg-white text-black border-b-2 border-blue-800 outline-none placeholder:text-xl '
              onChange={handleOnChange}
            />
            <input 
              type='text'
              name='ans4'
              value={data.ans4}
              placeholder= {"D. " + data.ans4}
              className='w-[60%] h-12  mt-5 px-2 bg-white text-black border-b-2 border-blue-800 outline-none placeholder:text-xl '
              onChange={handleOnChange}
            />
            <input 
              type='text'
              name='ans5'
              value={data.ans5}
              placeholder= {"E. " + data.ans5}
              className='w-[60%] h-12  mt-5 px-2 bg-white text-black border-b-2 border-blue-800 outline-none placeholder:text-xl '
              onChange={handleOnChange}
            />
            <div className='w-full h-[10%] flex justify-end mt-5'>
                <button 
                    className='w-[150px] h-[40px] bg-green-600 text-white text-xl font-medium rounded hover:bg-green-700'
                    onClick={handleSubmit}
                > 
                    Save
                </button>
            </div>
        </div>
    </div>

  )
}

export default EdiReferencePopUp