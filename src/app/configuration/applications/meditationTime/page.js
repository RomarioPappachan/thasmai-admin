  "use client"

import React, { useState ,useEffect } from 'react'
import NavLink from '../../navlink/navlink'
import NavLinkApp from '../NavlinkApp/navlinkApp'
import { useNavbarTextStore } from '@/app/state/navbar-state'
import axios from 'axios'
import MeditationTimeConfigTable from '@/app/components/configTable/configMeditationTimeTable'
// import dummyData from "./dummy"
import MeditationTimeForm from '@/app/components/configTable/MeditationTimeForm'
import EditMeditationTimePopUp from '@/app/components/configTable/EditMeditationTimePopUp'

function MeditationTime() { 

  const [editMeditationTimePopUp, setEditMeditationTimePopUp] = useState(false)
  const [meditationTimeRenderToggle, setMeditationTimeRenderToggle] = useState(false)
  const [meditationTime ,setMeditationTime] = useState([]);
  const [meditationTimeId , setMeditationTimeId] =useState();

  useEffect(() => {
    const fetchData = async () => {
      
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/superadmin/meditationTimeList`);
            console.log(response);
            setMeditationTime(response.data);
            
        } catch (error) {
            toast.error('Error loading zoom meeting data.');
            console.error('Error:', error);
        }
    };
    fetchData();
    }, [meditationTimeRenderToggle]);

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
      <div className='w-full h-[85%] mt-4 p-4 bg-white rounded-[8px] shadow drop-shadow-md overflow-y-auto'>
        <MeditationTimeForm setMeditationTimeRenderToggle={setMeditationTimeRenderToggle}/>
          <MeditationTimeConfigTable  
          setEditMeditationTimePopUp={setEditMeditationTimePopUp} 
          meditationTimeRenderToggle={meditationTimeRenderToggle} 
          setMeditationTime={setMeditationTime}
          meditationTime={meditationTime}
          setMeditationTimeId={setMeditationTimeId}
          />
          
      </div>
      {
       editMeditationTimePopUp && 
        <EditMeditationTimePopUp  
          meditationTimeId={meditationTimeId} 
          setEditMeditationTimePopUp={setEditMeditationTimePopUp}
          setMeditationTimeRenderToggle={setMeditationTimeRenderToggle}
        />
      }
    </div>
  )
}

export default MeditationTime