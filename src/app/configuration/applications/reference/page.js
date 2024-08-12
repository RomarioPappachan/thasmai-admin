"use client"

import React, { useState, useEffect } from 'react'
import NavLink from '../../navlink/navlink'
import NavLinkApp from '../NavlinkApp/navlinkApp'
import { useNavbarTextStore } from '@/app/state/navbar-state'
import EdiReferencePopUp from '@/app/components/configuration/application/reference/EdiReferencePopUp'
import axios from 'axios'
import { toast } from 'react-hot-toast';

function RefQuestionConfiguration() {

  const [referenceData, setReferenceData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [refDataToggle, setRefDataToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {

          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/list-questions`);
          console.log(response);

          setReferenceData(response.data[0]);

        } catch (error) {
          console.error("Error fetching data:", error);
        } 
  
      };
  
      fetchData();

      return () => {
          return;
      }
  }, [refDataToggle]);

  const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Configuration parameters");

  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto">

      <div className="w-full flex items-center justify-between ">
        <NavLink />
      </div>
      <div className='w-full'>
        <NavLinkApp />
      </div>

      <div className='w-full h-[85%] mt-4 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
          <div className='w-full h-[60%] p-5 flex flex-col justify-between'>
              <p className='text-2xl text-black'>Q. { referenceData.question }</p>
              <p className='ps-6 text-xl text-black'>A. { referenceData.ans1 }</p>
              <p className='ps-6 text-xl text-black'>B. { referenceData.ans2 }</p>
              <p className='ps-6 text-xl text-black'>C. { referenceData.ans3 }</p>
              <p className='ps-6 text-xl text-black'>D. { referenceData.ans4 }</p>
              <p className='ps-6 text-xl text-black'>E. { referenceData.ans5 }</p>
          </div>

          <button 
            className='w-[150px] h-[40px] ms-5 mt-10 bg-amber-700 text-white text-xl font-medium rounded hover:bg-amber-800'
            onClick={() => {
              setIsEdit(true);
            }}
          >Edit</button>

          <div>

          </div>


          
      </div>

      {
        isEdit && <EdiReferencePopUp setIsEdit={setIsEdit} setRefDataToggle={setRefDataToggle} />
      }

      
    </div>
  )
}

export default RefQuestionConfiguration