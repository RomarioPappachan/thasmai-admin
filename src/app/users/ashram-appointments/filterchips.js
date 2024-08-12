import React from 'react'
import { useAppointmentFilterStore } from "./filterstate";


function FilterChip({filter, index, filterToggle, setFilterToggle, handleSearch}) {
  
    const filterState = useAppointmentFilterStore((state) => {
        return state;
    });
    
    return (
        // <div className='h-full  flex justify-evenly items-center my-2 snap-center shrink-0' key = {index}>
        //     <div className='bg-white max-w-48 text-[14px] text-black font-semibold rounded-xl flex items-center justify-center px-7 py-2 '>{filter.field}</div>
        //     <div className='bg-white max-w-48 text-[14px] text-black font-semibold rounded-xl flex items-center justify-center px-7 py-2 '>{filter.operator}</div>
        //     <div className='bg-white max-w-48 text-[14px] text-black font-semibold rounded-xl flex items-center justify-center px-7 py-2 '>{filter.value.length > 6 ? filter.value.slice(0,6):filter.value}</div>

        //     <div className='bg-white w-9 h-9  rounded-full flex justify-center items-center text-black font-semibold cursor-pointer' onClick={()=>{ 

        //       if(filterState.appointments.length === 1){
        //         filterState.deleteFilter(index)
        //         setFilterToggle(!filterToggle)
        //       }
        //       filterState.deleteFilter(index)

        //       }}>X</div>
        // </div>


        <div className="h-7 ms-2 my-2 inline-block rounded-full bg-white snap snap-center shrink-0" key={ index }>

            <p className="h-7 px-2 text-sm flex items-center gap-x-1">
              <span className="font-bold">{ filter.field }</span>
              <span className="">{ filter.operator }</span>
              <span className="text-blue-600">" { filter.value } "</span>
              <span className="w-5 h-5 ms-1 flex justify-center items-center rotate-45 text-xl text-white bg-[#005DB8] rounded-full cursor-pointer"
                onClick={() => {
                  if(filterState.filters.length === 1) {
                    filterState.deleteFilter(index);
                    setFilterToggle(!filterToggle);
                  }
                  filterState.deleteFilter(index);
                }}
              >+</span>
            </p>

        </div>
    )
}

export default FilterChip