"use client"

import React from 'react'
import { useDistributionFilterStore } from "./filterState";


function FilterChip({ filter, index, filterToggle, setFilterToggle, handleSearch }) {
  
    const filterState = useDistributionFilterStore((state) => {
        return state;
    });
    
  return (
    
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