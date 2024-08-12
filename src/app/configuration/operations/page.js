"use client"
import React from 'react'
import NavLink from '../navlink/navlink'
import { useNavbarTextStore } from '../../state/navbar-state'
// import OperationsConfigTable from '@/app/components/configTable/configOperationsTable'
import ConfigurationTable from '../../components/configTable/configurationTable'
import dummyData from './dummy'


function Operations() {

  const setNavbarText = useNavbarTextStore((state) => state.setNavbarText);
	setNavbarText("Configuration parameters");

  return (
    <div className="w-full h-[85vh] px-7 overflow-y-auto">
      <div className="w-full flex items-center justify-between ">
        <NavLink />
      </div>
      <div className='w-full h-[90%] mt-2 p-4 bg-white rounded-[8px] shadow drop-shadow-md'>
          {/* <OperationsConfigTable /> */}
          <ConfigurationTable dummyData={dummyData}/>
          <div className='w-full h-[10%] pe-10 flex justify-end'>
            <button className='w-[120px] h-[35px] bg-[#005DB8] text-[14px] text-white rounded me-3'>Back</button>
            <button className='w-[120px] h-[35px] bg-[#005DB8] text-[14px] text-white rounded'>Next</button>
          </div>
      </div>
    </div>
  )
}

export default Operations