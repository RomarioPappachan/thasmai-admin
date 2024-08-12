"use client"

import React, {useState ,useEffect} from 'react'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '@/app/state/navbar-state'
import dummyData from './dummy'
import RegistartionPage from '@/app/components/configuration/registration/RegistrationPage'


function RegPageConfiguration() {

  const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Configuration parameters");

  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto">

      <div className="w-full flex items-center justify-between ">
        <NavLink />
      </div>
      
      <div className='w-full h-[85%] mt-4 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
        
            <RegistartionPage dummyData={dummyData}/>
          
      </div>
    </div>
  )
}

export default RegPageConfiguration